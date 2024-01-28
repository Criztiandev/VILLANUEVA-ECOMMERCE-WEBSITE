import Container from "@/components/Container";
import Table from "@/components/Table";
import { OrderPayload } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";

const OrderTable = () => {
  const { name, columns } = tableConfig.orderTable;

  return (
    <>
      <Container>
        <Table.Panel title="Order" name={name} />
        <Table<OrderPayload> id={name} columns={columns} />
      </Container>
    </>
  );
};

export default OrderTable;
