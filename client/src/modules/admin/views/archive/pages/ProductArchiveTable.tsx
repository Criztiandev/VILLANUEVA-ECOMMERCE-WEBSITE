import Container from "@/components/Container";
import Table from "@/components/Table";
import { OrderPayload } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";

const ProductArchiveTable = () => {
  const { name, columns } = tableConfig.ProductArchiveTable;

  return (
    <>
      <Container>
        <Table.Panel title="Product Order" name={name} />
        <Table<OrderPayload> id={name} columns={columns} />
      </Container>
    </>
  );
};

export default ProductArchiveTable;
