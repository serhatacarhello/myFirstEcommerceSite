import React, { useEffect, useState } from "react";
import { useBasket } from "../../contexts/BasketContext";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
  AlertDescription,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { postOrder } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
export default function Basket() {
  const { loggedIn, user } = useAuth();

  const { items, removeFromBasket, emptyBasket } = useBasket();
  //total price
  const total = items.reduce((acc, item) => acc + item.price, 0);
  //modal settings
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const [textAddress, setTextAddress] = useState("");
  const [showAddressError, setShowAddressError] = useState(false);

  const checkAddress = () => {
    if (textAddress === "") {
      setShowAddressError(true); // Show the address error
      return;
    } else {
      setShowAddressError(false);
    }
  };
  useEffect(() => {
    setShowAddressError(false);
  }, [textAddress]);

  //navigate
  const navigate = useNavigate();

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);

    checkAddress();

    // send items as how backend wants
    const input = {
      address: textAddress,
      items: JSON.stringify(itemIds),
    };

    await postOrder(input);
    emptyBasket();
    onClose();
    navigate("/");
  };

  const handleOrderButtonClick = () => {
    if (loggedIn === false) {
      return alert("Please sign in.");
    }

    if (user && user.role === "user") {
      onOpen();
    } else {
      return alert("User role must be user.");
    }
  };

  return (
    <>
      {items.length < 1 && (
        <Alert
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            You have not any items in your basket.
          </AlertTitle>
          {/* <AlertDescription maxWidth="sm">
            Thanks for submitting your application. Our team will get back to
            you soon.
          </AlertDescription> */}
        </Alert>
      )}

      <>
        {items.length > 0 && (
          <React.Fragment>
            <Stack align={"center"} p={"3"}>
              <Heading
                color="black.600"
                fontSize="3xl"
                textTransform={"uppercase"}
              >
                Products in your basket
              </Heading>
            </Stack>
            <SimpleGrid
              spacing={5}
              templateRows={`repeat(${items.length}, minmax(300px, 1fr))`}
              width={"75%"}
            >
              {items.map((item) => (
                <Link key={item._id} to={`/product/${item._id}`}>
                  <Card
                    key={item._id}
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    backgroundColor={"gray.200"}
                    variant="solid"
                    gap={1}
                  >
                    <Image
                      objectFit="cover"
                      maxW={{ base: "100%", sm: "300px" }}
                      src={item.photos[0]}
                      alt="Basket Item"
                      loading="lazy"
                    />

                    <Stack>
                      <CardBody>
                        <Heading size="lg">{item.name}</Heading>
                        <Text color="blue.600" fontSize="2xl">
                          ${item.price}
                        </Text>
                      </CardBody>

                      <CardFooter>
                        <Button
                          variant="outline"
                          colorScheme="red"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFromBasket(item._id);
                          }}
                        >
                          Remove
                        </Button>
                      </CardFooter>
                    </Stack>
                  </Card>
                </Link>
              ))}
            </SimpleGrid>
          </React.Fragment>
        )}

        {/* total section */}

        {items.length > 0 && (
          <Stack
            align={"center"}
            flexDir={"row"}
            // justifyContent={"end"}
            alignItems={"baseline"}
            py={2}
            px={3}
            pt={4}
            mb={"40px"}
            bg={"cyan.100"}
            width={"75%"}
            borderRadius={"5px"}
          >
            <Heading color="black.600" fontSize="3xl">
              Total :
            </Heading>

            <Text color="green.600" fontSize="3xl">
              {total}
            </Text>
            <Text color="gray.500" fontSize="2xl" fontWeight={"bold"}>
              $
            </Text>
            <Spacer />
            <Button
              mx={6}
              size={"lg"}
              variant={"solid"}
              colorScheme="pink"
              onClick={handleOrderButtonClick}
            >
              Order
            </Button>

            {/* address modal */}

            <Modal
              initialFocusRef={initialRef}
              isOpen={isOpen}
              onClose={onClose}
              bg="none"
              backdropFilter="auto"
              backdropInvert="80%"
              backdropBlur="2px"
              // bg="blackAlpha.300"
              // backdropFilter="blur(10px) hue-rotate(90deg)"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Order</ModalHeader>

                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Textarea
                      ref={initialRef}
                      placeholder="Address"
                      onChange={(e) => setTextAddress(e.target.value)}
                    />
                    {/* Display the address error alert */}
                    {showAddressError && (
                      <Alert status="error">
                        <AlertIcon />
                        <AlertDescription>
                          Please enter a valid address.
                        </AlertDescription>
                      </Alert>
                    )}
                  </FormControl>
                </ModalBody>

                <ModalFooter gap={2}>
                  <Button
                    colorScheme="red"
                    variant={"outline"}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="blue" onClick={handleSubmitForm}>
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Stack>
        )}
      </>
    </>
  );
}
