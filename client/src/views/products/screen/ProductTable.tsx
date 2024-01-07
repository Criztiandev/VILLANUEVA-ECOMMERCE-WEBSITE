/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "@/components/Table";
import FlexStack from "@/components/FlexStack";
import Modal from "@/components/Modal";
import tableConfig from "@/config/table.config";
import { useNavigate } from "react-router-dom";
import ImportModal from "@/containers/Modals/ImportModal";
import BatchDeleteModal from "@/containers/Modals/BatchDeleteModal";
import productApi from "@/service/api/product.api";
import { ProductSchema } from "@/interface/product";

const ProductTable = () => {
  const { base, name, columns, invalidateKey } = tableConfig.productTable;
  const navigate = useNavigate();

  const modalName = `import-${base}-modal`;

  return (
    <section className="px-[32px] py-4">
      <Table>
        {/* Table Header */}
        <Table.Header
          title="Products"
          current={`/${tableConfig.productTable.base}`}>
          <FlexStack dir="row">
            <Modal.Button title="Create" onClick={() => navigate(`create`)} />
          </FlexStack>
        </Table.Header>
        <Table.Panel name={name}>
          <Table.Filter
            title="Category"
            name={name}
            columnTitle="category"
            options={[
              { title: "All" },
              { title: "Trees" },
              { title: "Plants" },
              { title: "Indoor" },
              { title: "Outdoor" },
              { title: "Shrubs" },
            ]}
          />
          <Table.Filter
            title="Status"
            name={name}
            columnTitle="status"
            options={[
              { title: "All" },
              { title: "Active" },
              { title: "Inactive" },
            ]}
          />

          <Table.MoreOption name={name} />
        </Table.Panel>
        <Table.Content<ProductSchema> id={name} columns={columns} />
      </Table>

      <ImportModal id={modalName} />
      <BatchDeleteModal
        tableName={name}
        api={productApi.deleteByBatch}
        invalidateKey={invalidateKey}
      />
    </section>
  );
};

export default ProductTable;
