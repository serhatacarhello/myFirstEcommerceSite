import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();
  return (
    <>
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
          Error404
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          This page was not found.
        </AlertDescription>
        <ButtonGroup mt={5} spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
          <Button
            variant="solid"
            colorScheme={"green"}
            onClick={() => navigate("/")}
          >
            Home Page
          </Button>
        </ButtonGroup>
      </Alert>
    </>
  );
}
