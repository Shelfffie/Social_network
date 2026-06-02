import { Modal } from "@/features/common/components/modal-and-alert/modal";
import EditProfileFormComponent from "@/features/profile/components/edit-profile";

export default function EditModal() {
  return (
    <Modal>
      <EditProfileFormComponent />
    </Modal>
  );
}
