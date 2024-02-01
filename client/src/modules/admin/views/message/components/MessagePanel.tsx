/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import messageApi from "../../../api/message.api";
import LoadingScreen from "@/containers/LoadingScreen";
import { MessageModel } from "@/interface/model";
import Form from "@/components/Form";
import Field from "@/components/Field";
import Button from "@/components/Button";
import { singleMessage } from "../../../validation/message.validation";
import queryUtils from "@/utils/query.utils";
import { useSelector } from "react-redux";
import { RootReducer } from "@/service/store";
import Modal from "@/components/Modal";
import DeleteModal from "@/containers/DeleteModal";

interface Props {
  chatID: string;
  onDelete: () => void;
}

interface Message {
  content: string;
}

const MessagePanel = (props: Props) => {
  const { UID } = useSelector((state: RootReducer) => state.auth);
  const convoQuery = useQuery({
    queryFn: async () => messageApi.fetchById(props?.chatID || ""),
    queryKey: [`convo-${props?.chatID}`],
  });

  const deleteMutation = queryUtils.mutation({
    mutationFn: async () => messageApi.deleteById(props?.chatID || ""),
    invalidateKey: [`convo`],
    toast: "Deleted Successfully",
    onSuccess: () => {
      props.onDelete();
    },
  });

  // send mutation
  const mutation = queryUtils.mutation({
    mutationFn: async (payload: MessageModel) =>
      messageApi.create(payload as any),
    invalidateKey: [`convo-${props?.chatID}`],
    toast: "Sent Successfully",
  });

  if (convoQuery?.isLoading) return <LoadingScreen />;

  const handleSubmit = (payload: Message) => {
    mutation.mutate({
      title: convoQuery?.data?.payload?.title,
      sender: UID || "",
      target: "",
      content: payload?.content,
    });
  };

  return (
    <>
      <div
        className="w-full bg-white rounded-10px] flex flex-col  justify-between  rounded-[5px] shadow-md p-4"
        style={{ height: "calc(100vh - 120px)" }}>
        <div className="flex  justify-between pb-2">
          <h2 className="text-[24px] font-semibold">
            {convoQuery?.data?.payload?.title || "New Convo"}
          </h2>

          {props?.chatID && (
            <Modal.Button
              target={`delete-${props?.chatID}`}
              title="Delete"
              className="btn bg-primary text-white"
            />
          )}
        </div>

        <div className="h-full flex flex-col overflow-y-scroll px-4">
          {convoQuery?.data?.payload?.messages?.map((message: MessageModel) => {
            if (message?.sender === UID) {
              return (
                <div className="chat chat-end" key={message?._id}>
                  <div className="chat-bubble">{message.content}</div>
                </div>
              );
            }

            return (
              <div className="chat chat-start" key={message?._id}>
                <div className="chat-bubble">{message.content}</div>
              </div>
            );
          })}
        </div>

        <Form<Message>
          onSubmit={handleSubmit}
          validation={singleMessage}
          className="flex gap-4 mt-4">
          <Field
            name="content"
            placeholder="Enter message"
            className="input-lg"
          />
          <Button title="Send" className="btn-lg" />
        </Form>
      </div>

      <DeleteModal
        id={`delete-${props?.chatID}`}
        onSubmit={() => deleteMutation.mutate({})}
      />
    </>
  );
};

export default MessagePanel;
