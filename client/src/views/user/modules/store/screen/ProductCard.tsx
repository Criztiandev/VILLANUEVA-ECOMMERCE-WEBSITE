import Button from "@/components/Button";
import { motion } from "framer-motion";
interface Props {
  _id?: string;
  thumbnail?: string | Array<string>;
  title: string;
  price: number | string;
  status?: string;
  onClick?: () => void;
}

const ProductCard = ({ title, ...props }: Props) => {
  const ProductsImages = [
    {
      src: "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
    },
    {
      src: "https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg",
    },
    {
      src: "https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg",
    },
    {
      src: "https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg",
    },
    {
      src: "https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg",
    },
  ];

  return (
    <motion.div
      whileHover={{ translateY: -10 }}
      className="relative card card-compact w-96 bg-base-100 shadow-xl">
      <div className="absolute right-0 top-0 badge bg-red-600 text-white p-4 m-4">
        New
      </div>
      <div
        className="h-[22rem] w-full  carousel carousel-vertical rounded-box"
        onClick={props.onClick}>
        {ProductsImages.map(({ src }) => (
          <div className="carousel-item h-full">
            <img className="w-full h-full object-cover" src={src} />
          </div>
        ))}
      </div>
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
