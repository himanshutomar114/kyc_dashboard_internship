import { useState, useEffect } from "react";
import mockData from "@/data/mockKYCData.json";

export type KYCData = typeof mockData;

export const useKYCData = () => {
  const [data, setData] = useState<KYCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mockKYC");
        if (!res.ok) throw new Error("Failed to fetch KYC data");
        const json = await res.json();
        setData(json);
      } catch (err: unknown) {
        console.error("Failed to fetch KYC data:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};
