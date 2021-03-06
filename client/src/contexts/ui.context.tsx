import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface UIStateProps {
  displaySidebar: boolean;
  displayFilter: boolean;
  displayModal: boolean;
  displaySearch: boolean;
  modalData: unknown;
  toastText: string;
  isPageLoading: boolean;
  isComponentLoading: boolean;

  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  closeSidebarIfAlreadyOpen: () => void;
  openFilter: () => void;
  closeFilter: () => void;
  openModal: () => void;
  closeModal: () => void;
  setPageLoading: (props: boolean) => void;
  setComponentLoading: (props: boolean) => void;
  setDisplaySearch: Dispatch<SetStateAction<boolean>>;
}

const UIContext = createContext<UIStateProps | unknown>(null);
UIContext.displayName = "UIContext";

export const UIProvider: React.FC = (props) => {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [toastText, _setToastText] = useState("");
  const [isPageLoading, _setPageLoading] = useState<boolean>(false);
  const [isComponentLoading, _setComponentLoading] = useState<boolean>(false);

  const openSidebar = () => setDisplaySidebar(true);
  const closeSidebar = () => setDisplaySidebar(false);
  const toggleSidebar = () => setDisplaySidebar((prev) => !prev);
  const closeSidebarIfAlreadyOpen = () =>
    setDisplaySidebar((prev) => prev && false);
  const openFilter = () => setDisplayFilter(true);
  const closeFilter = () => setDisplayFilter(false);
  const openModal = () => setDisplayModal(true);
  const closeModal = () => setDisplayModal(false);
  const setToastText = (text: string) => _setToastText(text);
  const setPageLoading = (props: boolean) => _setPageLoading(props);
  const setComponentLoading = (props: boolean) => _setComponentLoading(props);

  const value = React.useMemo(
    () => ({
      modalData,
      displaySidebar,
      displayFilter,
      displayModal,
      toastText,
      isPageLoading,
      isComponentLoading,
      displaySearch,

      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfAlreadyOpen,
      openFilter,
      closeFilter,
      openModal,
      closeModal,
      setModalData,
      setToastText,
      setPageLoading,
      setComponentLoading,
      setDisplaySearch,
    }),
    [
      displaySearch,
      displaySidebar,
      displayFilter,
      displayModal,
      modalData,
      toastText,
      isPageLoading,
      isComponentLoading,
    ]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = (): UIStateProps => {
  const context: any = useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: React.FC = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);
