import React, { useEffect, useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button, Text, Divider,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useNavigate } from "react-router-dom";



function AccountTab() {
    const [getCheckToken, setCheckToken] = useState(false);
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login")
    }
    const navigateToRegister = () => {
        navigate("/register")
    }

    const checkToken = () => {
        if (localStorage.getItem('token') !== null) {
            setCheckToken(true);

        } else {
            setCheckToken(false);
        }
        console.log(setCheckToken)
    }
    useEffect(() => {
        checkToken();
    })

    const navigateToProfile = () => {
        navigate("/profile/me")
    }

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login")
    }

    return (

        <Popover>
            <PopoverTrigger>
                <Button variant='ghost'>Account <ChevronDownIcon /> </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                {(getCheckToken && (
                    <div>
                        <PopoverBody>
                            {/* <NavLink to={'/login'}><Text>Giriş Yap</Text></NavLink> */}
                            <Button variant={'ghost'} onClick={navigateToProfile}>Profile</Button>
                        </PopoverBody>
                        <PopoverBody>
                            <Button variant={'ghost'} onClick={logout}>Log out</Button>
                        </PopoverBody>
                    </div>
                ) || <div>
                        <PopoverBody>
                            {/* <NavLink to={'/login'}><Text>Giriş Yap</Text></NavLink> */}
                            <Button variant={'ghost'} onClick={navigateToLogin}>Login</Button>
                        </PopoverBody>
                        <PopoverBody>
                            <Button variant={'ghost'} onClick={navigateToRegister}>Register</Button>
                        </PopoverBody>
                    </div>)}


            </PopoverContent>
        </Popover>

    )
}

export default AccountTab;