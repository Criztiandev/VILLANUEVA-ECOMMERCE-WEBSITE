import Form from "@/components/Form";
import { LoginData } from "@/interface/auth";
import { loginValidationSchema } from "../validation/auth.validation";
import Field from "@/components/Field";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import queryUtils from "@/utils/query.utils";
import authApi from "../api/auth.api";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/service/store/slice/auth.slice";
import crypto from "crypto-js";

const LoginModal = ({ UID }: { UID: string }) => {
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

  const handleSubmit = async ({ email, password }: LoginData) => {
    const encryptedPwd = crypto.AES.encrypt(
      password,
      import.meta.env.VITE_PASSWORD_SECRET
    ).toString();
    mutation.mutate({ password: encryptedPwd, email });
  };

  return (
    <>
      {!UID && (
        <div className="fixed top-0 w-screen h-screen bg-black/50 z-10 flex justify-center items-center">
          <div className="bg-white rounded-[5px] w-[650px] h-[600px] flex justify-center flex-col gap-4">
            <h1 className="text-[36px] font-semibold text-center">Login</h1>
            <Form<LoginData>
              onSubmit={handleSubmit}
              validation={loginValidationSchema}
              className="px-[64px] flex flex-col gap-2">
              <Field
                type="email"
                title="Email"
                name="email"
                placeholder="Enter your email"
              />
              <div className="my-2">
                <Field
                  type="password"
                  title="Password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-end items-center">
                <Link to="/forgot-password" className="text-[16px]">
                  Forgot Password?
                </Link>
              </div>
              <div className="divider"></div>
              <div className="flex flex-col gap-2">
                <Button title="Login" />
              </div>
              <div className="flex justify-center items-center">
                <span className="text-[16px]">Don't have an account?</span>
                <Link
                  to="/register"
                  className="text-[16px] mx-2 underline text-blue-500">
                  Register
                </Link>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
