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
import { Formik } from "formik";
import * as authService from "../../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/react-toastify.esm";

export function LoginForm(props) {

  const { switchToSignup } = useContext(AccountContext);

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
        
        ///check for password
        if (!values.password) {
          errors.password = 'Required';
        }
         return errors;
       }}
       onSubmit={ async (values, { setSubmitting }) => {

        try {
          const { data: jwt } = await authService.login(values.email, values.password);
          localStorage.setItem("token", jwt);
          toast.success("User Logedin");
        } catch (ex) {
          console.log(ex.response);
          if (ex.response && ex.response.status === 400) {
            toast.error("Invalid Credintials");
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
            <span className="reginer-form-error">{errors.email && touched.email && errors.email}</span>
            <Input onChange={handleChange} onBlur={handleBlur} value={values.email} name="email" type="email" placeholder="Email" />
            <span className="reginer-form-error">{errors.password && touched.password && errors.password}</span>
            <Input type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="Password" />
            <Marginer direction="vertical" margin={10} />
            <MutedLink href="#">Forget your password?</MutedLink>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit">Signin</SubmitButton>
          </FormContainer>
            <Marginer direction="vertical" margin="5px" />
        </div>
       )}
     </Formik>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Don't have an accoun?{" "}
        <BoldLink onClick={switchToSignup} href="#">
          Signup
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}