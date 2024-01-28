import Container from "@/components/Container";
import Table from "@/components/Table";
import { OrderModel } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";

const OrderScreen = () => {
  const { name, columns } = tableConfig.orderTable;

  return (
    <div className="px-[24px]">
      <Container>
        <Table.Panel title="Order" name={name} />
        <Table<OrderModel> id={name} columns={columns} />
      </Container>
    </div>
  );
};

export default OrderScreen;
