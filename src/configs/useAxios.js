import { useState, useEffect } from "react";
import axios from "axios";

/**
 fixed :
  - no need to JSON.stringify to then immediatly do a JSON.parse
  - don't use export defaults, because default imports are hard to search for
  - axios already support generic request in one parameter, no need to call specialized ones
**/
export const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiRqst = async (params) => {
    setLoading(true);
    setResponse(null);
    try {
      const result = await axios.request(params);
      setResponse(result.data);
      setError(null);
    } catch (error) {
      setError(error);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     apiRqst(axiosParams);
  //   }, []); // execute once only

  return { response, error, loading, apiRqst };
};
