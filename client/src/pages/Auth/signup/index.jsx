import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  FormHelperText,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import validationSchema from "./validations.js";
import { fetchRegister } from "../../../utils/api.js";

import { useAuth } from "../../../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  // take login func from AuthContext()
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      console.log(values);
      console.log(bag);
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });

        // useAuth context and send data to login func
        login(registerResponse);
        //reset form
        bag.resetForm();
        // redirect to main page after login
        navigate("/profile");
      } catch (err) {
        console.log(err, "err register");
        bag.setErrors({ general: err.response.data.message });
      }
    },
  });

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general} </Alert>
            )}
          </Box>
        </Stack>
        <Box
          minW={{ base: "90%", md: "468px" }}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  type="text"
                  variant={"filled"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />

                {formik.touched.email && formik.errors.email && (
                  <FormHelperText color={"red.400"} my={2}>
                    {formik.errors.email}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    variant={"filled"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  />

                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                {formik.touched.password && formik.errors.password && (
                  <FormHelperText color={"red.400"}>
                    {formik.errors.password}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <FormLabel fontSize={"xl"} htmlFor="passwordConfirm">
                  Confirm Password
                </FormLabel>
                <InputGroup>
                  <Input
                    name="passwordConfirm"
                    type={showConPassword ? "text" : "password"}
                    variant={"filled"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                    isInvalid={
                      formik.touched.passwordConfirm &&
                      formik.errors.passwordConfirm
                    }
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConPassword(
                          (showConPassword) => !showConPassword
                        )
                      }
                    >
                      {showConPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                {formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm && (
                    <FormHelperText color={"red.400"} my={2}>
                      {formik.errors.passwordConfirm}
                    </FormHelperText>
                  )}
              </FormControl>
            </Stack>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Sign up
              </Button>
            </Stack>
          </form>
          <Stack pt={6}>
            <Text align={"center"}>
              Already a user?{" "}
              <Link to={"/auth/signin"} color={"blue.400"}>
                <Badge bg={"cyan.600"} color={"white"}>
                  Login
                </Badge>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
