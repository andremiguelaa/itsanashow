import { useState, useEffect, useCallback } from "react";
import axios from "axios";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/`;

const useRequest = ({
  url,
  method = "GET",
  payload,
  callback = false,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = useCallback(
    (data) => {
      setData();
      setError(false);
      setLoading(true);
      axios({
        method,
        url,
        data,
      })
        .then((response) => {
          setData(response.data);
          onSuccess();
        })
        .catch(() => {
          setError(true);
          onError();
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [url, method, onSuccess, onError]
  );

  useEffect(() => {
    if (!callback) {
      request(payload);
    }
  }, [request, payload, callback]);

  return {
    data,
    loading,
    error,
    request: callback ? request : undefined,
  };
};

export default useRequest;
