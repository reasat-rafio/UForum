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

interface PostContextType {
  posts: IPost[] | null;
  setPosts: Dispatch<SetStateAction<IPost[] | null>>;
  setPostsAction: (posts: IPost[]) => void;
}

const PostContext = createContext<PostContextType>({} as PostContextType);

interface Props {
  children: React.ReactElement;
}

export default function PostsContext({ children }: Props): ReactElement {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [localStoragePost, setLocalStoragePost] = useLocalStorage<
    IPost[] | null
  >("posts", null);

  useEffect(() => {
    checkPosts();
  }, []);

  const checkPosts = () => {
    if (localStoragePost) {
      setPosts(localStoragePost);
    } else {
      setPosts(null);
    }
  };

  const setPostsAction = (posts: IPost[]) => {
    setLocalStoragePost(posts);
    setPosts(posts);
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, setPostsAction }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePost = (): PostContextType => useContext(PostContext);
