import { MinusIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Button, Text } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import HomeIcon from '@mui/icons-material/Home';
import {
   Drawer,
   DrawerBody,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
 } from '@chakra-ui/react'
import Login from '../Routes/Login';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

export default function Sidebar() {
   const [getCheckToken, setCheckToken] = useState(false);
   const navigate = useNavigate();

   const { isOpen, onOpen, onClose } = useDisclosure()
   const btnRef = React.useRef()

   const checkToken = () => {
      if (localStorage.getItem('token') !== null) {
         setCheckToken(true);

      } else {
         setCheckToken(false);
      }
   }
   useEffect(() => {
      checkToken();
   })

   const navigateToHome = () => {
      navigate("/")
   }
   const logout = () => {
      localStorage.removeItem("token");
      navigate("/login")
   }
   const redirectToLogin = () => {
      if (localStorage.getItem('token') !== null) {
         navigate("/welcome")
      } else {

         navigate("/login")
      }
   }
   const redirectToRegister = () => {
      if (localStorage.getItem('token') !== null) {
         navigate("/welcome")
      } else {

         navigate("/register")
      }
   }
   const redirectToProfile = () => {
      navigate("/profile/me")
   }
   if(localStorage.getItem('theme') ) {
      document.documentElement.classList.add('dark');
    }
    const darkMode = () =>  {
  
      document.documentElement.classList.toggle('dark');
      if(document.documentElement.classList.contains('dark')) {
        localStorage.setItem("theme",'true')
      }else {
        localStorage.removeItem("theme")
      }
   }

   
   return (
      <>
         {/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button> */}
         <Button ref={btnRef} onClick={onOpen} className='dark:text-white'>
         <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </Button>
            <Drawer isOpen={isOpen} placement='top' onClose={onClose} finalFocusRef={btnRef} >
               <DrawerOverlay/>
               <DrawerContent className='dark:bg-main bg-gray-300'>
                  <DrawerCloseButton/>
                  <DrawerHeader> <Button onClick={navigateToHome} className='text-blue-300 ml-2' >Tartisalim</Button> </DrawerHeader>
                  <DrawerBody>
                    {(getCheckToken) && (
                     <div className='flex dark:text-white  '>
                     <div className='flex flex-col ml-2'>
                     <Button onClick={redirectToProfile}> <PersonIcon/> <Text className='hover:text-blue-300 transition duration-500'>Profile</Text> </Button>
                     <Button onClick={logout}><LogoutIcon/> <Text className='hover:text-blue-300 transition duration-500'>Logout</Text> </Button>
                     </div>
                     </div>
                    )|| (
                     <div className='flex dark:text-white' >
                     <div className='flex flex-col ml-2'>
                        <Button onClick={redirectToLogin}> <Text className='hover:text-blue-300 transition duration-500' >Login</Text> </Button>
                        <Button onClick={redirectToRegister}><Text className='hover:text-blue-300 transition duration-500' >Register</Text></Button>
                        </div>
                     </div>
                    )}
                    <li>
                           <button onClick={darkMode} className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                           <DarkModeIcon/>
                              <span class="flex-1 ml-3 whitespace-nowrap">Dark Mode</span>
                           </button>
                        </li>
                     <Divider/>
                  </DrawerBody>
               </DrawerContent>
            </Drawer>
         
         


         <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-main">

               <ul class="space-y-2 font-medium">
                  <li>
                     <a href="/" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                        <span class="ml-3">Tartisalim</span>
                     </a>
                  </li>
                  <li>
                     <a href="/" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                     <HomeIcon/>
                        <span class="ml-3">Main</span>
                     </a>
                     
                  </li>
                  <li>
                           <button onClick={darkMode} className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                           <DarkModeIcon/>
                              <span class="flex-1 ml-3 whitespace-nowrap">Dark Mode</span>
                           </button>
                        </li>
                  {(getCheckToken && (
                     <div>
                        <li>
                           <button onClick={redirectToProfile} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <PersonIcon/>
                              <span class="flex-1 ml-3 whitespace-nowrap">Profile</span>
                           </button>
                        </li>
                        <li>
                           <button onClick={logout} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                           <LogoutIcon/> 
                              <span class="flex-1 ml-3 whitespace-nowrap">Logout</span>
                           </button>
                        </li>

                     </div>
                  ) || <div>
                        <li>
                           <a href="login" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                              <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                              </svg>
                              <span class="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                           </a>
                        </li>
                        <li>
                           <button onClick={redirectToRegister} className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                              <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                 <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                 <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                 <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                              </svg>
                              <span class="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                           </button>
                        </li>
                     </div>)}
                     
               </ul>
            </div>
         </aside>

      </>
   )
}