import { User } from "./customTypes";

interface Context {
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}


export const LogUserOut = ({
  setToken,
  setUser,
}: Context): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setToken(null);
  setUser(null);
};