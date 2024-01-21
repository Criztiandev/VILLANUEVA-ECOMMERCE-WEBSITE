import Button from "@/components/Button";

interface Props {
  isDelete: boolean;
  onClear: () => void;
  onToggleDelete: () => void;
}

const CoverAction = (props: Props) => {
  return (
    <>
      <div></div>
      <div className="flex justify-end gap-4">
        {props.isDelete ? (
          <Button
            type="button"
            className="w-[100px]"
            title="Cancel"
            onClick={props.onToggleDelete}
          />
        ) : (
          <>
            <Button
              type="button"
              className="w-[100px]"
              title="Delete"
              onClick={props.onToggleDelete}
            />
            <Button
              type="button"
              className="w-[100px]"
              title="Clear"
              onClick={props.onClear}
            />
          </>
        )}
      </div>
    </>
  );
};

export default CoverAction;
