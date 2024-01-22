/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import { UserModel } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";
import { Link } from "react-router-dom";

const UserTable = () => {
  const { name, columns } = tableConfig.userTable;

  return (
    <>
      <Container className="mt-4">
        <Table.Panel name={name} title="User">
          <Link to={"create"}>
            <Button title="Create" />
          </Link>
        </Table.Panel>
        <Table<UserModel> id={name} columns={columns as any} />
      </Container>
    </>
  );
};

export default UserTable;
