import { useEffect, useState } from 'react';
import type { FarmlandDetail } from '@/components/ccs/FarmlandDetailPanel';

/* ── dummy data ── replace with real API ── */
const DUMMY_DETAILS: Record<string, FarmlandDetail> = {
  '1': {
    id: '1',
    farmlandId: 'GLCSOS 01',
    ownerName: 'Ramudu Kumar',
    email: 'ramudu@gmail.com',
    dateOfBirth: '13/01/1986',
    religion: 'Hindu',
    caste: 'Hindu',
    totalArea: '70 Acres',
    assetValue: '₹25 Lakhs per Acre',
  },
  '2': {
    id: '2',
    farmlandId: 'GLCSOS 02',
    ownerName: 'Priyaanshu S.',
    email: 'priyaanshu@gmail.com',
    dateOfBirth: '22/05/1990',
    religion: 'Hindu',
    caste: 'OC',
    totalArea: '45 Acres',
    assetValue: '₹26 Lakhs per Acre',
  },
  '3': {
    id: '3',
    farmlandId: 'GLCSOS 03',
    ownerName: 'Arjun Wadhwa',
    email: 'arjun@gmail.com',
    dateOfBirth: '05/11/1983',
    religion: 'Hindu',
    caste: 'BC',
    totalArea: '60 Acres',
    assetValue: '₹22 Lakhs per Acre',
  },
  '4': {
    id: '4',
    farmlandId: 'GLCSOS 04',
    ownerName: 'Ram Varma',
    email: 'ram@gmail.com',
    dateOfBirth: '18/07/1978',
    religion: 'Hindu',
    caste: 'OC',
    totalArea: '80 Acres',
    assetValue: '₹28 Lakhs per Acre',
  },
  '5': {
    id: '5',
    farmlandId: 'GLCSOS 05',
    ownerName: 'Priyaanshu S.',
    email: 'priyaanshu2@gmail.com',
    dateOfBirth: '30/03/1992',
    religion: 'Hindu',
    caste: 'SC',
    totalArea: '120 Acres',
    assetValue: '₹25 Lakhs per Acre',
  },
};

const USE_DUMMY = true;
const API_BASE  = '/api/farmland';

type HookResult = {
  detail: FarmlandDetail | null;
  loading: boolean;
  error: string | null;
};

export function useFarmlandDetail(id: string | null): HookResult {
  const [detail, setDetail]   = useState<FarmlandDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!id) { setDetail(null); return; }

    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        if (USE_DUMMY) {
          await new Promise((r) => setTimeout(r, 400));
          setDetail(DUMMY_DETAILS[id] ?? null);
          return;
        }

        const res = await fetch(`${API_BASE}/${id}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const json: FarmlandDetail = await res.json();
        setDetail(json);
      } catch (err: unknown) {
        if ((err as Error).name !== 'AbortError')
          setError((err as Error).message ?? 'Failed to load');
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [id]);

  return { detail, loading, error };
}