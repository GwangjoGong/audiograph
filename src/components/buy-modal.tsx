import { useReactiveVar } from "@apollo/client";
import Modal from "react-modal";
import { modalOpenVar } from "../apollo";

export const BuyModal = () => {
  const isOpen = useReactiveVar(modalOpenVar);

  const closeModal = () => {
    modalOpenVar(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          maxWidth: "640px",
          height: "500px",
          top: "50%",
          transform: "translateY(-50%)",
        },
      }}
      closeTimeoutMS={500}
      contentLabel="Test"
    >
      <div className="w-full flex justify-between">
        <h2 className="font-medium text-xl">Invest</h2>
        <div className="btn" onClick={closeModal}>
          Cancel
        </div>
      </div>
    </Modal>
  );
};
