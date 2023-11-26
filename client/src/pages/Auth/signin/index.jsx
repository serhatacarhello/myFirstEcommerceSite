import { useFormik } from "formik";
import validationSchema from "./validations.js";

import { useAuth } from "../../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../../utils/api.js";

import { useState } from "react";
import {
  Alert,
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SingIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });

        // useAuth context and send data to login func
        login(loginResponse);
        //reset form
        bag.resetForm();
        // redirect to main page after login
        navigate("/profile");

        // console.log("loginResponse", loginResponse);
      } catch (err) {
        // console.log(err, "err register");
        bag.setErrors({ general: err.response.data.message });
      }
    },
  });

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box my={5}>
          {formik.errors.general && (
            <Alert status="error">{formik.errors.general} </Alert>
          )}
        </Box>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name="email"
                    type="text"
                    variant={"filled"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    isInvalid={formik.touched.email && formik.errors.email}
                  />
                </InputGroup>
                <FormHelperText>
                  <Box my={2}>
                    {formik.touched.email && formik.errors.email && (
                      <Alert status="error">
                        <span>{formik.errors.email}</span>
                      </Alert>
                    )}
                  </Box>
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    variant={"filled"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  />

                  <InputRightElement width="4.5rem">
                    <Button
                      variant={"ghost"}
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormHelperText textAlign="right">
                  <Box my={2}>
                    {formik.touched.password && formik.errors.password && (
                      <Alert status="error">
                        <span>{formik.errors.password}</span>
                      </Alert>
                    )}
                  </Box>
                  {/* <Link>forgot password?</Link> */}
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" to="/auth/signup">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default SingIn;
