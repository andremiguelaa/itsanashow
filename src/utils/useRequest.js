import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api/`;

const useRequest = ({ url, method = 'GET', payload, callback = false }) => {
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
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [url, method]
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
