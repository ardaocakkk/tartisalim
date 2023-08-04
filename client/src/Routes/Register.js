import React, { useContext, useState } from "react";
import {
    Card, CardHeader, CardBody, CardFooter, FormControl, FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import { useFormik } from "formik";
import { Button } from "@chakra-ui/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate, NavLink, Form } from 'react-router-dom';



function Register() {
    // const [showPassword, setShowPassword] = useState(true);
    // const handlePasswordVisibility = () => setShowPassword(!showPassword)

    const [getToken, setToken] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
    const handlePasswordVisibility = () => setShowPassword(!showPassword)


    const createToken = async (values) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(`grant_type=&username=${values.username}&password=${values.password}&scope=&client_id=&client_secret=`),
        }
        const response = await fetch('http://localhost:8000/token/', requestOptions);
        const data = await response.json();
        return data.access_token;


    }


    const submitRegistiration = async (values) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)

        }
        const response = await fetch('http://localhost:8000/users/', requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            localStorage.setItem("token", await createToken(values));
            navigate("/welcome")
        }
    }



    const navigateToLogin = () => {
        navigate("/login")
    }




    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            console.log("values", values)
            submitRegistiration(values);

            // console.log("values",values)
            //create a user on db with that values
        }
    })
    return (
        <div className={'flex mt-9 mx-auto justify-center items-center'}>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          <form onSubmit={formik.handleSubmit}>
            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type={'text'} placeholder={'Your Name'} name='username' id='username' onChange={formik.handleChange} value={formik.values.username} className="dark:text-white border-2 rounded-lg -black w-full mb-3 mt-3 dark:bg-gray-800 dark:border-blue-600" />
                <FormLabel >Email</FormLabel>
                <Input type={'email'} placeholder={'Your email'} id='email' name='email' onChange={formik.handleChange} value={formik.values.email} className="dark:text-white border-2 rounded-lg -black w-full mb-3 mt-3 dark:bg-gray-800 dark:border-blue-600"  /> 
                <FormHelperText>We won't share your email address with anyone.</FormHelperText>
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
                <FormHelperText>Already have an account? <NavLink to={'/login'} className={'text-blue-300'}>Click here.</NavLink> </FormHelperText>
                <div className="flex justify-center bg-blue-300 rounded-lg mt-2">
                    <Button type="submit" variant={"solid"} colorScheme="blue" >Register</Button>
                </div>
            </FormControl>
          </form>
</div>
            {/* <Card className={'w-96'}>
                <CardHeader className={'text-center'}>Register</CardHeader>
                <CardBody>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl id="name" isRequired />
                        <FormLabel>Username</FormLabel>
                        <input type="text" name="username" onChange={formik.handleChange} value={formik.values.username} className={'border border-gray-300 p-2 w-full rounded-md'} />
                        <FormLabel>Email</FormLabel>
                        <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} className={'border border-gray-300 p-2 w-full rounded-md'} />
                        <FormLabel>Password</FormLabel>
                        <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} className={'border border-gray-300 p-2 w-full rounded-md'} />
                        <div className="flex mx-auto justify-center items-center">
                            <Button type="submit" variant={"solid"}>Register</Button>
                            <Button onClick={navigateToLogin} className="ml-2">Already have an account?</Button>
                        </div>
                    </form>

                </CardBody>
            </Card> */}
        </div>
    );
}


export default Register;