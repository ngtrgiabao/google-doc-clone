import { KeyboardEvent, useContext, useState } from "react";
import validator from "validator";
import { TextField } from "../../components/atoms/text-field";
import useWindowSize from "../../hooks/useWindowSize";
import AuthService from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";
import { ToastContext } from "../../context/toast-context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { widthStr, heightStr } = useWindowSize();
  const [email, setEmail] = useState<string>("");
  const [emailErrors, setEmailErrors] = useState<Array<string>>([]);
  const [password, setPassword] = useState<string>("");
  const [passwordErrors, setPasswordErrors] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { success, error } = useContext(ToastContext);
  const navigate = useNavigate();

  const validate = () => {
    setEmailErrors([]);
    setPasswordErrors([]);
    let isValid = true;

    if (!validator.isEmail(email)) {
      setEmailErrors(["Must enter a valid email"]);
      isValid = false;
    }

    if (!password.length) {
      setPasswordErrors(["Must enter a password"]);
      isValid = false;
    }

    return isValid;
  };

  const loginUser = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await AuthService.login({ email, password });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;

      login(newAccessToken, newRefreshToken);
      success("Successfully logged in");
      navigate("/");
    } catch (err) {
      error("Incorrect username or password. Please check again");
    } finally {
      setLoading(false);
    }
  };

  const handleOnKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if(event.key === "Enter") loginUser();
  }

  const handleOnInputEmail = (value: string) => {
    setEmailErrors([]);
    setEmail(value);
  };

  const handleOnInputPassword = (value: string) => {
    setPasswordErrors([]);
    setPassword(value);
  };

  return (
    <div
      onKeyDown={handleOnKeyPress}
      className="w-full flex flex-col sm:justify-center items-center pt-52 sm:pb-96 bg-gray-100 dark:bg-slate-900 text-primary"
      style={{
        width: widthStr,
        height: heightStr,
      }}
    >
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded border-primary shadow-md border dark:border-0 dark:shadow-xl p-6">
        <div className="flex flex-col space-y-4">
          <div className="w-full text-center flex flex-col justify-center items-center">
            <h1>Logo</h1>
            <h1 className="font-medium text-2xl">Sign in</h1>
            <p className="font-medium">to continue to Docs</p>
          </div>
          <TextField
            value={email}
            onInput={handleOnInputEmail}
            label="Email"
            color="secondary"
            errors={emailErrors}
          />
          <TextField
            value={password}
            onInput={handleOnInputPassword}
            label="Password"
            color="secondary"
            type="password"
            errors={passwordErrors}
          />
          <button
            tabIndex={-1}
            className="text-xs hover:underline font-semibold text-blue-500 text-left"
          >
            Forgot Password ?
          </button>
          <div className="text-xs flex">
            Need an account ?
            <Link to="/register" className="ml-1 hover:underline font-semibold text-blue-500 text-left cursor-pointer">
              Register now
            </Link>
          </div>
          <button
            onClick={loginUser}
            disabled={loading}
            className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded hover:bg-blue-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            <span className="">Login</span>
          </button>
        </div>
      </div>
      <div className="flex justify-center space-x-4 text-xs p-4">
        <button className="hover:underline font-semibold text-blue-500">
          Terms
        </button>
        <button className="hover:underline font-semibold text-blue-500">
          Privacy Policy
        </button>
      </div>
    </div>
  );
};

export default Login;
