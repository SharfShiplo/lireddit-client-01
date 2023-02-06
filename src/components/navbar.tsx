import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation } from "../generated/graphql";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const [{fetching}, logout] = useLogoutMutation()

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
