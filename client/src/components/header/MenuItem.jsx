import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function MenuItem({ children, isLast, to = "/", ...rest }) {
  return (
    <Link to={to}>
      <Text display="block"  {...rest}>
        {children}
      </Text>
    </Link>
  );
}
