import { useEffect } from 'react';

const useEscapeKey = (onEscape) => {
  const handleKeyDown = ({ key }) => {
    if (key === 'Escape') {
      onEscape();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
};

export default useEscapeKey;
