import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import { useNavigate } from "react-router-dom";
 

function HomePage() {

  const navigate = useNavigate();
  
   useEffect(() => {
     const user = JSON.parse(localStorage.getItem("userInfo"));
     if (!user) navigate("/");
   }, [navigate]);

  return (
    <Container maxW="xl" as="b" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="80%"
        m="60px 0 15px 0"
        borderRadius="full"
        borderWidth="3px"
        borderColor="#00A884">
        <Text fontSize="4xl" color="black" align="center">
          Lets Connect
        </Text>
      </Box>
      <Box
        bg={"white"}
        w="80%"
        borderRadius="3xl"
        borderWidth="3px"
        p={4}
        borderColor="#00A884"
        color="black">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab width="50%" color="black">
              Login
            </Tab>
            <Tab width="50%" color="black">
              Signup
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
