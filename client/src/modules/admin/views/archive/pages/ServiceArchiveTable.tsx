import Container from "@/components/Container";
import Table from "@/components/Table";
import { ServiceScheduleModel } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";

const ServiceArchiveTable = () => {
  const { name, columns } = tableConfig.ServiceArchiveTable;

  return (
    <>
      <Container>
        <Table.Panel title="Service Order" name={name} />
        <Table<ServiceScheduleModel> id={name} columns={columns} />
      </Container>
    </>
  );
};

export default ServiceArchiveTable;
