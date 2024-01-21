import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import { CustomerModel } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";
import { Link } from "react-router-dom";

const MessageTable = () => {
  const { name, columns } = tableConfig.customerTable;

  return (
    <>
      <Container className="mt-4">
        <Table.Panel name={name} title="Customer">
          <Link to={"/create"}>
            <Button title="Create" />
          </Link>
        </Table.Panel>
        <Table<CustomerModel> id={name} columns={columns} />
      </Container>
    </>
  );
};

export default MessageTable;
