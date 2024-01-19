import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import productApi from "../order.api";
import LoadingScreen from "@/containers/LoadingScreen";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id } = useParams();

  const { isLoading, isError, ...query } = useQuery({
    queryFn: async () => productApi.fetchById(id || ""),
    queryKey: [`products-${id}`],
  });

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    toast.error(query.error as any);
    return <LoadingScreen />;
  }

  return (
    <div className="overflow-hidden flex justify-center items-center h-full">
      <h1 className="text-[32px] font-bold">Under Construction</h1>
    </div>
  );
};

export default OrderDetails;
