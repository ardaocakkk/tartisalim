import React from "react";
import { NavLink } from "react-router-dom";
import AccountTab from "./AccountTab";
import Sidebar from "../Sidebar";
export default function Header() {
    return (
        <>
            <div className='h-15 border-site w-full flex p-5 flex-auto items-center text-white dark:text-black  mx-auto'>
                <NavLink to={'/'}><h1 className="text-cyan-600 font-sans ml-20 text-3xl" >Tartisalim</h1></NavLink>
                {/*Search bar*/}
                <div className='flex justify-center w-full items-center ml-20'>
                </div>
                <div className='w-full  flex justify-end items-center mx-auto'>
                    {/*Account Tab*/}
                    <AccountTab />
                </div>
            </div>
            <Sidebar />
        </>
    )
}