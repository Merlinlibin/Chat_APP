import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";

function Login() {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { API_URL } = ChatState();

  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter Your password..."
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              borderRadius="full"
              h="1.75rem"
              onClick={(e) => setShow(!show)}>
              {show ? <FaRegEye /> : <FaEyeSlash />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        width="80%"
        mt="15px"
        colorScheme="green"
        borderRadius="full"
        onClick={submitHandler}
        isLoading={loading}>
        Login
      </Button>
      <Button
        variant="solid"
        width="80%"
        mt="15px"
        colorScheme="red"
        borderRadius="full"
        whiteSpace="wrap"
        h="auto"
        p={3}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}>
        Get in as Guest User
      </Button>
    </VStack>
  );
}

export default Login;
