import axios from 'axios';
import { User } from './customTypes';

type ErrorHandlerParams = {
  err: unknown;
  setApiErr: (message: string | null) => void;
  setLoading: (loading: boolean) => void;
  setUser?: (user: null | User) => void;
  setToken?: (token: null | string) => void;
};

export const handleApiError = ({
  err,
  setApiErr,
  setLoading,
  setUser,
  setToken,
}: ErrorHandlerParams) => {
  console.error("Something went wrong", err);

  if (axios.isAxiosError(err)) {
    if (err.response?.status === 401) {
      setApiErr(
        "Your login token has expired. Please login to refresh your token to view these orders."
      );
      if (setUser) setUser(null);
      if (setToken) setToken(null);
    }
    if (err.response?.data.msg) {
      setApiErr(err.response.data.msg)
    }
    else {
      setApiErr("An error occurred while processing your request.");
    }
  } else {
    setApiErr("An unexpected error occurred. Please try again.");
  }

  setLoading(false);
};