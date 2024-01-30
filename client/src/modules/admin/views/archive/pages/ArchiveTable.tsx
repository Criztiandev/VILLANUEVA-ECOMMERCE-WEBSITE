import Container from "@/components/Container";
import Table from "@/components/Table";
import { OrderPayload } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";

const ArchiveProductOrderTable = () => {
  const { name, columns } = tableConfig.ArchiveProductTable;

  return (
    <>
      <Container>
        <Table.Panel title="Order" name={name} />
        <Table<OrderPayload> id={name} columns={columns} />
      </Container>
    </>
  );
};

export default ArchiveProductOrderTable;
