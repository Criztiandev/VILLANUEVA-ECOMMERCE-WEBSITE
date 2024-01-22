import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "@/containers/LoadingScreen";
import { CategoryModel, ProductModel } from "@/interface/model";
import fileApi from "@/service/api/file.api";
import Button from "@/components/Button";
import productApi from "@/modules/admin/views/products/product.api";
import Header from "../containers/Header";
import categoriesApi from "@/modules/admin/views/categories/categories.api";

const ProductDetails = () => {
  const { id } = useParams();

  const productQuery = useQuery({
    queryFn: async () => productApi.fetchById(id || ""),
    queryKey: [`product-${id}`],
    enabled: !!id,
  });

  const categoryQuery = useQuery({
    queryFn: async () => await categoriesApi.fetchAll(),
    queryKey: ["categories"],
  });

  const imagesQuery = useQuery({
    queryFn: async () => {
      const { payload } = productQuery?.data as { payload: ProductModel };
      const modfiedName = payload?.name.split(" ").join("_").toLowerCase();
      const query = `/products/${modfiedName}`;
      if (!payload.images || payload.images.length === 0) {
        return [];
      }

      const imagePromises = payload.images.map((image) =>
        fileApi.fetchImage(`${query}/${image}`)
      );

      return Promise.all(imagePromises);
    },
    queryKey: ["product-images"],
    enabled: !!productQuery.data,
  });

  if (productQuery.isLoading || imagesQuery.isLoading) return <LoadingScreen />;

  if (productQuery.isError || categoryQuery?.isLoading) {
    return <LoadingScreen />;
  }

  const { data: images } = imagesQuery as { data: string[] };
  const cover = images.shift();

  const { payload: result } = productQuery.data as { payload: ProductModel };
  const { payload: categoryRes } = categoryQuery.data as {
    payload: CategoryModel[];
  };

  return (
    <div className="h-screen">
      <Header isStatic={true} />
      <div className="grid grid-cols-[300px_auto] gap-4">
        <ul className="menu bg-white border w-[300px] h-screen sticky top-0">
          <li>
            <h2 className="menu-title">Categories</h2>
            <ul>
              {categoryRes?.map((items: CategoryModel) => (
                <li key={items._id}>
                  <a>{items.name}</a>
                </li>
              ))}
            </ul>
            <li>Services</li>
          </li>
        </ul>

        <section className="p-4">
          <div className="grid grid-cols-2 gap-12 py-4">
            <div>
              <div className="text-sm breadcrumbs">
                <ul>
                  <li>
                    <Link to={"/"}>
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/products"}>
                      <span>Product</span>
                    </Link>
                  </li>
                  <li>{result?.name}</li>
                </ul>
              </div>

              <h1 className="text-[48px] font-bold">{result.name}</h1>

              <div className="flex gap-2 items-center">
                <span className="text-[32px] font-bold">P{result.price}</span>
                <div className="mx-2">|</div>
                <div className="badge p-4 bg-blue-500 text-white capitalize">
                  {result.status}
                </div>
              </div>

              <p className="text-base my-4">{result.summary}</p>

              <div className="flex flex-col gap-2">
                <span className="text-[18px] font-semibold ">Category</span>
                <div className="my-2 w-full">
                  <div className=" rounded-[0px] p-4 border-2 text-center border-black font-semibold w-full">
                    {result.category}
                  </div>
                </div>
              </div>

              <div className="my-4">
                <span className="text-[18px] font-semibold">Other info</span>
                <div className="my-2 flex gap-4">
                  <div
                    className={`btn btn-sm rounded-[0px] btn-outline ${
                      result?.isPublished ? "bg-green-400" : "bg-gray-500"
                    }`}>
                    {result.isPublished ? "Active" : "Inactive"}
                  </div>
                  <div className="btn btn-sm rounded-[0px] btn-outline">
                    {result?.stock} Stocks
                  </div>
                  <div className="btn btn-sm rounded-[0px] btn-outline">
                    {result.shippingFee || 0} Shipping Fee
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col ap-4">
                <div className="border-t-2 border-b-2 py-2 ">
                  <h3 className="text-[18px] font-medium mb-4">Details</h3>
                  <p className="text-base">{result.description}</p>
                </div>

                <div className="border-b-2 py-2 my-4">
                  <h3 className="text-[18px] font-medium mb-4">Shipping</h3>
                  <p className="text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique. Duis
                    cursus, mi quis viverra ornare, eros dolor interdum nulla,
                    ut commodo diam libero vitae erat. Aenean faucibus nibh et
                    justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae
                    risus tristique posuere.
                  </p>
                </div>

                <div className="border-b-2 py-2">
                  <h3 className="text-[18px] font-medium mb-4">Returns</h3>
                  <p className="text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique. Duis
                    cursus, mi quis viverra ornare, eros dolor interdum nulla,
                    ut commodo diam libero vitae erat. Aenean faucibus nibh et
                    justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae
                    risus tristique posuere.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col">
              <label className="relative w-full border-2 rounded-[5px] p-4 flex justify-center items-center h-[400px]">
                <img
                  src={cover}
                  className="absolute top-0 object-cover w-full h-full rounded-[5px]"
                />
              </label>
              <div className="grid grid-cols-4 gap-4 overflow-hidden">
                {images?.map((image, index) => {
                  return (
                    <div className="w-full h-[100px] border overflow-hidden">
                      <img
                        src={image}
                        alt={`image-${index}`}
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 my-8">
            <div></div>
            <div className="flex flex-col gap-2">
              <Button title="Add to Cart" />
              <Button title="Buy" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
