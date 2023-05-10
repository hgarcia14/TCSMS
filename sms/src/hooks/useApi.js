import { useState } from 'react';

export const useApi = () => {
  const [state, setState] = useState({
    isLoading: false,
    data: null,
    error: null
  });

  const { isLoading, data, error } = state;

  const setSubscribe = async (number) => {
    try {
      setState({ ...state, error: null, data: null, isLoading: true });

      const response = await fetch('http://localhost:4000/api/subscription', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ phoneNumber: number })
      });

      const res = await response.json();
console.log(res.data);
      if (!res.data) {
        setState({ ...state, error: res.message, data: null, isLoading: false });
      } else {
        setState({ ...state, error: null, data: res.data, isLoading: false });
      }

    } catch (error) {
      console.log(error);
    }
  };

  return { isLoading, data, error, setSubscribe };
};