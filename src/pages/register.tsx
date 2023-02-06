import {
  Box,
  Button
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from 'next-urql';
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/input-field";
import { Wapper } from "../components/wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";



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

export default withUrqlClient(createUrqlClient)(Register);
