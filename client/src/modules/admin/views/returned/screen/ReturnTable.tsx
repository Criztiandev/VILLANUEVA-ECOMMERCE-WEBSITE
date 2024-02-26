import Container from "@/components/Container";
import Table from "@/components/Table";
import { OrderPayload } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";

const ReturnTable = () => {
  const { name, columns } = tableConfig.returnTable;

  return (
    <>
      <Container>
        <Table.Panel title="Returns" name={name} />
        <Table<OrderPayload> id={name} columns={columns} />
      </Container>
    </>
  );
};

export default ReturnTable;
