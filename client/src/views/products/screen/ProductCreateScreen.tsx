import Button from "@/components/Button";
import Field from "@/components/Field";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";
import Modal from "@/components/Modal";
import FlexStack from "@/components/FlexStack";
import { User } from "@/interface/user";
import { registerSchema } from "@/service/validation/auth.validation";
import TableHeader from "@/components/Table/parts/TableHeader";
import queryUtils from "@/utils/query.utils";
import usersApi from "@/service/api/users.api";
import tableConfig from "@/config/table.config";
import Container from "@/components/Container";
import { useRef, useState } from "react";
import Select from "@/components/Select";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import Textarea from "@/components/Textarea";

interface Props {
  base: string;
}

const UserCreateForm = ({ base }: Props) => {
  const [selectedImage, setSelectedImage] = useState("");
  const productInputRef = useRef<HTMLInputElement | null>(null);

  const mutation = queryUtils.mutation<User>({
    mutationFn: async (payload) => await usersApi.createUser(payload),
    toast: "Created Successfully",
    invalidateKey: tableConfig.userTable.invalidateKey,
  });

  const toggleSelectImage = () => {
    const fileInput = productInputRef.current;
    console.log(fileInput);
    if (fileInput?.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];

      // Read the selected file as a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      console.log(selectedFile);
    }
  };

  const handleSubmit = (payload: User) => {
    if (payload.profileImg) {
      const profileFile = payload.profileImg[0];

      const formData = new FormData();
      formData.append("profileImg", profileFile);
      for (const [key, value] of Object.entries(payload)) {
        if (key !== "profileImg") {
          formData.append(key, value);
        }
      }

      mutation.mutate(formData as User);
      return;
    }
    mutation.mutate(payload);
  };

  return (
    <section className="px-[32px] py-4 overflow-y-scroll">
      <TableHeader
        title="Create Product"
        current={`/${base}`}
        className="flex justify-between items-center mb-8"
        options={[{ title: "Create", path: `/${base}/create` }]}>
        <Modal.Button title="Import" />
      </TableHeader>

      <Form<User> onSubmit={handleSubmit} validation={registerSchema}>
        <GridStack columns={2} className="mb-8 border-b p-4 border-gray-300">
          <Container className="flex flex-col gap-2">
            <Heading level={2} className="font-bold">
              Product Image
            </Heading>
            <Text className="">haahhaahahh</Text>
          </Container>

          <label className="relative w-full h-[300px] border-2 border-gray-300  rounded-[5px] border-dashed flex justify-center items-center flex-col gap-4">
            <Heading level={2} className="font-semibold">
              Drag and Drop Image here
            </Heading>
            <span>------------------ OR --------------------</span>
            <div className="btn btn-outline text-[18px]">Select File</div>
            {selectedImage && (
              <img
                src={selectedImage}
                className="w-full h-full border absolute object-cover object-center rounded-[5px]"
              />
            )}
            <input
              type="file"
              ref={productInputRef}
              onChange={toggleSelectImage}
              hidden
            />
          </label>

          <Field type="file" name="productImg" hidden />
        </GridStack>

        <GridStack columns={2} className="border-b border-gray-300 mb-4 pb-8">
          <Container className="flex flex-col gap-2">
            <Heading level={2} className="font-bold">
              Details
            </Heading>

            <Text as="p">lorem300</Text>
          </Container>

          <FlexStack dir="col" gap={18} justifyContent="between">
            <Field
              title="User name"
              name="title"
              placeholder="Enter your Username"
              className="border w-full"
            />

            <Field
              title="Price"
              name="price"
              placeholder="Enter your Username"
              className="border w-full"
            />

            <Field
              title="Stocks"
              name="stocks"
              placeholder="Enter your Username"
              className="border w-full"
            />

            <Select
              title="Category"
              name="category"
              placeholder="Select Category"
              option={[
                { title: "All", value: "all" },
                { title: "Trees", value: "trees" },
                { title: "Plants", value: "plants" },
                { title: "Indoor", value: "indoor" },
                { title: "Outdoor", value: "outdoor" },
                { title: "Shrub", value: "shrubs" },
              ]}
            />

            <Textarea title="Description" name="description" />
          </FlexStack>
        </GridStack>

        <GridStack columns={2} className="border-b border-gray-300 mb-4 pb-8">
          <Container className="flex flex-col gap-2">
            <Heading level={2} className="font-bold">
              Variants
            </Heading>

            <Text as="p">lorem300</Text>
          </Container>

          <FlexStack dir="col" gap={18} justifyContent="between">
            <Container className="w-full">
              <Heading level={3} className="font-bold mb-2">
                Variant 1
              </Heading>
              <label className="relative w-full h-[300px] border-2 border-gray-300  rounded-[5px] border-dashed flex justify-center items-center flex-col gap-4">
                <Heading level={2} className="font-semibold">
                  Drag and Drop Image here
                </Heading>
                <span>------------------ OR --------------------</span>
                <div className="btn btn-outline text-[18px]">Select File</div>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    className="w-full h-full border absolute object-cover object-center rounded-[5px]"
                    alt=""
                  />
                )}
                <input
                  type="file"
                  ref={productInputRef}
                  onChange={toggleSelectImage}
                  hidden
                />
              </label>
            </Container>

            <Container className="w-full">
              <Heading level={3} className="font-bold mb-2">
                Variant 2
              </Heading>
              <label className="relative w-full h-[300px] border-2 border-gray-300  rounded-[5px] border-dashed flex justify-center items-center flex-col gap-4">
                <Heading level={2} className="font-semibold">
                  Drag and Drop Image here
                </Heading>
                <span>------------------ OR --------------------</span>
                <div className="btn btn-outline text-[18px]">Select File</div>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    className="w-full h-full border absolute object-cover object-center rounded-[5px]"
                    alt=""
                  />
                )}
                <input
                  type="file"
                  ref={productInputRef}
                  onChange={toggleSelectImage}
                  hidden
                />
              </label>
            </Container>

            <Container className="w-full">
              <Heading level={3} className="font-bold mb-2">
                Variant 3
              </Heading>
              <label className="relative w-full h-[300px] border-2 border-gray-300  rounded-[5px] border-dashed flex justify-center items-center flex-col gap-4">
                <Heading level={2} className="font-semibold">
                  Drag and Drop Image here
                </Heading>
                <span>------------------ OR --------------------</span>
                <div className="btn btn-outline text-[18px]">Select File</div>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    className="w-full h-full border absolute object-cover object-center rounded-[5px]"
                    alt=""
                  />
                )}
                <input
                  type="file"
                  ref={productInputRef}
                  onChange={toggleSelectImage}
                  hidden
                />
              </label>
            </Container>
          </FlexStack>
        </GridStack>

        <GridStack dir="col" columns={2}>
          <Container className="flex flex-col gap-2">
            <Heading level={2} className="font-bold">
              Actions
            </Heading>

            <Text as="p">lorem300</Text>
          </Container>
          <FlexStack>
            <Button title="Create" className="w-full" />
            <Button title="Cancel" className="w-full" type="button" />
          </FlexStack>
        </GridStack>
      </Form>
    </section>
  );
};

export default UserCreateForm;
