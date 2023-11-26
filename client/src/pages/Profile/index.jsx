import { useAuth } from "../../contexts/AuthContext";
import { Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout(() => {
      //callback func
      navigate("/");
    });
  };
  return (
    <div>
      <Heading>Profile</Heading>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <Button
        onClick={() => {
          handleLogout();
        }}
        mt={"2"}
        colorScheme="pink"
        variant={"solid"}
      >
        Logout
      </Button>
    </div>
  );
}

export default Profile;
