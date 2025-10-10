import React, { useState, useEffect } from "react";
import { Logo } from "../assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faSun, faMoon, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";
import { message } from "antd";
import axios from "axios";

const Navbar = () => {
    const [state, setState] = useState({
        isOpen: false,
        isDarkMode: false,
        isPopoverOpen: false,
        isLogged: false,
        name: "",
        isAdmin: false
    });

    const toggleState = (key) => {
        setState(prevState => ({ ...prevState, [key]: !prevState[key] }));
    };

    const handleLogout = () => {
        Cookies.remove("_id");
        setState(prevState => ({ ...prevState, isLogged: false, name: "", isPopoverOpen: false }));
        message.success("User successfully logged out");
        console.log("User logged out");
    };

    const fetchUserData = async () => {
        try {
            const cookie = Cookies.get("_id");
            const response = await axios.post("https://hospital-management-a92k.onrender.com/auth",{cookie}, { withCredentials: true });
            const user = response.data.user;
            setState(prevState => ({
                ...prevState,
                name: user?.name || "",
                isAdmin: user?.email === "anujloharkar3557@gmail.com"
            }));
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const id = Cookies.get("_id");

        if (storedTheme) {
            const isDark = storedTheme === 'dark';
            setState(prevState => ({ ...prevState, isDarkMode: isDark }));
            document.body.classList.toggle('dark', isDark);
        }

        if (id) {
            setState(prevState => ({ ...prevState, isLogged: true }));
            fetchUserData();
        }
    }, [Cookies.get("_id")]);

    const navLinks = [
        { href: "/", label: "Home" },
        state.isAdmin && { href: "/admin", label: "Admin" },
        { href: "/about", label: "About" },
        !state.isLogged && { href: "/login", label: "Login" },
        state.isLogged && { href: "/myapt", label: "My Appointments" }
    ].filter(Boolean);

    return (
        <nav className="flex items-center w-full justify-between bg-white dark:bg-gray-900 p-6 shadow-md dark:shadow-gray-800">
            <div className="flex items-center flex-shrink-0 text-blue-500 dark:text-blue-400 mr-6">
                <span className="font-semibold text-xl tracking-tight">
                    <img src={Logo} alt="Logo" className="w-32 h-auto" />
                </span>
            </div>

            <div className="block lg:hidden">
                <button
                    onClick={() => toggleState('isOpen')}
                    className="flex items-center px-3 py-2 border rounded text-blue-500 dark:text-blue-400 border-blue-500 dark:border-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-700 dark:hover:border-blue-300"
                >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
                        <path d="M2 6h16M2 12h16M2 18h16"></path>
                    </svg>
                </button>
            </div>

            <div className={`w-full lg:flex lg:items-center lg:w-auto ${state.isOpen ? 'block' : 'hidden'}`}>
                <div className="text-sm lg:flex-grow lg:text-center flex flex-col lg:flex-row lg:space-x-4">
                    {navLinks.map(link => (
                        <div key={link.href} className="relative group">
                            <a href={link.href} className="block mt-4 lg:inline-block lg:mt-0 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                                {link.label}
                            </a>
                            <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500 dark:bg-blue-400 scale-x-0 transform transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center space-x-4 font-light hidden lg:flex">
                <a href="tel:+1234567890" className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
                    +123 456 7890
                </a>
                <a href="mailto:example@gmail.com" className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    example@gmail.com
                </a>
                <button className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded">
                    <a href="/bookapt">Book an Appointment</a>
                </button>
            </div>

            <div className={`lg:hidden ${state.isOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800`}>
                <div className="flex flex-col items-center">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="block py-2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                            {link.label}
                        </a>
                    ))}
                    <a href="tel:+1234567890" className="block py-2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                        <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
                        +123 456 7890
                    </a>
                    <a href="mailto:example@gmail.com" className="block py-2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                        example@gmail.com
                    </a>
                    <button className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded mt-4">
                    <a href="/bookapt">Book an Appointment</a>
                    </button>
                </div>
            </div>


            {state.isLogged && (
                <div className="relative ml-4">
                    <button
                        onClick={() => toggleState('isPopoverOpen')}
                        className="p-2 rounded-full"
                        aria-label="User options"
                    >
                        <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                        <p>{state.name}</p>
                    </button>
                    {state.isPopoverOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                            <div className="py-2">
                                <button
                                    onClick={handleLogout}
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
