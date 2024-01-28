/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseProps } from "@/interface/component";
interface Props extends BaseProps {
  id: string;
}

interface Button extends BaseProps {
  target: string;
  dir?: "left" | "right" | undefined;
  title?: string;
  icon?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Modal = (props: Props) => {
  return (
    <>
      <input type="checkbox" id={props.id} className="modal-toggle" />
      <div
        className={`${props.className ? props.className : ""} modal`}
        role="dialog">
        <div className="modal-box">{props.children}</div>
        <label className="modal-backdrop" htmlFor={props.id}>
          Close
        </label>
      </div>
    </>
  );
};

const Button = (props: Button) => {
  return (
    <label htmlFor={props.target} {...props}>
      {/* Left icon */}
      {props.dir && props.icon && props.dir === "left" && (
        <img src={props.icon} alt="icon" loading="lazy" />
      )}
      {/* Content */}
      {props.title && <span className="text-base">{props.title}</span>}
      {/* Right icon */}
      {props.dir && props.icon && props.dir === "right" && (
        <img src={props.icon} alt="icon" loading="lazy" />
      )}
    </label>
  );
};

Modal.Button = Button;

export default Modal;
