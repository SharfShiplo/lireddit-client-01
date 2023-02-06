import React from "react";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Wapper } from "../components/wrapper";
import { InputField } from "../components/input-field";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation()
  return (
    <Wapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (value, {setErrors}) => {
         const response = await register(value);
         if(response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors))
         } else if(response.data?.register.user) {
            // worked
            router.push("/")
         }

        }}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField
              name="username"
              placeholder="Username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <Button type="submit"  colorScheme='teal'
              isLoading={isSubmitting}>Register</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wapper>
  );
};

export default Register;
