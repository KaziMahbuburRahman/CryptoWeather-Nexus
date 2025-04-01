import {
  setCryptoData,
  setError,
  setLoading,
} from "@/features/crypto/cryptoSlice";
import { CryptoData, cryptoService } from "@/services";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useCrypto = (limit: number = 10) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<CryptoData[]>([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        dispatch(setLoading(true));
        const cryptoData = await cryptoService.getTopCryptos(limit);
        dispatch(setCryptoData(cryptoData));
        setData(cryptoData);
      } catch (err) {
        const error =
          err instanceof Error ? err.message : "Failed to fetch crypto data";
        dispatch(setError(error));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCryptos();
  }, [limit, dispatch]);

  return data;
};
