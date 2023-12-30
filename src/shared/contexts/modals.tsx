import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Modal } from "../../components/modal";
import { PossibleModal, modalRoutes } from "./modals.routes";

export interface ModalConsumer {
  showModal: boolean;
  handleCloseModal: (result?: any) => any;
  openModal: (modalName: PossibleModal) => Promise<any>;
}

const AuthModalContext = createContext<ModalConsumer>({
  showModal: false,
  handleCloseModal: () => {},
  openModal: async () => {},
});

export function closeModal() {
  document.getElementsByTagName("body")[0].classList.remove("overflow-hidden");
}

export const useModal: () => ModalConsumer = () => {
  return useContext(AuthModalContext);
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpened] = useState(false);
  const [openedModal, setOpenedModal] = useState<PossibleModal>();
  const [modalPromise, setModalPromise] = useState<{
    promise: Promise<any> | null;
    resolve: (result?: any) => void;
  }>({ promise: null, resolve: () => {} });

  const handleCloseModal = (result?: any) => {
    setIsOpened(false);
    setOpenedModal(undefined);
    closeModal();

    if (modalPromise.promise) {
      modalPromise.resolve(result);
      setModalPromise({ promise: null, resolve: () => {} });
    }
  };

  const openModal = (modalName: PossibleModal): Promise<any> => {
    let res: ((value?: any) => void) | null = null;
    const promise = new Promise<any>((resolve) => {
      res = resolve;
    });
    setModalPromise({ promise, resolve: res! });

    setOpenedModal(modalName);
    setIsOpened(true);

    return promise;
  };

  const modalContents = modalRoutes.find(
    (modalRoute) => openedModal === modalRoute.route
  );
  useEffect(() => {
    if (openedModal) {
      document.getElementsByTagName("body")[0].classList.add("overflow-hidden");
    } else {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("overflow-hidden");
    }
  }, [openedModal]);

  return (
    <AuthModalContext.Provider
      value={{
        showModal: isOpen,
        openModal,
        handleCloseModal,
      }}
    >
      {children}
      <Modal
        isOpen={isOpen}
        title={modalContents?.title}
        handleClose={handleCloseModal}
      >
        {modalContents?.modal || <div>Modal route not found</div>}
      </Modal>
    </AuthModalContext.Provider>
  );
};
