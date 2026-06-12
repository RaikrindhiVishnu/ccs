import pako from "pako";
import { Buffer } from "buffer";
export const transformTable = <T>(table: any[][]): T[] => {
  if (!table || table.length < 2) return [];
  const [headers, ...rows] = table;
  return rows.map((row) => {
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj as T;
  });
};

export const decompressGeoJSON = (input: any): any => {
  if (!input) return null;

  if (typeof input === "object" && input.type === "FeatureCollection") {
    return input;
  }

  let rawData = input;
  if (typeof input === "object") {
    if (input.data?.type === "FeatureCollection") {
      return input.data;
    }
    if (typeof input.data === "string") {
      rawData = input.data;
    } else if (input.data?.geo_json_data) {
      rawData = input.data.geo_json_data;
    } else if (input.geo_json_data) {
      rawData = input.geo_json_data;
    } else if (input.data) {
      return input.data;
    }
  }

  if (typeof rawData === "string") {
    try {
      const binaryData = Buffer.from(rawData, "base64");
      const decompressedData = pako.ungzip(binaryData);
      const decompressedString = new TextDecoder().decode(decompressedData);
      return JSON.parse(decompressedString);
    } catch (error) {
      console.error("Failed to decompress base64 gzip GeoJSON string:", error);
      try {
        return JSON.parse(rawData);
      } catch (_) {
        return null;
      }
    }
  }

  return rawData;
};

export function getOuterBoundary(features: any[]): any {
  const segmentCounts = new Map<string, { count: number; p1: [number, number]; p2: [number, number] }>();

  function addSegment(pt1: [number, number], pt2: [number, number]) {
    // Round to 7 decimal places for mapping/keying, which is ~1.1cm precision.
    const x1 = Math.round(pt1[0] * 10000000) / 10000000;
    const y1 = Math.round(pt1[1] * 10000000) / 10000000;
    const x2 = Math.round(pt2[0] * 10000000) / 10000000;
    const y2 = Math.round(pt2[1] * 10000000) / 10000000;

    // Skip degenerate segments
    if (x1 === x2 && y1 === y2) return;

    let key = "";
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      key = `${x1},${y1}_${x2},${y2}`;
    } else {
      key = `${x2},${y2}_${x1},${y1}`;
    }

    const existing = segmentCounts.get(key);
    if (existing) {
      existing.count++;
    } else {
      segmentCounts.set(key, { count: 1, p1: pt1, p2: pt2 });
    }
  }

  function processCoordinates(coords: any, depth: number) {
    if (depth === 1) {
      for (let i = 0; i < coords.length - 1; i++) {
        addSegment(coords[i], coords[i + 1]);
      }
    } else {
      for (const sub of coords) {
        processCoordinates(sub, depth - 1);
      }
    }
  }

  function processGeometry(geom: any) {
    if (!geom) return;
    if (geom.type === "Polygon") {
      processCoordinates(geom.coordinates, 2);
    } else if (geom.type === "MultiPolygon") {
      processCoordinates(geom.coordinates, 3);
    } else if (geom.type === "GeometryCollection") {
      if (Array.isArray(geom.geometries)) {
        geom.geometries.forEach(processGeometry);
      }
    }
  }

  features.forEach((f) => {
    if (f.geometry) {
      processGeometry(f.geometry);
    } else if (f.type === "Feature" && f.geometry) {
      processGeometry(f.geometry);
    } else if (f.coordinates || f.type) {
      processGeometry(f);
    }
  });

  const boundarySegments: { p1: [number, number]; p2: [number, number] }[] = [];
  segmentCounts.forEach((val) => {
    if (val.count === 1) {
      boundarySegments.push({ p1: val.p1, p2: val.p2 });
    }
  });

  if (boundarySegments.length === 0) return null;

  // Connect segments into continuous loops/paths
  const adj = new Map<string, { pt: [number, number]; neighbors: { key: string; pt: [number, number] }[] }>();

  function getVertKey(pt: [number, number]): string {
    const x = Math.round(pt[0] * 10000000) / 10000000;
    const y = Math.round(pt[1] * 10000000) / 10000000;
    return `${x},${y}`;
  }

  boundarySegments.forEach((seg) => {
    const k1 = getVertKey(seg.p1);
    const k2 = getVertKey(seg.p2);

    if (!adj.has(k1)) adj.set(k1, { pt: seg.p1, neighbors: [] });
    if (!adj.has(k2)) adj.set(k2, { pt: seg.p2, neighbors: [] });

    adj.get(k1)!.neighbors.push({ key: k2, pt: seg.p2 });
    adj.get(k2)!.neighbors.push({ key: k1, pt: seg.p1 });
  });

  const visited = new Set<string>();
  const loops: [number, number][][] = [];

  adj.forEach((val, startKey) => {
    if (visited.has(startKey)) return;

    const path: [number, number][] = [val.pt];
    let currentKey = startKey;
    visited.add(currentKey);

    let foundNext = true;
    while (foundNext) {
      foundNext = false;
      const currentEntry = adj.get(currentKey);
      if (!currentEntry) break;

      for (const neighbor of currentEntry.neighbors) {
        if (!visited.has(neighbor.key)) {
          path.push(neighbor.pt);
          currentKey = neighbor.key;
          visited.add(currentKey);
          foundNext = true;
          break;
        }
      }
    }

    const lastKey = currentKey;
    const startEntry = adj.get(startKey);
    const hasConnectionToStart = startEntry?.neighbors.some(n => n.key === lastKey);
    if (hasConnectionToStart && path.length > 2) {
      path.push(path[0]);
    }

    if (path.length >= 2) {
      loops.push(path);
    }
  });

  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "MultiLineString",
      coordinates: loops,
    },
  };
}

