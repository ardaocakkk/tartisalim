import React, { useContext, useState } from "react";
import {
    Card, CardHeader, CardBody, CardFooter, FormControl,
    
    FormLabel,
    Divider,
    Input,
    InputGroup, InputRightElement, FormHelperText
} from '@chakra-ui/react'
import { useFormik } from "formik";
import { Button } from "@chakra-ui/react";
import {Link as RouteLink,} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



function Login() {
    // const [showPassword, setShowPassword] = useState(true);
    // const handlePasswordVisibility = () => setShowPassword(!showPassword)

    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const handlePasswordVisibility = () => setShowPassword(!showPassword)
    const navigate = useNavigate();

    const submitLogin = async (values) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(`grant_type=&username=${values.username}&password=${values.password}&scope=&client_id=&client_secret=`),

        }
        const response = await fetch('http://localhost:8000/token/', requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.detail);
            alert("Wrong username or password")
        } else {
            localStorage.setItem("token", data.access_token);
            navigate("/")
        }
    }

    const navigateToRegister = () => {
        navigate("/register")
    }

    const navigateToLogin = () => {
        navigate("/login")
    }






    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: (values) => {
            console.log("values", values)
            submitLogin(values);


            // console.log("values",values)
            //create a user on db with that values
        }
    })
    return (
        <>
            <div className={'flex mt-9 mx-auto justify-center items-center'}>

            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white">
             <div className="mx-auto flex justify-center items-center">
                <Button onClick={navigateToLogin} className={'ml-3 items-center justify-center  rounded-md hover:bg-blue-300 transition duration-500 '} colorScheme={'orange'} variant={'outline'}> Login </Button>
                <Button onClick={navigateToRegister} className={'ml-3 items-center justify-center  rounded-md hover:bg-blue-300 transition duration-500'} colorScheme={'orange'} variant={'outline'}> Register </Button>
             </div>
             <form onSubmit={formik.handleSubmit}>
                <FormControl isRequired >
                    <FormLabel>Username</FormLabel>
                    <Input type="text" placeholder="username" onChange={formik.handleChange} value={formik.values.username} id="username" className="dark:text-white border-2 rounded-lg -black w-full mb-3 mt-3 dark:bg-gray-800 dark:border-blue-600" />
                    <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? 'password' : 'text'}
                                    placeholder={"******"}
                                    id="password"
                                    size={"lg"}
                                    name='password'
                                    onChange={event => setShowPassword(event.currentTarget.value)}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className="dark:text-white border-2 rounded-lg -black w-full mb-3 mt-3 dark:bg-gray-800 dark:border-blue-600"
                    />
                    <InputRightElement>
                    <Button onClick={handlePasswordVisibility} variant={"ghost"} className="mt-3">
                                        {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                    </Button>
                    </InputRightElement>

                </InputGroup>
                <FormHelperText>Don't have an account? <Button onClick={navigateToRegister} className={'text-blue-300'}>Click here.</Button> </FormHelperText>
                <div className="flex justify-center bg-blue-300 rounded-lg mt-2">
                    <Button type="submit" variant={"solid"} colorScheme="blue" className="w-full" >Login</Button>
                </div>

                </FormControl>
             </form>
    
</div>
                {/* <Card className={'w-96'}>
                    <CardHeader className={'text-center'}>Login</CardHeader>
                    <CardBody>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl id="name" isRequired />
                            <FormLabel>Username</FormLabel>
                            <input type="text" name="username" onChange={formik.handleChange} value={formik.values.username} className={'border border-gray-300 p-2 w-full rounded-md'} />
                            <FormLabel>Password</FormLabel>
                            <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} className={'border border-gray-300 p-2 w-full rounded-md'} />
                            <div className="flex mx-auto justify-center items-center">
                                <Button type="submit" variant={"solid"} >Login</Button>
                            </div>
                        </form>

                    </CardBody>
                </Card> */}
            </div>
        </>
    );
}


export default Login;