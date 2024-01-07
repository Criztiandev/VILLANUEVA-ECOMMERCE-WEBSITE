import Container from "@/components/Container";
import Table from "@/components/Table";
import { OrderTable } from "../../interface/model";
import orderTable from "../../config/order.table.config";

const OrderScreen = () => {
  const { base, name, columns } = orderTable;

  return (
    <section className="px-[32px] py-8">
      <Container>
        <Table>
          {/* Table Header */}
          <Table.Header title="My Orders" current={`/${base}`}></Table.Header>
          <Table.Panel name={name}>
            <Table.Filter
              title="Category"
              name={name}
              columnTitle="role"
              options={[{ title: "User" }, { title: "Admin" }]}
            />
          </Table.Panel>
          <Table.Content<OrderTable> id={name} columns={columns} />
        </Table>
      </Container>
    </section>
  );
};

export default OrderScreen;
