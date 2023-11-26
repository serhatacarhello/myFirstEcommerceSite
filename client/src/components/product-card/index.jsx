import {
  Image,
  Button,
  CardBody,
  Stack,
  Heading,
  Text,
  CardFooter,
  ButtonGroup,
  Card,
  Box,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import moment from "moment";
import { BsCartPlus, BsCartDash } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useBasket } from "../../contexts/BasketContext";
import { Link,  useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Suspense } from "react";
import { Flex } from "antd";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { addToBasket, items } = useBasket();

  const findBasketItem = items.find((item) => item._id === product._id);

  const handleBuyNow = () => {
    if (!findBasketItem) {
      addToBasket(product, findBasketItem);
    }
    navigate("/basket");
  };

  const LoadingSpinner = () => (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="full"
      width={"full"}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );

  return (
    <Stack align={"center"}>
      <Suspense fallback={<LoadingSpinner />}>
        <Card maxW="sm" bgColor={"gray.200"}>
          <Link to={`/product/${product._id}`}>
            <CardBody>
              <Image
                src={
                  product.photos[0]
                    ? product.photos[0]
                    : "https://picsum.photos/id/1/400/400"
                }
                // maxW={{ base: "100%", sm: "200px" }}
                alt={product.name}
                borderRadius="lg"
                loading="lazy"
              />

              <Stack mt="6" spacing="1" alignItems={"center"}>
                <Text color="orange.400" fontSize="2xl">
                  {moment(product.createdAt).format("DD/MM/YYYY")}
                </Text>
                <Heading color="teal.300" size="md">
                  {product.name}
                </Heading>
                <Text fontSize={"lg"}>#{product.department}</Text>
                <Text color="blue.600" fontSize="2xl">
                  ${product.price}
                  <Box as="span" color="teal.600" fontSize="sm">
                    / unit
                  </Box>
                </Text>
              </Stack>
            </CardBody>
          </Link>

          {/* <Divider /> */}
          <CardFooter
            display={"flex"}
            justify={"center"}
            marginTop={"-1"}
            paddingTop={"0.5"}
          >
            <ButtonGroup spacing="2">
              <Button
                variant="solid"
                colorScheme="pink"
                transition={"ease"}
                onClick={handleBuyNow}
              >
                <Box _hover={{ mr: 2 }}>Buy now</Box>
                <ArrowForwardIcon ms={2} />
              </Button>
              <Tooltip
                label={findBasketItem ? "Remove" : "Add"}
                fontSize="md"
                bg="teal.300"
                color="black"
                borderRadius={5}
                hasArrow
                placement="end"
              >
                <Button
                  variant="solid"
                  colorScheme={findBasketItem ? "red" : "green"}
                  onClick={() => addToBasket(product, findBasketItem)}
                >
                  <IconContext.Provider
                    value={{
                      color: "white",
                      style: {
                        verticalAlign: "middle",
                        fontWeight: "bolder",
                      },
                    }}
                  >
                    {!findBasketItem ? (
                      <div>
                        <BsCartPlus fontSize={"3vh"} />
                      </div>
                    ) : (
                      <div>
                        <BsCartDash fontSize={"3vh"} />
                      </div>
                    )}
                  </IconContext.Provider>
                </Button>
              </Tooltip>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Suspense>
    </Stack>
  );
}

export default ProductCard;
