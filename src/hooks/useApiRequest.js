import { useState } from "react";

export default requestFunction => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);

  const makeRequest = async () => {
    setLoading(true);
    try {
      const result = await requestFunction();
      setData(result);
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setOffline(false);
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    offline,
    makeRequest,
  };
};
