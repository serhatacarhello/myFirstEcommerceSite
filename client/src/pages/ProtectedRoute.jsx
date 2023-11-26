import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Flex, Spinner } from "@chakra-ui/react";

const ProtectedRoute = ({ admin = false }) => {
  const { loggedIn } = useAuth();

  if (loggedIn === null) {
    return (
      <Flex align={"center"} justify={"center"} h={"100vh"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          size={"xl"}
          color="red"
        />
      </Flex>
    );
  }

  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
