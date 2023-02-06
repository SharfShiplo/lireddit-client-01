import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation } from "../generated/graphql";
// import { isServer } from "../utils/isServer";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const [{fetching}, logout] = useLogoutMutation()
    // assume that we have the MeQuery for the logged in user
    // so don't want to run this query in server so we need to
    // specify the ssr false and in the server the window object is undefined
    // our isServer returns false and that's exactly what we want
    // const [{data}] = useMeQuery({
    //   pause: isServer()
    // })

  return (
    <Flex bg="gray" p={4}>
      <Box ml={"auto"}>
          <Link mr={2} as={NextLink} href={"/login"}>Login</Link>
          <Link as={NextLink} href={"/register"}>Register</Link>
          <Button onClick={()=>{ logout()}} variant="button" isLoading={fetching}>Logout</Button>
      </Box>
    </Flex>
  );
};
