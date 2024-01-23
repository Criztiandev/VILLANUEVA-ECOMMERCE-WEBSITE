/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Container from "@/components/Container";
import ProductItems from "../components/ProductItems";
import { useQuery } from "@tanstack/react-query";
import serviceApi from "../service.api";
import { CategoryModel, ProductModel } from "@/interface/model";
import LoadingScreen from "@/containers/LoadingScreen";
import categoriesApi from "../../categories/categories.api";
import Table from "@/components/Table";
import tableConfig from "@/modules/admin/config/table.config";
import GridViewAction from "../components/GridViewAction";
import useGridView from "@/hooks/useGridView";
import Button from "@/components/Button";
import GridIcon from "@/assets/icons/grid_light_icon.svg";

interface Props {
  name: string;
  columns: any;
}

interface GridProps {
  render: any;
}

const ServiceTable = () => {
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
    queryFn: async () => serviceApi.fetchAll(),
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
          path="create"
        />
      )}
      {isTable ? (
        <CurrentTable name={name} columns={columns} />
      ) : (
        <GridView render={renderProducts} />
      )}
    </Container>
  );
};

const CurrentTable = ({ name, columns }: Props) => {
  return (
    <Container>
      <Table.Panel title="Service" name={name}>
        <Button className="btn" icon={GridIcon} dir="left" />
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

export default ServiceTable;
