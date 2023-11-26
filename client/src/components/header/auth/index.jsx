import { Badge, Box, Button, Stack } from "@chakra-ui/react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { IconContext } from "react-icons";
import { BsCartCheck } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useBasket } from "../../../contexts/BasketContext";

const Auth = () => {
  const { loggedIn, user } = useAuth();
  // console.log("🚀 ~ file: index.jsx:8 ~ Auth ~ loggedIn:", loggedIn);
  const { items } = useBasket();
  console.log("🚀 ~ file: index.jsx:14 ~ Auth ~ items:", items);

  return (
    <Box mb={3}>
      {!loggedIn && (
        <Stack
          direction="row"
          spacing={4}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Link to={"/auth/signin"}>
            <Button rightIcon={<FiLogIn />} colorScheme="teal" variant="solid">
              Sing In
            </Button>
          </Link>
          <Link to={"/auth/signup"}>
            <Button colorScheme="pink" variant={"solid"} size={"md"}>
              Sing Up
            </Button>
          </Link>
          {/* basket */}
          {items.length > 0 && (
            <Link
              to={"/basket"}
              state={{
                data: items,
              }}
            >
              <Button variant="solid" colorScheme="red">
                <IconContext.Provider
                  value={{
                    color: "white",
                    style: { verticalAlign: "baseline", fontWeight: "bolder" },
                  }}
                >
                  <Box position={"relative"}>
                    <Badge
                      borderRadius={"20%"}
                      top={"-15px"}
                      ml={1}
                      position={"absolute"}
                      variant={"solid"}
                      colorScheme="cyan"
                      fontSize="1em"
                    >
                      {items.length > 0 ? items.length : 0}
                    </Badge>

                    <BsCartCheck fontSize={"3vh"} />
                  </Box>
                </IconContext.Provider>
              </Button>
            </Link>
          )}
        </Stack>
      )}
      {loggedIn && (
        <Stack direction="row" spacing={4}>
          <Link to={"/profile"}>
            <Button colorScheme="green" variant="solid">
              Profile
            </Button>
          </Link>
          {/* basket */}
          {items.length > 0 && (
            <Link to={"/basket"}>
              <Button variant="solid" colorScheme="red">
                <IconContext.Provider
                  value={{
                    color: "white",
                    style: { verticalAlign: "baseline", fontWeight: "bolder" },
                  }}
                >
                  <Box position={"relative"}>
                    <Badge
                      borderRadius={"20%"}
                      top={"-15px"}
                      ml={1}
                      position={"absolute"}
                      variant={"solid"}
                      colorScheme="cyan"
                      fontSize="1em"
                    >
                      {items.length > 0 ? items.length : 0}
                    </Badge>

                    <BsCartCheck fontSize={"3vh"} />
                  </Box>
                </IconContext.Provider>
              </Button>
            </Link>
          )}
          {/* admin */}
          {user?.role === "admin" && (
            <Link to={"/admin"}>
              <Button variant="outline" colorScheme="red">
                Admin
                <IconContext.Provider
                  value={{
                    color: "blue",
                    style: { verticalAlign: "baseline", fontWeight: "bolder" },
                  }}
                >
                  <MdOutlineAdminPanelSettings fontSize={"4vh"} />
                </IconContext.Provider>
              </Button>
            </Link>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Auth;
