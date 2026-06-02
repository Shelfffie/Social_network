import { Button } from "@/components/ui/button";
import WhiteButton from "../white-indigo-button";
import { Modal } from "./modal";

interface AlertPropsType {
  setModalState: () => void;
  onConfirm: () => void;
  isAlert?: boolean;
  modalText: {
    title: string;
    content?: string;
    cancelButton: string;
    confirmButton?: string;
  };
}

export default function Alert({
  isAlert = true,
  setModalState,
  onConfirm,
  modalText,
}: AlertPropsType) {
  return (
    <Modal onClose={setModalState}>
      <div className="flex flex-col items-center justify-center gap-7 h-50 w-full overflow-hidden">
        <h1 className="text-lg">{modalText?.title}</h1>
        <p>{modalText?.content}</p>
        <div className="flex flex-row gap-10">
          <WhiteButton text={modalText.cancelButton} onClick={setModalState} />
          {isAlert && (
            <Button variant="destructive" onClick={onConfirm} className="w-30">
              {modalText?.confirmButton}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
