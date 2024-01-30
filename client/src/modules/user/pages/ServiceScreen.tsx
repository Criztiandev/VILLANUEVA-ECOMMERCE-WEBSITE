import Container from "@/components/Container";
import Table from "@/components/Table";
import { ServiceModel } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";

const ServiceScreen = () => {
  const { name, columns } = tableConfig.serviceTable;

  return (
    <div className="px-[24px]">
      <Container>
        <Table.Panel title="Service" name={name} />
        <Table<ServiceModel> id={name} columns={columns} />
      </Container>
    </div>
  );
};

export default ServiceScreen;
