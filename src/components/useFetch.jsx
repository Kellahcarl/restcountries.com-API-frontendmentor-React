import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getdata = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      // Handle error as needed
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getdata();
  }, [url, getdata]);

  return { loading, data };
};

export default useFetch;
