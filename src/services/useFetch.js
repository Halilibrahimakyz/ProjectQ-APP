import { useState, useEffect } from 'react';
import api from '../api/apiClient';

const useFetch = (url, params = {}, refreshTrigger) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(url, { params });
        if (isMounted) {
          setData(response.data);
          // console.log("fetched data: ",response)
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, refreshTrigger]);
  
  return { data, loading, error };
};

export default useFetch;
