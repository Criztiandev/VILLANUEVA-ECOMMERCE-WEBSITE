/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

interface Props {
  image: any | null | undefined;
  isDelete: boolean;
  onCoverChange: (payload: FileList) => void;
}

const OtherImage = (props: Props) => {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      whileHover={props.isDelete ? deleteVariant : changeCoverVariant}
      onHoverEnd={() => {
        return {
          rotate: 0,
          transition: { duration: 0.3 },
        };
      }}
      className="relative w-full h-full rounded-[5px] border border-black">
      {props.image && (
        <motion.img
          src={URL.createObjectURL(props.image)}
          alt="product image"
          className={`cursor-pointer w-full h-full object-cover `}
          onClick={() => props.onCoverChange(props.image)}
        />
      )}
    </motion.div>
  );
};

export default OtherImage;

const deleteVariant = {
  rotate: [-5, 5, -5, 5, 0], // Keyframes for the side-to-side shake animation
  transition: {
    duration: 0.3,
    repeat: Infinity,
  },
  border: "3px solid red",
};

const changeCoverVariant = {
  transition: {
    duration: 0.3,
    repeat: Infinity,
  },
  border: "3px solid silver",
};
