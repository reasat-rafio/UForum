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
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface Props {
  children: React.ReactElement;
}

export default function AuthContext({ children }: Props): ReactElement {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {};

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextType => useContext(UserContext);
