import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Formik, FieldArray } from "formik";
import newProductSchema from "./validations";
import { message } from "antd";
import { postProduct } from "../../../utils/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import FileBase64 from "react-file-base64";
export default function NewProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const newProductMutation = useMutation({
    mutationFn: postProduct,
    onSuccess: () => queryClient.invalidateQueries(["admin:products"]),
  });

  const handleSubmit = async (values, bag) => {
    console.log("submitted", values);
    message.loading({
      content: "Loading",
      key: "product_save",
    });

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };

    try {
      newProductMutation.mutate(newValues, {
        onSuccess: console.log("success"),
      });

      message.success({
        content: "The product has successfully saved",
        key: "product_save",
        duration: 2,
      });
    } catch (error) {
      message.error({
        content: "The product has not updated",
        key: "product_save",
      });
      console.log(error);
    }
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
          New Product
        </Heading>
      </Box>

      <Formik
        initialValues={{
          name: "",
          department: "",
          photos: [],
          price: "",
          description: "",
        }}
        validationSchema={newProductSchema}
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
                      Save
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
