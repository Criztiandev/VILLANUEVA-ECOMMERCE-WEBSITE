/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootReducer } from "@/service/store";
import queryUtils from "@/utils/query.utils";
import { useSelector } from "react-redux";
import messageApi from "../api/message.api";
import { MessageModel } from "@/interface/model";
import { useEffect } from "react";
import Field from "@/components/Field";
import Form from "@/components/Form";
import { messageValidation } from "../validation/message.validaiton";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "@/containers/LoadingScreen";
import { useMessageContext } from "../context/MessageContext";

interface Message {
  content: string;
}

const MessageBox = () => {
  const { state, toggleMessage } = useMessageContext();
  const { UID } = useSelector((state: RootReducer) => state.auth);

  const messageQuery = useQuery({
    queryFn: async () => messageApi.fetchById(UID || ""),
    queryKey: ["message"],
    enabled: !!UID,
  });

  const messageMutation = queryUtils.mutation({
    mutationFn: async (payload: MessageModel) =>
      await messageApi.create(payload),
    invalidateKey: ["message"],
  });

  useEffect(() => {
    if (state.isActive) {
      // turn off the scroll bar
      document.body.style.overflow = "hidden";
    }

    return () => {
      // turn on the scroll bar
      document.body.style.overflow = "unset";
    };
  }, [state.isActive]);

  if (messageQuery?.isLoading) return <LoadingScreen />;

  const handleMessage = (payload: Message) => {
    if (!payload.content) {
      toast.error("Message is required");
      return;
    }

    messageMutation.mutate({
      sender: UID!,
      content: payload.content,
      target: UID!,
    });
  };

  const payload = messageQuery.data?.payload;

  return (
    <>
      {state.isActive && (
        <div className="fixed top-0 left-0 grid grid-cols-[auto_500px] w-full z-50">
          <div className="bg-black opacity-30" onClick={toggleMessage}></div>
          <div className="h-screen border bg-white flex flex-col justify-between ">
            <div className="flex gap-4 items-center border-y border-gray-300 p-4">
              <div className="w-[24px] h-[24px] rounded-full bg-green-400"></div>
              <h1 className="capitalize text-[22px] font-semibold">
                villanueva Gardens
              </h1>
            </div>

            <div className="h-full flex flex-col-reverse overflow-y-scroll px-4">
              {payload?.messages.map((message: MessageModel) => {
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

            <div className="px-2">
              <Form<Message>
                onSubmit={handleMessage}
                validation={messageValidation}>
                <div className="flex gap-2">
                  <Field name="content" placeholder="Enter message" />
                  <Button title="Send" />
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageBox;
