import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetail, updateProduct } from "../../../utils/api";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Formik, FieldArray } from "formik";
import editSchema from "./validations";
import FileBase64 from "react-file-base64";
import { message } from "antd";

export default function AdminProductsDetail() {
  const navigate = useNavigate();
  const { product_id } = useParams();

  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProductDetail(product_id)
  );

  if (isLoading) {
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
  if (isError) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Error
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          {error.message || `An error has occurred.`}
        </AlertDescription>
      </Alert>
    );
  }

  const handleSubmit = async (values, bag) => {
    console.log("submitted");
    const errors = await bag.validateForm();
    bag.setSubmitting(true);
    message.loading({
      content: "Loading",
      key: "product_update",
    });
    if (Object.keys(errors).length === 0) {
      try {
        await updateProduct(values, product_id);

        message.success({
          content: "The product has successfully updated",
          key: "product_update",
          duration: 2,
        });
      } catch (error) {
        message.error({
          content: "The product has not updated",
          key: "product_update",
        });
        console.log(error);
      }
    }
    bag.setSubmitting(false);

    bag.resetForm();
    navigate(-1);
  };
  return (
    <div>
      <Box align={"center"} my={3}>
        <Heading
          textTransform={"uppercase"}
          fontWeight={"medium"}
          color={"pink.600"}
        >
          Edit
        </Heading>
      </Box>

      <Formik
        initialValues={{
          name: data.name,
          department: data.department,
          photos: data.photos,
          price: data.price,
          description: data.description,
        }}
        validationSchema={editSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          isSubmitting,
          values,
          errors,
          touched,
        }) => (
          <>
            <Box>
              <Box my={5} textAlign={"left"}>
                <form onSubmit={handleSubmit}>
                  <FormControl mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      value={values.name}
                      isInvalid={touched.name && errors.name}
                    />
                    {touched.name && errors.name && (
                      <Text color="red">{errors.name}</Text>
                    )}
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Department</FormLabel>
                    <Input
                      name="department"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      value={values.department}
                      isInvalid={touched.department && errors.department}
                    />
                    {touched.department && errors.department && (
                      <Text color="red">{errors.department}</Text>
                    )}
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      rows={5}
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      value={values.description}
                      isInvalid={touched.description && errors.description}
                    />
                    {touched.description && errors.description && (
                      <Text color="red">{errors.description}</Text>
                    )}
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Price</FormLabel>
                    <Input
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      value={values.price}
                      isInvalid={touched.price && errors.price}
                    />
                    {touched.price && errors.price && (
                      <Text color="red">{errors.price}</Text>
                    )}
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Photos</FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <Flex
                          flexDirection="column"
                          alignItems={"center"}
                          justifyContent={"start"}
                        >
                          {values.photos &&
                            values.photos.length > 0 &&
                            values.photos.map((photo, index) => (
                              <Flex
                                key={index}
                                alignItems="center"
                                width={"full"}
                                my={3}
                              >
                                <Input
                                  maxWidth={"3xl"}
                                  name={`photos.${index}`}
                                  value={photo}
                                  disabled={isSubmitting}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />

                                <Button
                                  ml={4}
                                  type="button"
                                  colorScheme="red"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </Flex>
                            ))}
                          <Flex align={"center"}>
                            {/* upload image */}
                            <Box my={3}>
                              <FileBase64
                                multiple={false}
                                onDone={({ base64, file }) => {
                                  // Check the file type

                                  if (
                                    !file.type.startsWith("image/jpeg") &&
                                    !file.type.startsWith("image/png") &&
                                    !file.type.startsWith("image/svg+xml")
                                  ) {
                                    alert(
                                      "Please select an JPG, PNG or SVG image file."
                                    );
                                    return;
                                  }
                                  // Check the file size (e.g., 5MB limit)
                                  const maxSize = 5 * 1024 * 1024; // 5MB
                                  if (file.size > maxSize) {
                                    alert(
                                      "File size cannot exceed 5MB. Please choose a smaller file."
                                    );
                                    return;
                                  }
                                  // After passing the checks, you can add the base64 data to the array
                                  arrayHelpers.push(base64);
                                }}
                              />
                            </Box>

                            <Button
                              ml={3}
                              type="button"
                              colorScheme="teal"
                              variant={"outline"}
                              onClick={() => arrayHelpers.push("")}
                              maxWidth={"3xl"}
                            >
                              Add a photo url
                            </Button>
                          </Flex>
                        </Flex>
                      )}
                    />
                  </FormControl>

                  <div>
                    <Button
                      mt={4}
                      width={"full"}
                      type="submit"
                      colorScheme="pink"
                      isLoading={isSubmitting}
                    >
                      Update
                    </Button>
                  </div>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}
