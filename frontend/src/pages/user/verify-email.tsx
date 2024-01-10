import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ToastContext } from "../../context/toast-context";
import AuthService from "../../services/auth.service";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const { addToast, error } = useContext(ToastContext);
  const [children, setChildren] = useState<JSX.Element>(<>Loading...</>);

  const verifyEmail = async () => {
    if (token === undefined) {
      error("This token is invalid");
      setChildren(<Navigate to="/login" />);
      return;
    }

    try {
      await AuthService.verifyEmail(token);

      addToast({
        title: "Successfully verified your email",
        body: "You may now login",
        color: "success",
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error("An unknown error has occured. Please try again");
      } else {
        error("An unknown error has occured. Please try again");
      }
    } finally {
      setChildren(<Navigate to="/login" />);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return children;
};

export default VerifyEmail;
