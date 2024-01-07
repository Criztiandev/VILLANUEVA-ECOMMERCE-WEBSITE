import Button from "@/components/Button";
import { motion } from "framer-motion";
interface Props {
  _id?: string;
  thumbnail: string;
  title: string;
  price: number | string;
  varaint: Array<{ title: string }>;
}

const ProductCard = ({ thumbnail, title, _id, ...props }: Props) => {
  return (
    <motion.div
      whileHover={{ translateY: -10 }}
      className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={thumbnail} alt={`prodict-${_id}`} />
      </figure>
      <div className="card-body flex justify-center items-center">
        <span className="text-[18px]">{title}</span>
        <h2 className="card-title my-2 text-[24px]">{props.price}</h2>
        <div className="rating rating-md">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            checked
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            checked
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
        </div>
        <div className="card-actions mt-8 w-full">
          <Button title="Add to Cart" className="w-full btn-outline" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
