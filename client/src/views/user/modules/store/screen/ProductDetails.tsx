import Button from "@/components/Button";
import GridStack from "@/components/GridStack";
// import { useParams } from "react-router-dom";

const ProductDetails = () => {
  //   const { id } = useParams<{ id: string }>();

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
    <div className="px-[32px] py-8">
      <GridStack columns={2} gap={32}>
        <div className="carousel carousel-vertical border border-gray-400 h-[450px] rounded-[10px]">
          {ProductsImages.map(({ src }) => (
            <div className="carousel-item h-full">
              <img className="w-full h-full object-cover" src={src} />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-[32px] font-bold">Product Name</h1>
          <div className="flex gap-4 items-center">
            <span className="text-[28px] font-semibold">P 500</span> |{" "}
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
            (5.0)
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-semibold text-[18px]">Description:</span>{" "}
            <p>
              Monstera Deliciosa, commonly known as the Swiss Cheese Plant, is a
              popular and iconic indoor plant with distinctive, glossy, and
              perforated leaves. Native to the rainforests of Central America,
              it has become a favorite choice for interior decoration due to its
              unique appearance and relatively easy care.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-semibold text-[18px]">Key Feature:</span>
            <ul className="list-disc pl-8">
              <li>Large, heart-shaped leaves with unique splits and holes.</li>
              <li>
                Fast-growing and can reach impressive sizes when provided with
                proper care.
              </li>
              <li>
                Adaptable to various light conditions, though it thrives in
                bright, indirect light.
              </li>
              <li>
                Well-suited for indoor spaces, adding a touch of tropical
                elegance.
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between my-4">
            <label className="flex flex-col gap-2 items-center">
              <span className="text-[18px]">Quantity</span>
              <input
                type="text"
                className="input w-[74px] input-bordered"
                placeholder="Qnt"
              />
            </label>
            <div className="flex gap-2 items-center flex-col">
              <span className="text-[18px]">Stocks</span>
              <span className="text-[22px] btn btn-circle">22</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Button className="btn btn-outline" title="Add to Cart" />
            <Button className="btn btn-outline" title="Buy Now" />
          </div>
        </div>
      </GridStack>
    </div>
  );
};

export default ProductDetails;
