import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "@/containers/LoadingScreen";
import { ProductModel } from "@/interface/model";
import fileApi from "@/service/api/file.api";
import Button from "@/components/Button";
import productApi from "../../api/product.api";
import Topbar from "../../layout/Topbar";
import Form from "@/components/Form";
import Field from "@/components/Field";
import { toast } from "react-toastify";
import { serviceValidation } from "../../validation/service.validation";
import Textarea from "@/components/Textarea";

interface Service {
  schedule: string;
  budget: number;
  message: string;
}

const ServiceDetails = () => {
  const { id } = useParams();

  const productQuery = useQuery({
    queryFn: async () => productApi.fetchById(id || ""),
    queryKey: [`product-${id}`],
    enabled: !!id,
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

  if (productQuery.isError) {
    return <LoadingScreen />;
  }
  const { data: images } = imagesQuery as { data: string[] };

  const [cover, ...remainingImages] = images;

  const { payload: result } = productQuery.data as { payload: ProductModel };

  const handleSubmit = ({ quantity }: Service) => {
    console.log(quantity);
    toast.success("Add to cart successfully");
  };

  return (
    <section>
      <Topbar isStatic />

      <div className="px-[48px]">
        <div className="my-4">
          <h1 className="text-[48px] font-bold">{result.name}</h1>
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
        </div>
        {/* Cover */}
        <div className="grid grid-cols-2 gap-4 max-h-[600px]">
          <img src={cover} className="w-full h-[600px] object-cover " />
          <div className="grid grid-cols-2 gap-4">
            {remainingImages?.map((image, index) => {
              return (
                <div className="" key={index}>
                  <img
                    src={image}
                    alt={`image-${index}`}
                    className="object-cover w-full h-[290px]"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-[auto_600px] gap-[48px] mt-[64px]">
          <div>
            <h2 className="text-[32px] font-bold mb-4">Details</h2>
            <p>
              Reference site about Lorem Ipsum, giving information on its
              origins, as well as a random Lipsum generator. Reference site
              about Lorem Ipsum, giving information on its origins, as well as a
              random Lipsum generator. Reference site about Lorem Ipsum, giving
              information on its origins, as well as a random Lipsum generator.
            </p>

            <div className="my-4">
              <h3 className="text-[18px] font-medium">Services</h3>
              <ul className="my-4 flex flex-col gap-2">
                <li>Details 1</li>
                <li>Details 2</li>
                <li>Details 3</li>
                <li>Details 4</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col ap-4">
              <div className="border-t-2 border-b-2 py-2 ">
                <h3 className="text-[18px] font-medium mb-4">Details</h3>
                <p className="text-base">{result.description}</p>
              </div>

              <div className="border-b-2 py-2 my-4">
                <h3 className="text-[18px] font-medium mb-4">Shipping</h3>
                <p className="text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique. Duis
                  cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                  commodo diam libero vitae erat. Aenean faucibus nibh et justo
                  cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                  tristique posuere.
                </p>
              </div>

              <div className="border-b-2 py-2">
                <h3 className="text-[18px] font-medium mb-4">Returns</h3>
                <p className="text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique. Duis
                  cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                  commodo diam libero vitae erat. Aenean faucibus nibh et justo
                  cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                  tristique posuere.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[32px] font-semibold mb-4">
              Available (25 slots)
            </h2>
            <div className="flex gap-4 my-3">
              <div className="rating">
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
              </div>
              <span className="text-[18px]">(3.5 Stars) | 10 reviews</span>
            </div>

            <Form<Service>
              onSubmit={handleSubmit}
              validation={serviceValidation}
              className="my-4">
              <div className="my-4">
                <Field
                  type="number"
                  title="Budget"
                  name="budget"
                  placeholder="Enter Budget"
                />
              </div>
              <div className="my-4">
                <Field
                  type="date"
                  title="Prefered Schedule"
                  name="schedule"
                  placeholder="Enter Quality"
                />
              </div>

              <div className="my-4">
                <Field
                  type="string"
                  title="Location"
                  name="address"
                  placeholder="Enter Location"
                />
              </div>

              <div>
                <Textarea
                  title="Message"
                  name="message"
                  placeholder="Enter your message here"
                />
              </div>

              <div className="flex flex-col gap-4 my-4">
                <Button title="Book now" className="w-full" />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
