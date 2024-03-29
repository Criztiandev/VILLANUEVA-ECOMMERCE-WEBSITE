import Container from "@/components/Container";
import Table from "@/components/Table";
import { OrderPayload } from "@/interface/model";
import tableConfig from "../config/table.config";
import Button from "@/components/Button";
import { Link } from "react-router-dom";

const OrderScreen = () => {
  const { name, columns } = tableConfig.orderTable;

  return (
    <div className="px-[24px]">
      <Container>
        <Table.Panel title="Order" name={name}>
          <Link to={"/order/archive/products"}>
            <Button title="Archive" />
          </Link>
        </Table.Panel>
        <Table<OrderPayload> id={name} columns={columns} />
      </Container>
    </div>
  );
};

export default OrderScreen;
