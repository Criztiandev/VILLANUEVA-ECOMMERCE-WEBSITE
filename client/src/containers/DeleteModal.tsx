import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Stack from "@/components/FlexStack";

interface Props {
  id: string;
  isPending?: boolean;
  onSubmit: () => void;
  onSuccess?: () => void;
}

const DeleteModal = ({ id, onSubmit, ...props }: Props) => {
  return (
    <Modal id={id}>
      <h2 className="text-[24px] font-bold">
        Are you sure you want to Delete ?
      </h2>
      <p className="my-4 text-base">
        Are you sure you want to delete this? This action cannot be undone. All
        associated data will be permanently removed from the system. Please
        double-check before proceeding.
      </p>

      <Stack gap={8}>
        <Button
          disabled={props.isPending}
          title="Confirm"
          className="w-full"
          onClick={onSubmit}
        />

        <label className="btn w-full text-balance" htmlFor={id}>
          Cancel
        </label>
      </Stack>
    </Modal>
  );
};

export default DeleteModal;
