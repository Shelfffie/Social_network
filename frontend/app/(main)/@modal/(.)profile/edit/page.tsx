import { Modal } from "@/features/common/components/modal";
import EditProfileFormComponent from "@/features/profile/components/edit-profile";

export default function EditModal() {
  return (
    <Modal>
      <EditProfileFormComponent user={null} />;
    </Modal>
  );
}
