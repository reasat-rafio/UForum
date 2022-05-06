import { useLocalStorage } from "@libs/hooks/use-localstorage";
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setUserAction: (usr: IUser) => void;
  removeUserAction: () => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface Props {
  children: React.ReactElement;
}

export default function AuthContext({ children }: Props): ReactElement {
  const [user, setUser] = useState<IUser | null>(null);
  const [localStoraeUser, setLocalStorageUser] = useLocalStorage<IUser | null>(
    "users",
    null
  );

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    if (localStoraeUser) {
      setUser(localStoraeUser);
    } else {
      setUser(null);
    }
  };

  const setUserAction = (usr: IUser) => {
    setLocalStorageUser(usr);
    setUser(usr);
  };

  const removeUserAction = () => {
    setLocalStorageUser(null);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, setUserAction, removeUserAction }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextType => useContext(UserContext);
