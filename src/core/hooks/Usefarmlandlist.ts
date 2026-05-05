import { useEffect, useState } from 'react';
import type { FarmlandListItem } from '@/components/ccs/Farmlandlistcard';
import { farmlandListDummyData } from '@/data/ccs/Farmlandlistdata';

/* ── config ──────────────────────────────────────────────────
   Set USE_DUMMY = false and fill API_URL when backend ready.
──────────────────────────────────────────────────────────── */
const USE_DUMMY = true;
const API_URL   = '/api/farmland-list';

type HookResult = {
  data: FarmlandListItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useFarmlandList(): HookResult {
  const [data, setData]       = useState<FarmlandListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [tick, setTick]       = useState(0);

  const refetch = () => setTick((t) => t + 1);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        if (USE_DUMMY) {
          await new Promise((r) => setTimeout(r, 500));
          setData(farmlandListDummyData);
          return;
        }

        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const json: FarmlandListItem[] = await res.json();
        setData(json);
      } catch (err: unknown) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message ?? 'Failed to load');
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [tick]);

  return { data, loading, error, refetch };
}