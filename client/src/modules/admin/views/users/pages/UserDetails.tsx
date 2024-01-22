/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import Container from "@/components/Container";
import GridStack from "@/components/GridStack";

import { UserModel } from "@/interface/model";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import customerApi from "../user.api";
import LoadingScreen from "@/containers/LoadingScreen";
import FieldDisplay from "@/components/FieldDisplay";
import Modal from "@/components/Modal";
import DeleteModal from "@/containers/DeleteModal";
import queryUtils from "@/utils/query.utils";

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const deletemMutation = queryUtils.mutation({
    mutationFn: async () => customerApi.deleteById(id || ""),
    invalidateKey: [`customer-${id}`],
    toast: "Deleted Successfully",
    onSuccess: () => {
      navigate("/customer");
    },
  });

  const customerQuery = useQuery({
    queryFn: async () => await customerApi.fetchById(id || ""),
    queryKey: [`customer-${id}`],
    enabled: !!id,
  });

  if (customerQuery.isLoading) return <LoadingScreen />;

  const { payload: response } = customerQuery.data as { payload: UserModel };

  const addressPayload = response.address.split(",");

  return (
    <>
      <div className="overflow-hidden">
        <h1 className="mt-8 mb-4 text-[32px] font-bold">User Details</h1>
        <Container className="my-8 mx-auto border-t border-gray-300 py-4">
          <GridStack
            columns={2}
            gap={24}
            className="mb-8 border-b border-gray-200 pb-8">
            <Container>
              <h2 className="text-[18px] font-semibold">Customer Details</h2>
            </Container>

            <Container>
              <GridStack columns={2} gap={16}>
                <FieldDisplay title="First Name" payload={response.firstName} />
                <FieldDisplay
                  title="Middle Name"
                  payload={response.middleName}
                />
                <FieldDisplay title="Last Name" payload={response.lastName} />
              </GridStack>

              <GridStack columns={2} gap={16} className="my-4">
                <FieldDisplay title="Age" payload={response.age} />
                <FieldDisplay title="Birth Date" payload={response.birthDate} />
                <FieldDisplay title="Contact" payload={response.contact} />
                <FieldDisplay title="Gender" payload={response.gender} />
              </GridStack>
            </Container>
          </GridStack>

          <GridStack
            columns={2}
            gap={24}
            className="mb-8 border-b border-gray-200 pb-8">
            <Container className="">
              <h2 className="text-[18px] font-semibold">Customer Address</h2>
            </Container>

            <Container>
              <GridStack columns={2} gap={16}>
                <FieldDisplay title="Street" payload={response.street} />
                <FieldDisplay title="House" payload={response.houseNo} />
                <FieldDisplay title="Building" payload={response.building} />
                <div></div>
                <FieldDisplay title="Region" payload={addressPayload[0]} />
                <FieldDisplay title="Province" payload={addressPayload[1]} />
                <FieldDisplay title="City" payload={addressPayload[2]} />
                <FieldDisplay
                  title="Municipality"
                  payload={addressPayload[3]}
                />
                <FieldDisplay title="Barangay" payload={addressPayload[4]} />
              </GridStack>
              <div className="my-4">
                <FieldDisplay title="Postal" payload={response.postalCode} />
              </div>
            </Container>
          </GridStack>

          <GridStack
            columns={2}
            gap={24}
            className="mb-8 border-b border-gray-200 pb-8">
            <Container className="">
              <h2 className="text-[18px] font-semibold">Customer Account</h2>
            </Container>

            <div className="flex flex-col gap-4">
              <FieldDisplay title="Email" payload={response.email} />
              <Button title="Change Password" />
            </div>
          </GridStack>

          <GridStack columns={2} gap={24}>
            <Container className="">
              <h2 className="text-[18px] font-semibold">Customer Action</h2>
            </Container>

            <Container className="flex flex-col gap-4 mt-4">
              <Link to={`/customer/edit/${id}`} className="w-full">
                <Button title="Edit" className="w-full bg-slate-400" />
              </Link>

              <Modal.Button
                title="Delete"
                target={`delete-${id}`}
                className="btn bg-red-500 text-base text-white"
              />
            </Container>
          </GridStack>
        </Container>
      </div>

      <DeleteModal
        id={`delete-${id}`}
        onSubmit={() => deletemMutation.mutate({})}
      />
    </>
  );
};

export default UserDetails;
