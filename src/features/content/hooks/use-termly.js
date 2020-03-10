import { useEffect } from 'react';

const useTermly = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://app.termly.io/embed-policy.min.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useTermly;
