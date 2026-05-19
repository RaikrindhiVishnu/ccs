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
