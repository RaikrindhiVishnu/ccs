import { useEffect, useState } from 'react';
import type { FarmlandRequestItem } from '@/components/ccs/Farmlandrequestcard';
import { farmlandRequestDummyData } from '@/data/ccs/Farmlandrequestdata';

/* ── config ──────────────────────────────────────────────────
   Set USE_DUMMY = false and fill API_URL when your backend
   is ready. The hook signature stays identical — no changes
   needed in the page component.
──────────────────────────────────────────────────────────── */
const USE_DUMMY = true;
const API_URL   = '/api/farmland-requests'; // swap when ready

type HookResult = {
  data: FarmlandRequestItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useFarmlandRequests(): HookResult {
  const [data, setData]         = useState<FarmlandRequestItem[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [tick, setTick]         = useState(0);

  const refetch = () => setTick((t) => t + 1);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        if (USE_DUMMY) {
          /* simulate network delay so skeleton is visible */
          await new Promise((r) => setTimeout(r, 600));
          setData(farmlandRequestDummyData);
          return;
        }

        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const json: FarmlandRequestItem[] = await res.json();
        setData(json);
      } catch (err: unknown) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message ?? 'Failed to load requests');
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