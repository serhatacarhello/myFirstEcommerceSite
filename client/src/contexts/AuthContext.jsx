import { useState, createContext, useContext, useEffect } from "react";
import { fetchLogout, fetchMe } from "../utils/api";
import { Flex, Spinner } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // auth login operations her sayfa yenilendiğinde login işlemini yapıyor
    (async () => {
      try {
        // please use async await func for  sth which needs time to do sth
        const me = await fetchMe();
        setLoggedIn(true);
        setUser(me);
        setLoading(false);

        // console.log(me, "me");
      } catch (error) {
        // console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  // run a func
  const login = (data) => {
    //set login state true
    setLoggedIn(true);
    // set user data
    setUser(data.user);
    // set tokens to localStorage
    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token", data.refreshToken);
  };

  // run a fun for logout
  const logout = async (callback) => {
    setLoggedIn(false);
    setUser(null);

    await fetchLogout();

    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    // to redirect to main page use callback func
    callback();
  };

  const values = {
    loggedIn,
    user,
    login,
    logout,
  };

  if (loading)
    return (
      <>
        <Flex align={"center"} justify={"center"} h={"100vh"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            size={"xl"}
            color="red"
          />
        </Flex>
      </>
    );
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
