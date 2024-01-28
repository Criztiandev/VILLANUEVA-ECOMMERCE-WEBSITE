import crypto from "crypto-js";
import Field from "@/components/Field";
import Form from "@/components/Form";
import Stack from "@/components/FlexStack";
import { Link, useNavigate } from "react-router-dom";

import queryUtils from "@/utils/query.utils";
import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/service/store/slice/auth.slice";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import { LoginData } from "@/interface/auth";
import Background from "@/assets/images/background.jpg";
import Logo from "@/assets/images/Logo.png";
import authApi from "../../api/auth.api";
import { loginValidationSchema } from "../../validation/auth.validation";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: LoginData) => await authApi.login(payload),
    toast: "Login successfully",
    invalidateKey: ["user"],
    onSuccess: (res) => {
      const { payload } = res.data;

      dispatch(setCredentials(payload));
      navigate("/");
    },
  });

  const onSubmit = async ({ email, password }: LoginData) => {
    const encryptedPwd = crypto.AES.encrypt(
      password,
      import.meta.env.VITE_PASSWORD_SECRET
    ).toString();
    mutation.mutate({ password: encryptedPwd, email });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-[100vh] bg-white">
      <div className="relative flex justify-center items-center flex-col">
        <Link to={"/"}>
          <div className=" flex gap-2  items-center absolute top-0 md:left-0  p-4 text-[22px] font-semibold">
            <img src={Logo} className="w-[100px] h-[100px] object-cover" />
            <span className="capitalize">villanueva gardens</span>
          </div>
        </Link>
        <Heading level={1}>Login</Heading>
        <Text as="span">Lorem ipsum dolor sit amet adipiscing elit.</Text>
        <span className="my-4 mb-8"></span>

        <Form<LoginData>
          validation={loginValidationSchema}
          onSubmit={onSubmit}
          className="flex flex-col w-96 ">
          <Stack dir="col">
            <Field
              type="email"
              title="Email"
              name="email"
              placeholder="Enter your Email"
            />
            <Field
              type="password"
              title="Password"
              name="password"
              placeholder="Enter your Password"
              autoComplete="current-password"
            />
          </Stack>
          <div className="py-4 flex justify-end">
            <Link to={"/forgot-password"}>Forgot Password</Link>
          </div>
          <hr className="border border-black mb-4" />

          <Button title="Login" disabled={mutation.isPending} />
        </Form>
        <span className="my-4">
          Don't have an account?{" "}
          <Link to={"/register"} className="border-b border-black">
            Register
          </Link>
        </span>
      </div>
      <div className="bg-slate-300 relative">
        <div className="bg-[#00000063] w-screen h-screen absolute z-10"></div>
        <img
          src={Background}
          className="object-cover w-screen h-screen"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default LoginScreen;
