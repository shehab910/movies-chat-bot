import { useEffect, useState, useCallback } from "react";

export default function useAsync(callback, dependencies = []) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [value, setValue] = useState();

    const callbackMemoized = useCallback(
      async () => {
        setLoading(true);
        setError(undefined);
        setValue(undefined);

        try{
            const result = await callback();
            setValue(result);
        } catch(e){
            setError(e);
        }
        setLoading(false);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dependencies,
    )
    useEffect(() => {
        callbackMemoized();
    }, [callbackMemoized]);

  return {loading, error, value};
}
