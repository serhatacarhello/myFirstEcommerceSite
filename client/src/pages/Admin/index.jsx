import { useState } from "react";
import { Flex, Spacer, Button, Box } from "@chakra-ui/react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Admin() {
  const { user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  if (user && user.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Box bg="gray.800" px={4} py={3}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxW="1200px"
          mx="auto"
        >
          <Flex
            display={{ base: showMenu ? "none" : "flex", md: "flex" }}
            alignItems="center"
            gap={7}
          >
            {["Home", "Products", "Orders"].map((item, i) => (
              <Link
                key={i}
                to={
                  item.toLowerCase() === "home"
                    ? "/admin"
                    : `/admin/${item.toLowerCase()}`
                }
              >
                <Button variant="link" color="white">
                  {item}
                </Button>
                <Spacer />
              </Link>
            ))}
          </Flex>
          <Spacer />
          <Box display={{ base: "block", md: "none" }}>
            <RxHamburgerMenu
              w={6}
              h={6}
              color="white"
              cursor="pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
          </Box>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}
