import { OrderPayload } from "@/interface/model";
const OrderBlob = (props: OrderPayload) => {
  console.log(props);

  return (
    <div className=" border flex gap-8 justify-between items-center p-2 rounded-[5px] hover:bg-primary hover:text-white hover:cursor-pointer">
      <div className="flex gap-12 items-center ">
        <span>{props.refID}</span>
        <div>
          <h3 className="text-[18px] font-semibold">{props?.productName}</h3>
          <span className="text-[16px] font-light text-gray-400">
            {props.fullName}
          </span>
        </div>
      </div>
      <div className="text-[24px] font-semibold px-4">{props.quantity}</div>
    </div>
  );
};

export default OrderBlob;
