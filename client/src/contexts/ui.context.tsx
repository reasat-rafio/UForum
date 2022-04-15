import React, { createContext, useContext, useState } from "react";

interface IIsloading {
  state: boolean;
  text?: null | string;
}
export interface UIStateProps {
  displaySidebar: boolean;
  displayFilter: boolean;
  displayModal: boolean;
  modalData: unknown;
  toastText: string;
  isPageLoading: IIsloading;
  isComponentLoading: IIsloading;

  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  closeSidebarIfAlreadyOpen: () => void;
  openFilter: () => void;
  closeFilter: () => void;
  openModal: () => void;
  closeModal: () => void;
  setPageLoading: (props: IIsloading) => void;
  setComponentLoading: (props: IIsloading) => void;
}

const UIContext = createContext<UIStateProps | unknown>(null);
UIContext.displayName = "UIContext";

export const UIProvider: React.FC = (props) => {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [toastText, _setToastText] = useState("");
  const [isPageLoading, _setPageLoading] = useState<IIsloading>({
    state: false,
    text: null,
  });
  const [isComponentLoading, _setComponentLoading] = useState<IIsloading>({
    state: false,
    text: null,
  });

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
  const setPageLoading = (props: IIsloading) => _setPageLoading(props);
  const setComponentLoading = (props: IIsloading) =>
    _setComponentLoading(props);

  const value = React.useMemo(
    () => ({
      modalData,
      displaySidebar,
      displayFilter,
      displayModal,
      toastText,
      isPageLoading,
      isComponentLoading,

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
    }),
    [
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
