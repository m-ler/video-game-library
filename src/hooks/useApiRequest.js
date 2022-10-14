import { useState } from "react";
import { useSelector } from "react-redux";

export default requestFunction => {
  const requestsEnabledState = useSelector(state => state.request);

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);

  const makeRequest = async () => {
    if (!requestsEnabledState) {
      setOffline(true);
      return;
    }

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
