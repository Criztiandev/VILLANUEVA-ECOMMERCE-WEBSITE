/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseProps } from "@/interface/component";
interface Props extends BaseProps {
  id: string;
}

interface ButtonProps extends BaseProps {
  target: string;
  title?: string;
  icon?: string;
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

const Button = (props: ButtonProps) => {
  return (
    <label
      htmlFor={props.target}
      {...props}
      className={`cursor-pointer ${props.className && props.className}`}>
      {props.title ? props.title : <img src={props.icon} />}
    </label>
  );
};

Modal.Button = Button;

export default Modal;
