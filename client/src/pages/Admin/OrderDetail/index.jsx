import { useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Heading,
  Text,
  Button,
  Stack,
  Image,
  Box,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";

export default function OrderDetail() {
  const location = useLocation();
  const order = location.state;
  // console.log("order", order);

  const defaultPostStatus =
    JSON.parse(localStorage.getItem(`isPost_${order._id}`)) || false;

  const [isPost, setIsPost] = useState(defaultPostStatus);

  const togglePost = (id) => {
    const newIsPost = !isPost;
    setIsPost(newIsPost);
    localStorage.setItem(`isPost_${id}`, JSON.stringify(newIsPost));
  };

  return (
    <>
      <Card my={3}>
        <CardHeader>
          <Heading size="md">Order Detail</Heading>
        </CardHeader>
        <CardBody>
          <Stack
            direction={["column", "row"]}
            justifyContent={"space-between"}
            // spacing="24px"
          >
            <Box>
              <Heading size="xs" textTransform="uppercase">
                User
              </Heading>
              <Text pt="2" fontSize="sm">
                {order?.user.email}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Order Date
              </Heading>
              <Text pt="2" fontSize="sm">
                {moment(order?.createdAt).format("DD/MM/YYYY")}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Address
              </Heading>
              <Text pt="2" fontSize="sm">
                {order?.address}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" textTransform="uppercase">
                Post Status
              </Heading>
              <Button
                variant="outline"
                colorScheme="green"
                onClick={() => togglePost(order._id)}
              >
                {isPost ? "Posted" : "Not Posted"}
              </Button>
            </Box>
          </Stack>
        </CardBody>
      </Card>

      <SimpleGrid
        spacing={4}
        gridTemplateRows="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {order?.items.map((item, i) => (
          <Card
            key={i}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={item.photos[0]}
              alt={item.name}
            />

            <Stack>
              <CardBody>
                <Heading size="md">{item.name}</Heading>
                <Text>{item.description}</Text>
                <Text color="blue.600" fontSize="2xl">
                  ${item.price}
                </Text>
              </CardBody>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
