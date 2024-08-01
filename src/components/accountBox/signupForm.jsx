import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from './accountContext';
import { Formik } from 'formik';
import * as userService from "../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/react-toastify.esm";

export function SignupForm(props) {

  const { switchToSignin } = useContext(AccountContext);
  return (
    <BoxContainer>
        <ToastContainer />
    <Formik
       initialValues={{ username: '', email: '', password: '' ,confirmPassword:''}}
       validate={values => {
         const errors = {};
         ///// check for email
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         ///// check for name
         if (!values.username) {
          errors.username = 'Required';
        }
        ///check for password
        if (!values.password) {
          errors.password = 'Required';
        } else if (
          values.password.length < 5
        ) {
          errors.password = 'Password must be of lenth 5';
        }
        ///// check for name
        if (!values.username) {
         errors.username = 'Required';
       }
       ///check for confirmpassword
       if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
      } else if (
        values.password != values.confirmPassword
      ) {
        errors.confirmPassword = 'Password not matched';
      }
         return errors;
       }}
       onSubmit={ async (values, { setSubmitting }) => {

        try {
          let request = {
            username : values.username,
            email: values.email,
            password: values.password
          }
          const response = await userService.register(request);
          localStorage.setItem("token", response.headers["x-auth-token"]);
          toast.success("User Registered");
        } catch (ex) {
          console.log(ex.response);
          if (ex.response && ex.response.status === 400) {
            toast.error("User Already Registered");
          }
        }
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
        <div>
          <FormContainer onSubmit={handleSubmit}>
            <span className="reginer-form-error">{errors.username && touched.username && errors.username}</span>
            <Input onChange={handleChange} onBlur={handleBlur} type="text" name="username" placeholder="Full name" />
            <span className="reginer-form-error">{errors.email && touched.email && errors.email}</span>
            <Input onChange={handleChange} onBlur={handleBlur} value={values.email} name="email" type="email" placeholder="Email" />
            <span className="reginer-form-error">{errors.password && touched.password && errors.password}</span>
            <Input type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="Password" />
            <span className="reginer-form-error">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</span>
            <Input type="password"name="confirmPassword" onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} placeholder="Confirm password" />
            <Marginer direction="vertical" margin={10} />
            <SubmitButton  type="submit" disabled={isSubmitting}>Signup</SubmitButton>
          </FormContainer>
            <Marginer direction="vertical" margin="5px" />
        </div>
       )}
     </Formik>
      
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} href="#">
          Signin
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}