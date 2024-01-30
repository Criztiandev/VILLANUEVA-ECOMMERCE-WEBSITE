import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import { OrderPayload } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";
import { Link } from "react-router-dom";

const ArchiveProductOrderTable = () => {
  const { name, columns } = tableConfig.ArchiveProductTable;

  return (
    <div className="px-[24px]">
      <Container>
        <Table.Panel title="Completed Order" name={name}>
          <Link to={"/order"}>
            <Button title="Go Back" />
          </Link>
        </Table.Panel>
        <Table<OrderPayload> id={name} columns={columns} />
      </Container>
    </div>
  );
};

export default ArchiveProductOrderTable;
