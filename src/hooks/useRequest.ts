import {useState} from 'react';

export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

type Callback = (...args: any[]) => any;

const useApiRequest = (fn: Callback) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const caller = async (args: any): Promise<any> => {
    setData(null);
    setError(null);
    setStatus(Status.PENDING);
    try {
      const response = await fn(args);
      setData(() => response);
      setStatus(Status.FULFILLED);
      return response;
    } catch (error: any) {
      setData(null);
      setError(() => error);
      setStatus(Status.REJECTED);
      throw error;
    }
  };

  return [{data, error, status}, caller] as const;
};

export default useApiRequest;
