import React from "react";
import Form from "../ui/form";
import { toast } from "react-toastify";
import { registerUser, tokenKey } from "../../services/userServices";

const fields = [
  { label: "Firstname", name: "firstName", type: "text" },
  { label: "Lastname", name: "lastName", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
];
const Signup = () => {
  const handleSubmit = async (submittedData) => {
    try {
      const response = await registerUser(submittedData);
      localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      toast.error(ex.message);
    }
  };
  return (
    <div>
      <Form
        fields={fields}
        label="Signup"
        heading="Join the amazing world of PocketsUp!"
        postSubmitLogic={handleSubmit}
        signup={true}
      />
    </div>
  );
};

export default Signup;
