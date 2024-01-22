import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "ghost" | "neutral";
  dir?: "left" | "right" | undefined;
  title?: string;
  icon?: string;
  onClick?: () => void;
}

const Button = ({ as = "neutral", ...props }: Props) => {
  return (
    <button
      {...props}
      className={`btn text-normal
      ${as === "ghost" ? "btn-ghost text-black" : "bg-[#244d4d] text-white"}
      ${props.className && props.className}`}>
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
    </button>
  );
};

export default Button;
