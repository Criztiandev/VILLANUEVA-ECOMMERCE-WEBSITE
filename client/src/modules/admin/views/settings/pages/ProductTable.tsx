import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import { ProductModel } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const { base, name, columns } = tableConfig.productTable;

  return (
    <Container>
      <Table>
        {/* Table Header */}
        <Table.Header title="Products" current={`/${base}`}>
          <Container className="flex gap-4">
            <Link to={"create"}>
              <Button title="Create" icon="T" dir="left" />
            </Link>
          </Container>
        </Table.Header>
        <Table.Panel name={name}></Table.Panel>
        <Table.Content<ProductModel> id={name} columns={columns} />
      </Table>
    </Container>
  );
};

export default ProductTable;
