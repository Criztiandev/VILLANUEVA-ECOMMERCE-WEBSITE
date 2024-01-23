/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import messageApi from "../message.api";
import LoadingScreen from "@/containers/LoadingScreen";
import { MessageModel } from "@/interface/model";
import Form from "@/components/Form";
import Field from "@/components/Field";
import Button from "@/components/Button";
import { singleMessage } from "../message.validation";
import queryUtils from "@/utils/query.utils";
import { useSelector } from "react-redux";
import { RootReducer } from "@/service/store";
import { motion } from "framer-motion";
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
    enabled: !!props.chatID,
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
      sender: UID || "",
      target: convoQuery?.data?.payload.participants.filter(
        (item: any) => item !== UID
      )[0],
      content: payload?.content,
    });
  };

  return (
    <>
      <div
        className="w-full bg-white p-4 rounded-10px] rounded-[5px] shadow-md"
        style={{ height: "calc(100vh - 120px)" }}>
        <div className="flex justify-between border-b pb-2">
          <h2 className="text-[24px] font-semibold">
            {convoQuery?.data?.payload?.title || "New Convo"}
          </h2>

          {props?.chatID && (
            <Modal.Button
              target="delete-convo"
              title="Delete"
              className="btn bg-primary text-white"
            />
          )}
        </div>
        {props.chatID && (
          <div className="h-[93%] flex flex-col justify-end">
            <motion.div className="h-[100vh]  my-4 flex justify-start flex-col gap-4 pb-4 px-2 overflow-y-scroll">
              {/* Your chat messages rendering code */}
              {convoQuery?.data?.payload?.messages.map(
                (message: MessageModel) => {
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
                }
              )}
            </motion.div>

            <Form<Message>
              onSubmit={handleSubmit}
              validation={singleMessage}
              className="flex gap-4">
              <Field
                name="content"
                placeholder="Enter message"
                className="input-lg"
              />
              <Button title="Send" className="btn-lg" />
            </Form>
          </div>
        )}
      </div>

      <DeleteModal
        id="delete-convo"
        onSubmit={() => deleteMutation.mutate({})}
      />
    </>
  );
};

export default MessagePanel;
