import Container from "@/components/Container";
import Table from "@/components/Table";
import { ServiceScheduleModel } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";

const ServiceSchedule = () => {
  const { name, columns } = tableConfig.serviceSchedule;

  return (
    <div className="px-[24px]">
      <Container>
        <Table.Panel title="Service" name={name} />
        <Table<ServiceScheduleModel> id={name} columns={columns} />
      </Container>
    </div>
  );
};

export default ServiceSchedule;
