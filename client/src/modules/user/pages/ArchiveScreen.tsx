import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import { OrderPayload } from "@/interface/model";
import { Link } from "react-router-dom";
import tableConfig from "../config/table.config";

const ArchiveProductOrderTable = () => {
  const { name, columns } = tableConfig.ArchiveProductTable;

  return (
    <div className="px-[24px]">
      <Container>
        <Table.Panel title="Completed Order" name={name}>
          <Link to={"/"}>
            <Button title="Go Back" />
          </Link>
        </Table.Panel>
        <Table<OrderPayload> id={name} columns={columns} />
      </Container>
    </div>
  );
};

export default ArchiveProductOrderTable;
