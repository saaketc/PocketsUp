import React from "react";
import Form from "../ui/form";
import { toast } from "react-toastify";
import { loginUser, tokenKey } from "../../services/userServices";

const fields = [
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" }
];
const Login = () => {
  const handleSubmit = async (submittedData) => {
    try {
        const { data: token } = await loginUser(submittedData);
        localStorage.setItem(tokenKey, token);
        window.location = '/';
    }
    catch (e) {
        toast.error(e.message);
        
    }
  };
  return (
    <div>
      <Form
        fields={fields}
        label="Login"
        heading="Welcome back Pocketster! It's your day."
        postSubmitLogic={handleSubmit}
        
      />
    </div>
  );
};

export default Login;
