import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchProductDetail } from "../../utils/api";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const { items, addToBasket } = useBasket();

  const { isLoading, error, data } = useQuery(["product", product_id], () =>
    fetchProductDetail(product_id)
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const images = data.photos.map((url) => url);
  const findBasketItem = items.find((item) => item._id === product_id);

  const handleBuyNow = (data, product) => {
    if (!findBasketItem) {
      addToBasket(data, product);
    }
    navigate("/basket");
  };

  return (
    <Box
      width="full"
      height="full"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading size="lg" marginBottom="1rem">
        {data.department} / <span>{data.name}</span>
      </Heading>
      <Splide
        options={{
          rewind: true,
          width: "100%",
          type: "loop",
          perPage: 1,
          pagination: false,
          autoplay: true,
        }}
        aria-label="My Favorite Images"
      >
        {images.map((url, key) => (
          <SplideSlide key={key}>
            <img
              style={{ width: "100%", borderRadius: "5px" }}
              src={url}
              alt=""
            />
          </SplideSlide>
        ))}
      </Splide>
      <Stack mt="6" spacing="3">
        <Text color="orange.400" fontSize="2xl">
          {moment(data.createdAt).format("DD/MM/YYYY")}
        </Text>
        <Text fontSize="1.5rem" color="blackAlpha.800">
          {data.description}
        </Text>
      </Stack>
      <Box mb={3} display="flex" justify="center">
        <ButtonGroup spacing="2">
          <Button
            size="lg"
            variant="solid"
            colorScheme="pink"
            onClick={() => handleBuyNow(data, findBasketItem)}
          >
            Buy now
          </Button>
          <Button
            size="lg"
            variant="outline"
            colorScheme={!findBasketItem ? "green" : "red"}
            // it adds product to basket if its not in basket
            onClick={() => addToBasket(data, findBasketItem)}
          >
            {findBasketItem ? "Remove from basket" : "Add to cart"}
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default ProductDetail;
