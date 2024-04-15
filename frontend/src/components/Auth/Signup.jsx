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

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [c_showPassword, c_setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const navigate = useNavigate();
  const toast = useToast();
  const { API_URL } = ChatState();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });

  async function postDetails(pic) {
    
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please  select an image.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (pic.type === "image/jpeg" || "image/png" || "image/jpg") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "Lets Connect");
      data.append("cloud_name", "dewfjhlh5");
      await fetch("https://api.cloudinary.com/v1_1/dewfjhlh5/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast({
        title: "failed to upload",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  }
  async function submitHandler() {
    setLoading(true);
    if (!user.name || !user.email || !user.password || !user.c_password) {
      toast({
        title: "Please  enter all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(user.email)) {
      toast({
        title: "Please enter the valid email",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (user.password !== user.c_password) {
      toast({
        title: "Password dosent match",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`${API_URL}/user`, {
        name: user.name,
        email: user.email,
        password: user.password,
        pic: pic,
      });
      toast({
        title: "Registration Successfull..",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "error occured",
        description: error.message,
        status: "error  ",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  }
  return (
    <VStack spacing="5px">
      <FormControl isRequired id="first-name">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name..."
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </FormControl>
      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email..."
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </FormControl>
      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter Your password..."
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <InputRightElement width="4.5rem">
            <Button
              borderRadius="full"
              h="1.75rem"
              onClick={(e) => setShowPassword(!showPassword)}>
              {showPassword ? <FaRegEye /> : <FaEyeSlash />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired id="c-password">
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="ReEnter Your password..."
            type={c_showPassword ? "text" : "password"}
            value={user.c_password}
            onChange={(e) => setUser({ ...user, c_password: e.target.value })}
          />
          <InputRightElement width="4.5rem">
            <Button
              borderRadius="full"
              h="1.75rem"
              onClick={(e) => c_setShowPassword(!c_showPassword)}>
              {c_showPassword ? <FaRegEye /> : <FaEyeSlash />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          accept="image/*"
          type="file"
          p="5px"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        width="80%"
        mt="15px"
        colorScheme="green"
        borderRadius="full"
        isLoading={loading}
        onClick={submitHandler}>
        Register
      </Button>
    </VStack>
  );
}

export default Signup;
