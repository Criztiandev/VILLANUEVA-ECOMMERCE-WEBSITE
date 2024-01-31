import Container from "@/components/Container";
import Table from "@/components/Table";
import { ServiceScheduleModel } from "@/interface/model";
import tableConfig from "../config/table.config";
import Button from "@/components/Button";

const ServiceScreen = () => {
  const { name, columns } = tableConfig.serviceSchedule;

  return (
    <div className="px-[24px]">
      <Container>
        <Table.Panel title="Service" name={name}>
          <Button title="Archive" />
        </Table.Panel>
        <Table<ServiceScheduleModel> id={name} columns={columns} />
      </Container>
    </div>
  );
};

export default ServiceScreen;
