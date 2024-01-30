/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingScreen from "@/containers/LoadingScreen";
import { ServiceModel } from "@/interface/model";
import fileApi from "@/service/api/file.api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface Props extends ServiceModel {
  path: string;
  action?: boolean;
  isDoubleClick?: boolean;
}

const ServiceItem = (props: Props) => {
  const navigate = useNavigate();

  const coverImage =
    props.images && props.images.length > 0 ? props.images[0] : null;

  const modifiedName = props.name?.split(" ")?.join("_")?.toLowerCase();

  // Use a more descriptive variable name for the query
  const coverImageQuery = useQuery({
    queryFn: async () =>
      fileApi.fetchImage(`products/${modifiedName}/${coverImage}`),
    queryKey: [`${props._id}-${props.name}`],
    enabled: !!props._id && !!coverImage,
  });

  const defaultServices = props.services && props?.services[0].split(",");

  if (coverImageQuery.isLoading) return <LoadingScreen />;
  const { data: image } = coverImageQuery;
  return (
    <div className="bg-white w-full border border-gray-300 rounded-[5px] p-4 hover:border-none hover:bg-white hover:drop-shadow-xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-[24px] font-semibold">{props.name}</h3>
          <span className="text-gray-400">{props.category}</span>
        </div>
      </div>

      <div
        className="h-[250px]  w-full my-4 cursor-pointer"
        onDoubleClick={() => (props.isDoubleClick ? navigate(props.path) : "")}>
        {/* Use optional chaining to safely access coverImageQuery.data */}
        {(image as any) && (
          <img
            src={image as string}
            alt={props.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div>
        <h3 className="text-[22px] font-semibold capitalize">Description</h3>
        <p className="text-base">{props.description}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-[22px] font-semibold capitalize">Services</h3>
        <ul className="flex flex-col gap-2 list-disc pl-6 ">
          {defaultServices?.map((service) => (
            <li key={service} className="text-base">
              {service}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceItem;
