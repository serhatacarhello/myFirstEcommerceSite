import { Button, Flex, Grid, Spinner } from "@chakra-ui/react";
import ProductCard from "../../components/product-card";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchProductList } from "../../utils/api";

const Products = () => {

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProductList,
    getNextPageParam: (lastPage, pages) => {
      const morePagesExist = lastPage?.length === 12; // number is according to backend *limit value
      if (!morePagesExist) return;
      if (morePagesExist) return pages.length + 1;
    },
  });

  if (status === "loading")
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
  if (status === "error") return "An error has occurred: " + error.message;
  return (
    <Flex
      direction="column"
      justifyContent="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      minH="100vh"
    >
      {data.pages.map((group, i) => (
        <Grid
          key={i}
          w="full"
          gridGap="5"
          gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )"
        >
          {group.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </Grid>
      ))}
      <Flex justifyContent={"center"} m={"1rem"}>
        <Button
          size={"lg"}
          variant={"solid"}
          colorScheme="teal"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          isLoading={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Products;