export function buildOuterBoundariesGeoJSON(features: any[]): any {
  if (!features) return { type: "FeatureCollection", features: [] };
  return {
    type: "FeatureCollection",
    features: features.map(f => {
      const boundaryFeature = getOuterBoundary([f]);
      return boundaryFeature ? {
        ...f,
        geometry: boundaryFeature.geometry
      } : null;
    }).filter(Boolean)
  };
}

export function buildAreasBoundaryGeoJSON(mandalsFC: any, areasList: any[], selectedMandals: any[] = []): any {
  if (!mandalsFC || !mandalsFC.features) {
    return { type: "FeatureCollection", features: [] };
  }

  const features: any[] = [];

  // 1. Saved Areas
  if (Array.isArray(areasList)) {
    areasList.forEach((area) => {
      const mandalIds = new Set((area.mandal_ids || area.mandalIds || []).map(Number));
      const areaMandalFeatures = mandalsFC.features.filter((f: any) =>
        mandalIds.has(Number(f.id || f.properties?.id))
      );

      if (areaMandalFeatures.length > 0) {
        const boundaryFeature = getOuterBoundary(areaMandalFeatures);
        if (boundaryFeature) {
          boundaryFeature.properties = {
            areaName: area.area_name || area.areaName || "",
            areaId: area.areaId || area.id || area.area_id || ""
          };
          features.push(boundaryFeature);
        }
      }
    });
  }

  // 2. Active selection (temporary area)
  if (Array.isArray(selectedMandals) && selectedMandals.length > 0) {
    const selectedIds = new Set(selectedMandals.map(m => Number(m.id || m.i)));
    const activeMandalFeatures = mandalsFC.features.filter((f: any) =>
      selectedIds.has(Number(f.id || f.properties?.id))
    );
    if (activeMandalFeatures.length > 0) {
      const boundaryFeature = getOuterBoundary(activeMandalFeatures);
      if (boundaryFeature) {
        boundaryFeature.properties = {
          areaName: "Selected Area",
          areaId: "temp-selected"
        };
        features.push(boundaryFeature);
      }
    }
  }

  return {
    type: "FeatureCollection",
    features
  };
}

export function findDistrictGeometry(districtId: number, geoData: any): any {
  if (!geoData || !geoData.countries) return null;
  for (const country of geoData.countries) {
    if (!country.states) continue;
    for (const state of country.states) {
      if (!state.districts) continue;
      for (const district of state.districts) {
        if (Number(district.i) === districtId) {
          return district.g;
        }
      }
    }
  }
  return null;
}

export function buildRegionsBoundaryGeoJSON(
  savedRegionsFeatures: any[],
  selectedDistricts: any[],
  geoMasterData: any,
  activeRegionId?: number | string | null
): any {
  const features: any[] = [];

  // 1. Saved Regions
  if (Array.isArray(savedRegionsFeatures)) {
    savedRegionsFeatures.forEach((f) => {
      const boundaryFeature = getOuterBoundary([f]);
      if (boundaryFeature) {
        features.push({
          ...f,
          geometry: boundaryFeature.geometry,
        });
      }
    });
  }

  // 2. Active selection (region being created/edited)
  if (
    Array.isArray(selectedDistricts) &&
    selectedDistricts.length > 0 &&
    geoMasterData
  ) {
    const districtFeatures = selectedDistricts
      .map((d) => {
        const id = Number(d.id ?? d.featureId);
        const geom = findDistrictGeometry(id, geoMasterData);
        if (!geom) return null;
        return {
          type: "Feature",
          geometry: geom,
          properties: {},
        };
      })
      .filter(Boolean);

    if (districtFeatures.length > 0) {
      const boundaryFeature = getOuterBoundary(districtFeatures);
      if (boundaryFeature) {
        const regionId = activeRegionId !== undefined && activeRegionId !== null
          ? (typeof activeRegionId === "number" ? activeRegionId : Number(activeRegionId) || "temp-selected")
          : "temp-selected";
        boundaryFeature.properties = {
          region_id: regionId,
          id: regionId,
          regionName: "Selected Region"
        };
        features.push(boundaryFeature);
      }
    }
  }

  return {
    type: "FeatureCollection",
    features,
  };
}
