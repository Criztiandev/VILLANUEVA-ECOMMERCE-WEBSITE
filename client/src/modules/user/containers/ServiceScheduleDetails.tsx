/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "@/containers/LoadingScreen";
import { MessageModel, ServiceScheduleModel } from "@/interface/model";
import queryUtils from "@/utils/query.utils";
import orderApi from "@/modules/admin/api/order.api";
import Modal from "@/components/Modal";
import { toast } from "react-toastify";
import serviceBookApi from "@/modules/public/api/serviceBook.api";
import fileApi from "@/service/api/file.api";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Field from "@/components/Field";
import messageApi from "../api/message.api";
import { useSelector } from "react-redux";
import { RootReducer } from "@/service/store";
import { singleMessage } from "@/modules/admin/validation/message.validation";

interface Message {
  content: string;
}

const ServiceScheduleDetails = () => {
  const { UID } = useSelector((state: RootReducer) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const serviceBookedQuery = useQuery({
    queryFn: async () => serviceBookApi.fetchById(id || ""),
    queryKey: [`service-${id}`],
    enabled: !!id,
  });

  const coverQuery = useQuery({
    queryFn: async () => {
      const modifiedName = serviceBookedQuery?.data?.payload?.serviceId?.name
        .split(" ")
        .join("_")
        .toLowerCase();

      return await fileApi.fetchImage(
        `/products/${modifiedName}/${serviceBookedQuery?.data?.payload?.serviceId?.images[0]}`
      );
    },
    queryKey: ["servicebooked-cover"],
    enabled: !!serviceBookedQuery?.data?.payload,
  });

  const messageQuery = useQuery({
    queryFn: async () =>
      await messageApi.fetchAll({
        title: serviceBookedQuery?.data?.payload?.serviceId?.name,
      }),
    queryKey: ["messages"],
    enabled: !!serviceBookedQuery?.data?.payload?.customer?._id,
  });

  const statusMutation = queryUtils?.mutation({
    mutationFn: async (payload) => orderApi.updateById(id || "", payload),
    invalidateKey: ["orders"],
    toast: "Cancel Order Successfully",
    onSuccess: () => {
      navigate("/order");
    },
  });

  const messageMutation = queryUtils?.mutation({
    mutationFn: async (payload: MessageModel) => messageApi?.create(payload),
    invalidateKey: ["messages"],
    toast: "Message Sent",
  });
  const deleteMessageMutation = queryUtils?.mutation({
    mutationFn: async (payload: any) => messageApi?.deleteByFilter(payload),
    invalidateKey: ["messages"],
    toast: "Message Sent",
  });

  const serviceBookedMutation = queryUtils?.mutation({
    mutationFn: async (payload: any) =>
      serviceBookApi?.updateById(id || "", payload),
    invalidateKey: [`service-${id}`],
  });

  if (serviceBookedQuery?.isLoading) return <LoadingScreen />;

  const handleSubmit = () => {
    if (status === "") {
      toast.error("Empty status, Please Try again");
      return;
    }

    statusMutation.mutate({ status: status });
  };

  const handleSendMessage = (result: Message) => {
    const customerID = serviceBookedQuery?.data?.payload?.customer?._id;

    messageMutation.mutate({
      title: payload?.serviceId?.name,
      sender: UID || "",
      content: result.content,
      target: customerID,
    });
  };

  const handleCancel = () => {
    serviceBookedMutation.mutate({ status: "cancel" });
    deleteMessageMutation.mutate({
      title: (payload?.serviceId as any)?.name,
    });
  };
  const handleComplete = () => {
    serviceBookedMutation.mutate({ status: "completed" });
    deleteMessageMutation.mutate({
      title: (payload?.serviceId as any)?.name,
    });
  };

  const payload: ServiceScheduleModel = serviceBookedQuery?.data?.payload;
  const messagePayload = messageQuery?.data?.payload[0];

  console.log(messageQuery?.data);
  return (
    <>
      <div className="p-[24px]">
        <h1 className="text-[24px]  font-semibold ">Service details</h1>
        <div className="flex justify-between items-center my-4">
          <span>
            Service ID:
            <span className="font-semibold"></span>
          </span>
          <div className="flex gap-4 items-center">
            <span>
              Status:{" "}
              {payload?.status && (
                <span
                  className={`badge p-4 capitalize font-semibold ${
                    payload?.status === "pending"
                      ? "bg-[rgba(82,145,255,0.5)] border-2 border-[rgba(82,146,255,0.97)]"
                      : payload?.status === "cancel"
                      ? "bg-[rgba(255,82,82,0.5)]  border-2 border-[rgba(255,82,82,0.97)]"
                      : payload?.status === "delivered" ||
                        payload?.status === "finished"
                      ? "bg-[rgba(80,194,97,0.5)] border-2 border-[rgba(44,140,75,0.97)]"
                      : payload?.status === "transit" ||
                        payload?.status === "process"
                      ? "bg-[rgba(255,193,7,0.5)] border-2 border-[rgba(255,193,7,0.97)]"
                      : payload?.status === "completed"
                      ? "bg-[rgba(80,194,97,0.5)] border-2 border-[rgba(44,140,75,0.97)]"
                      : "bg-primary text-white"
                  }`}>
                  {payload?.status}
                </span>
              )}
            </span>
            {payload?.status !== "completed" && (
              <Modal.Button
                target="message-modal"
                title="Message"
                className="btn bg-primary text-white"
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-[5px]">
            <h3 className="text-[18px] font-semibold my-2">Service Details</h3>

            <div className="w-full h-[200px] border rounded-[5px] mb-4 overflow-hidden">
              <img
                src={coverQuery?.data as string}
                alt="cover"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex gap-2 mb-4">
              <span>Name:</span>
              <span className="font-semibold">
                {(payload?.serviceId as any)?.name}
              </span>
            </div>
            <div className="flex gap-2 flex-col">
              <span>Service Offer:</span>
              <ul className="list-disc px-8 grid grid-cols-2">
                {(payload?.serviceId as any).services[0]
                  ?.split(",")
                  ?.map((items: string) => (
                    <li>{items}</li>
                  ))}
              </ul>
            </div>
            <div className="flex gap-2 flex-col my-4">
              <span className="font-semibold">Description:</span>
              <p>{(payload?.serviceId as any).description}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-[5px] border">
            <div>
              <h3 className="text-[18px] font-semibold">Customer Details</h3>
              <div className="my-4 flex flex-col gap-2 border border-gray-400 rounded-[5px] p-4 bg-gray-100">
                <span>
                  <span className="font-medium">Name:</span>{" "}
                  {(payload.customer as any)?.fullName}
                </span>
                <span>
                  <span className="font-medium">Age:</span>{" "}
                  {(payload?.customer as any)?.age}
                </span>
                <span>
                  <span className="font-medium">Email:</span>{" "}
                  {(payload?.customer as any)?.email as any}
                </span>
                <span>
                  <span className="font-medium">Contact:</span>{" "}
                  {(payload?.customer as any)?.contact as any}
                </span>
                <span>
                  <span className="font-medium">Address:</span>{" "}
                  {(payload?.customer as any)?.address as any}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold">Service Details</h3>
              <div className="my-4 flex flex-col gap-2 border border-gray-400 rounded-[5px] p-4">
                <span>
                  <span className="font-medium">Schedule:</span>{" "}
                  {payload.schedule}
                </span>

                <span>
                  <span className="font-medium">Location :</span>
                  <span className="underline mx-2">{payload?.location}</span>
                </span>

                <span>
                  <span className="font-medium">Payment Method:</span>
                  <span className="underline mx-2">Contract</span>
                </span>
              </div>
            </div>

            <div className="bg-primary w-full px-4 py-2 rounded-[5px] text-white text-end">
              <span className="font-medium">Budget:</span> {payload?.budget}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 my-4">
          {payload?.status === "pending" && (
            <Button title="Cancel this Service" onClick={handleCancel} />
          )}
          {payload?.status === "finished" && (
            <Button title="Complete" onClick={handleComplete} />
          )}
        </div>
      </div>

      <Modal id="confirm-modal">
        <h3 className="text-[24px] font-semibold">Notice</h3>
        <p className="my-4">
          Are you absolutely certain that you wish to proceed with updating this
          order? Please be aware that once the update is initiated, it cannot be
          undone. Additionally, the system will automatically notify the user
          about the modifications made to the order. Confirming this action
          implies that you have reviewed and confirmed the changes, and you
          understand the irreversible nature of the update.
        </p>

        <div className="flex justify-end gap-2">
          <Modal.Button
            target="confirm-modal"
            title="Cancel"
            className="btn bg-primary text-white"
          />
          <Modal.Button
            target="confirm-modal"
            title="Confirm"
            className="btn bg-primary text-white"
            onClick={handleSubmit}
          />
        </div>
      </Modal>

      <Modal id="message-modal">
        <h3 className="text-[18px] font-semibold">
          {(payload?.customer as any)?.fullName}
        </h3>
        <div className="h-[300px] border my-4 p-4 flex flex-col gap-2 overflow-y-scroll">
          {messagePayload?.messages?.map((items: MessageModel) => {
            if (items?.sender === UID) {
              return (
                <div className="chat chat-end">
                  <div className="chat-bubble">{items.content}</div>
                </div>
              );
            } else {
              return (
                <div className="chat chat-start">
                  <div className="chat-bubble">{items.content}</div>
                </div>
              );
            }
          })}
        </div>

        <Form<Message> onSubmit={handleSendMessage} validation={singleMessage}>
          <div className="flex gap-2">
            <Field name="content" placeholder="Enter your message" />
            <Button title="Send" />
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ServiceScheduleDetails;
