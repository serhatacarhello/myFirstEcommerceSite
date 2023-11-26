import { Center, Heading } from "@chakra-ui/react";
import React from "react";

export default function Home() {
  return (
    <Center mt={4}>
      <Heading
        textTransform={"uppercase"}
        fontWeight={"medium"}
        color={"pink.600"}
      >
        Home
      </Heading>
    </Center>
  );
}
