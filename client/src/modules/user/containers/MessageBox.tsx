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
import userApi from "../api/user.api";

interface Message {
  content: string;
}

const MessageBox = () => {
  const { state, toggleMessage } = useMessageContext();
  const { UID } = useSelector((state: RootReducer) => state.auth);

  const userDetailQuery = useQuery({
    queryFn: async () => userApi.fetchById(UID || ""),
    queryKey: ["user"],
  });

  const messageMutation = queryUtils.mutation({
    mutationFn: async (payload: MessageModel) =>
      await messageApi.create(payload),
    invalidateKey: ["message"],
  });

  const messageQuery = useQuery({
    queryFn: async () =>
      messageApi.fetchAll({
        title: userDetailQuery?.data?.payload?.fullName,
      }),
    queryKey: ["message"],
    enabled: !!UID,
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
      title: userDetailQuery?.data?.payload?.fullName,
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
          <div className="h-screen border bg-white flex flex-col justify-between p-4">
            <div className="flex gap-4 items-center border-y border-gray-300 p-4">
              <div className="w-[24px] h-[24px] rounded-full bg-green-400"></div>
              <h1 className="capitalize text-[22px] font-semibold">
                villanueva Gardens
              </h1>
            </div>

            <div className="h-full flex flex-col  overflow-scroll p-4">
              {payload &&
                payload[0]?.messages?.map((message: MessageModel) => {
                  if (message?.sender === UID) {
                    return (
                      <div className="chat chat-end" key={message?._id}>
                        <div className="chat-bubble">{message?.content}</div>
                      </div>
                    );
                  }

                  return (
                    <div className="chat chat-start" key={message?._id}>
                      <div className="chat-bubble">{message?.content}</div>
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
