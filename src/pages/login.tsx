import React from "react";
import { Form, Formik } from "formik";
import {
  Box,
  Button,
} from "@chakra-ui/react";
import { Wapper } from "../components/wrapper";
import { InputField } from "../components/input-field";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from 'next-urql';


const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation()
  return (
    <Wapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (value, {setErrors}) => {
         const response = await login(value);
         if(response.data?.login.errors) {
          setErrors(toErrorMap(response.data.login.errors))
         } else if(response.data?.login.user) {
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
              isLoading={isSubmitting}>Login</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wapper>
  );
};

export default  withUrqlClient(createUrqlClient)(Login);
