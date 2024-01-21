import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import tableConfig from "@/modules/admin/config/table.config";
import { Link } from "react-router-dom";
import { UserModel } from "../customer.validation";

const CustomerTable = () => {
  const { name, columns } = tableConfig.customerTable;

  return (
    <>
      <Container className="mt-4">
        <Table.Panel name={name} title="Customer">
          <Link to={"create"}>
            <Button title="Create" />
          </Link>
        </Table.Panel>
        <Table<UserModel> id={name} columns={columns} />
      </Container>
    </>
  );
};

export default CustomerTable;
