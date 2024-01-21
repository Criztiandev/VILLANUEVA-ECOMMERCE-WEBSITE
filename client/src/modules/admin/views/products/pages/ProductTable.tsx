/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Container from "@/components/Container";
import ProductItems from "../components/ProductItems";
import { useQuery } from "@tanstack/react-query";
import productApi from "../product.api";
import { CategoryModel, ProductModel } from "@/interface/model";
import LoadingScreen from "@/containers/LoadingScreen";
import categoriesApi from "../../categories/categories.api";
import Table from "@/components/Table";
import tableConfig from "@/modules/admin/config/table.config";
import GridViewAction from "../components/GridViewAction";
import useGridView from "@/hooks/useGridView";
import Button from "@/components/Button";

interface Props {
  name: string;
  columns: any;
  onToggleTable: () => void;
}

interface GridProps {
  render: any;
}

const ProductTable = () => {
  const {
    isTable,
    filter,
    categoryFilter,
    handleFilter,
    handleCategoryFilter,
    handleIsTable,
  } = useGridView();
  const { name, columns } = tableConfig.productTable;

  const productQuery = useQuery({
    queryFn: async () => productApi.fetchAll(),
    queryKey: ["products"],
  });

  const categoryQuery = useQuery({
    queryFn: async () => categoriesApi.fetchAll(),
    queryKey: ["category"],
  });

  const renderProducts = () => {
    if (!productQuery?.data) return;

    return productQuery?.data?.payload?.filter((field: ProductModel) => {
      if (categoryFilter) {
        return field.category
          .toLocaleLowerCase()
          .includes(categoryFilter.toLowerCase());
      }

      return field.name
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase());
    });
  };

  if (productQuery?.isLoading || categoryQuery?.isLoading)
    return <LoadingScreen />;

  return (
    <Container className="mt-4  ">
      {!isTable && (
        <GridViewAction<CategoryModel>
          payload={categoryQuery.data?.payload}
          filter={filter}
          categoryFilter={categoryFilter}
          onFilter={handleFilter}
          onCategoryFilter={handleCategoryFilter}
          toggleTable={handleIsTable}
        />
      )}
      {isTable ? (
        <CurrentTable
          name={name}
          columns={columns}
          onToggleTable={handleIsTable}
        />
      ) : (
        <GridView render={renderProducts} />
      )}
    </Container>
  );
};

const CurrentTable = ({ name, columns, onToggleTable }: Props) => {
  return (
    <Container>
      <Table.Panel title="Products" name={name}>
        <Button title="T" className="btn-circle" onClick={onToggleTable} />
      </Table.Panel>
      <Table<ProductModel> id={name} columns={columns} />
    </Container>
  );
};

const GridView = ({ render }: GridProps) => {
  return (
    <div className="" style={{ height: "calc(100vh - 280px)" }}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  ">
        {render()?.map((fields: ProductModel) => (
          <ProductItems key={fields?._id} {...fields} />
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
