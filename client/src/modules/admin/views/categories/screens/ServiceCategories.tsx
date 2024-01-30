import Container from "@/components/Container";
import Field from "@/components/Field";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { CategoryModel } from "@/interface/model";
import tableConfig from "@/modules/admin/config/table.config";
import categorySchema from "../../../validation/categories.validation";
import Button from "@/components/Button";
import queryUtils from "@/utils/query.utils";
import categoriesApi from "../../../api/serviceCategories.api";

const ServiceCategories = () => {
  const { name, columns } = tableConfig.serviceCategoryTable;

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: CategoryModel) => categoriesApi.create(payload),
    invalidateKey: ["service-category"],
    toast: "Category Created Successfully",
  });

  const handleSubmit = (payload: CategoryModel) => {
    mutation.mutate({ count: 0, ...payload });
  };

  return (
    <>
      <Container className="my-4">
        <Table.Panel title="Service Categories" name={name}>
          <Modal.Button
            target="create-modal"
            title="Create"
            className="btn bg-primary text-white"
          />
        </Table.Panel>
        <Table<CategoryModel> id={name} columns={columns} />
      </Container>

      <Modal id="create-modal">
        <h1 className="text-[24px] font-semibold mb-4">Create Category</h1>
        <Form<CategoryModel>
          onSubmit={handleSubmit}
          validation={categorySchema}>
          <Field title="Name" name="name" />

          <Container className="w-full flex flex-col gap-2 mt-4">
            <Button title="Submit" type="submit" />
            <Modal.Button
              target="create-modal"
              title="Cancel"
              className="btn w-full"
            />
          </Container>
        </Form>
      </Modal>
    </>
  );
};

export default ServiceCategories;
