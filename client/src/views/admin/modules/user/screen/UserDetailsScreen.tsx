/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Field from "@/components/Field";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";
import FlexStack from "@/components/FlexStack";
import TableHeader from "@/components/Table/parts/TableHeader";
import Select from "@/components/Select";
import usersApi from "@/service/api/users.api";
import { useLocation } from "react-router-dom";
import { ToastContent, toast } from "react-toastify";
import { PreferedUserDetailsSchema } from "@/service/validation/user.validation";
import Avatar from "@/components/Avatar";
import { useQuery } from "@tanstack/react-query";
import fileApi from "@/service/api/file.api";
import Container from "@/components/Container";
import LoadingScreen from "@/views/utils/LoadingScreen";
import queryUtils from "@/utils/query.utils";

interface PreferedUserDetails {
  profileImg?: any;
  userName: string;
  email: string;
  role: "user" | "admin";
}

const UserDetailsScreen = () => {
  const location = useLocation();
  const UID: string = location.pathname.split("/").pop() || "";

  const query = useQuery({
    queryFn: async () => await usersApi.fetchUserById(UID),
    queryKey: [`user-${UID}`],
  });

  const imageQuery = useQuery({
    queryFn: async () =>
      await fileApi.fetchImage(`/profile/${query?.data?.payload?.profileImg}`),
    queryKey: [`user-${UID}-img`],
    enabled: !!query?.data?.payload?.profileImg,
  });

  const mutation = queryUtils.mutation({
    mutationFn: async ({ UID, payload }: { UID: string; payload: any }) =>
      usersApi.updateUserById(UID, payload),
    invalidateKey: [`user-${UID}`],
    toast: "Updated Successfull",

    onSuccess: () => {
      query.refetch();

      setTimeout(() => {
        imageQuery.refetch();
      }, 300);
    },
  });

  if (query.isLoading) return <LoadingScreen />;

  if (query.isError) {
    const errorToastContent: ToastContent<Error> = `Error: ${query.error.message}`;
    toast.error(errorToastContent);
    return <LoadingScreen />;
  }

  const { payload: res } = query.data || {};
  const base = "users";

  const handleSubmit = (payload: PreferedUserDetails) => {
    if (payload?.profileImg) {
      const formData = new FormData();
      const imageFile = payload.profileImg[0];

      formData.append("profileImg", imageFile);
      for (const [key, value] of Object.entries(payload)) {
        if (key !== "profileImg") {
          formData.append(key, value);
        }
      }

      mutation.mutate({ UID: UID, payload: formData });
      return;
    }
  };

  return (
    <section className="overflow-y-scroll">
      <div className="w-full mx-auto p-8 ">
        <TableHeader
          title="Details"
          current={`/${base}`}
          options={[
            { title: "Details", path: `/${base}/${UID}` },
          ]}></TableHeader>

        <Form<PreferedUserDetails>
          onSubmit={handleSubmit}
          validation={PreferedUserDetailsSchema}>
          <GridStack columns={2} className="border-b pb-8 ">
            <Container>
              <h2 className="text-xl font-semibold">Profile</h2>
            </Container>

            <Container>
              <Container className="w-full">
                {imageQuery.isLoading ? (
                  <div className="skeleton w-32 h-32 rounded-full shrink-0"></div>
                ) : (
                  <Avatar
                    src={imageQuery.data as string}
                    alt="profile"
                    size="lg"
                  />
                )}
              </Container>
            </Container>
          </GridStack>
          <GridStack columns={2} className="border-b border-gray-400 my-8 pb-8">
            <Container>
              <h2 className="text-xl font-semibold">Details</h2>
            </Container>

            <FlexStack className="py-4">
              <Field
                title="User name"
                name="userName"
                placeholder="Enter your Username"
                className="border w-full"
                default={res?.userName}
              />
              <Field
                type="email"
                title="Email"
                name="email"
                placeholder="Enter your email"
                default={res?.email}
              />
              <Select
                title="Role"
                name="role"
                placeholder="Select Role"
                default={res?.role}
                option={[
                  { title: "User", value: "user" },
                  { title: "Admin", value: "admin" },
                ]}
              />
            </FlexStack>
          </GridStack>
        </Form>
      </div>
    </section>
  );
};

export default UserDetailsScreen;
