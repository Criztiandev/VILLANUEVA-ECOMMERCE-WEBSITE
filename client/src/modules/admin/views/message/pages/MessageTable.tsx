import Container from "@/components/Container";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Table from "@/components/Table";
import { MessageModel, UserModel } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";
import messageValidationSchema from "../message.validation";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import { useQuery } from "@tanstack/react-query";
import customerApi from "../../customer/customer.api";
import componentsUtils from "@/utils/components.utils";

const MessageTable = () => {
  const { name, columns } = tableConfig.customerTable;

  const customerQuery = useQuery({
    queryFn: async () => customerApi.fetchAll("user"),
    queryKey: ["customers"],
  });

  console.log(customerQuery.data);

  return (
    <>
      <Container className="mt-4">
        <Table.Panel name={name} title="Message">
          <Modal.Button
            target="message-modal"
            title="Create"
            className="btn bg-primary text-white"
          />
        </Table.Panel>
        <Table<UserModel> id={name} columns={columns} />
      </Container>

      <Modal id="message-modal">
        <h3>Message</h3>
        <Form<MessageModel>
          onSubmit={() => {}}
          validation={messageValidationSchema}
          className="my-4">
          <Select
            title="Customer"
            name="customer"
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

          <Textarea title="Message" name="message" />
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
