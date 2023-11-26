import { fetchOrders } from "../../../utils/api";
import { useQuery } from "@tanstack/react-query";
import { FcViewDetails } from "react-icons/fc";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  // Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Orders() {
  const { isLoading, isError, error, data } = useQuery(
    ["admin:orders"],
    fetchOrders
  );
  // console.log("data", data);

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

  return (
    <TableContainer>
      <Center mt={4}>
        <Heading
          textTransform={"uppercase"}
          fontWeight={"medium"}
          color={"pink.600"}
        >
          Orders
        </Heading>
      </Center>
      <Table variant="striped" colorScheme="cyan" size={"lg"}>
        <TableCaption>
          {data.length > 0 ? `All orders have shown` : "There is no order."}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Address</Th>
            <Th isNumeric>Items</Th>
            <Th isNumeric>Price</Th>
            <Th>Order Detail</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              <Td>{item.user.email}</Td>
              <Td>
                {item.address.length > 20
                  ? item.address.substring(0, 20) + " ..."
                  : item.address}
              </Td>
              <Td isNumeric>{item.items.length} </Td>
              <Td isNumeric>
                {item.items
                  .map((item) => Number(item.price))
                  .reduce((acc, price) => acc + price, 0)}
                &nbsp;$
              </Td>
              <Td>
                {/* use url for transfer  data*/}
                <Link to={`/admin/orders/${item._id}`} state={item}>
                  <Button colorScheme="pink" variant={"outline"}>
                    Details <FcViewDetails style={{ marginLeft: "10px" }} />
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
