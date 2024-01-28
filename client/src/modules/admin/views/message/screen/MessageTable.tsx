/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import { ConvoModel, MessageModel, UserModel } from "@/interface/model";
import messageValidationSchema from "../../../validation/message.validation";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import { useQuery } from "@tanstack/react-query";
import customerApi from "../../../api/customer.api";
import componentsUtils from "@/utils/components.utils";
import queryUtils from "@/utils/query.utils";
import messageApi from "../../../api/message.api";
import Searchbar from "../components/Searchbar";
import LoadingScreen from "@/containers/LoadingScreen";

import ChatBlob from "../components/ChatBlob";
import MessagePanel from "../components/MessagePanel";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "@/service/store";

const MessageTable = () => {
  const { UID } = useSelector((state: RootReducer) => state.auth);
  const [selectedConvo, setSelectedConvo] = useState("");

  const convoQuery = useQuery({
    queryFn: async () => await messageApi.fetchAll(),
    queryKey: ["convo"],
  });

  const customerQuery = useQuery({
    queryFn: async () => customerApi.fetchAll("user"),
    queryKey: ["customers"],
  });

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: MessageModel) =>
      messageApi.create(payload as any),
    invalidateKey: ["convo"],
    toast: "Messaged Successfully",
  });

  if (convoQuery.isLoading) return <LoadingScreen />;

  const handleSelectMessage = (chatID: string) => {
    setSelectedConvo(chatID);
  };

  const handleSubmit = (payload: MessageModel) => {
    mutation.mutate({ sender: UID || "", ...payload });
  };

  const handleClear = () => setSelectedConvo("");

  const { payload: result } = convoQuery.data as { payload: ConvoModel[] };

  return (
    <>
      <div className="grid grid-cols-[450px_auto] gap-4 mt-4">
        <div className="w-full bg-white p-4 rounded-10px] rounded-[5px] shadow-md">
          <div className="flex gap-2">
            <Searchbar />
            <Modal.Button
              target={`${selectedConvo}-message-modal`}
              title="Create"
              className="btn bg-primary text-white"
            />
          </div>

          <div className="flex flex-col gap-4 my-4">
            {result?.map((conv) => (
              <ChatBlob
                key={conv.title}
                {...conv}
                onSelect={handleSelectMessage}
              />
            ))}
          </div>
        </div>
        <MessagePanel chatID={selectedConvo} onDelete={handleClear} />
      </div>

      <Modal id={`${selectedConvo}-message-modal`}>
        <h3>Message</h3>
        <Form<MessageModel>
          onSubmit={handleSubmit}
          validation={messageValidationSchema}
          className="my-4">
          <Select
            title="Customer"
            name="target"
            disabled={customerQuery?.isLoading}
            placeholder="Select Customer"
            option={componentsUtils.optionTransformer<UserModel>({
              payload: customerQuery?.data?.payload,
              options: {
                key: "fullName",
                value: "_id",
              },
            })}
          />

          <div className="my-4">
            <Textarea title="Message" name="content" className="" />
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <Button title="Submit" />
            <Modal.Button
              target="message-modal"
              title="Cancel"
              className="btn  bg-slate-500 text-white"
            />
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default MessageTable;
