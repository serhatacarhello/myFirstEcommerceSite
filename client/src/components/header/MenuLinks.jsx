import { Box, Stack } from "@chakra-ui/react";
import MenuItem from "./MenuItem";
import Auth from "./auth";

export default function MenuLinks({ isOpen }) {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/" fontSize={"2xl"} mr={{ base: "4rem", md: "2rem" }}>
          Products
        </MenuItem>
        <Auth />
      </Stack>
    </Box>
  );
}
