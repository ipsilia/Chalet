import { useState } from "react";

// Import all icons from their respective files
import Logo from "../icons/Logo";
import MenuIcon from '../icons/MenuIcon';
import XIcon from '../icons/XIcon';

const Navbar = () => {
    // State to manage the mobile menu's visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Navigation links data
    const navLinks = [
        { name: "Home", href: "#", active: true },
        { name: "Services", href: "#", active: false },
        { name: "Special offers", href: "#", active: false },
        { name: "Support", href: "#", active: false },
        { name: "About us", href: "#", active: false },
    ];

    return (
        // The navbar will be fixed to the top of the page, appearing over content.
        <header className="fixed top-0 left-0 right-0 z-50 p-4">
            <div className="container mx-auto">
                <nav
                    className="
                        w-full 
                        flex items-center justify-between 
                        p-2 
                        rounded-full 
                        bg-white/10 
                        backdrop-blur-sm lg:backdrop-blur-lg
                        border border-white/20 
                        shadow-lg
                    "
                >
                    {/* Logo and Brand Name */}
                    <a href="#" className="flex items-center gap-2 ml-4">
                        <Logo className="w-12 h-12 text-white" />
                        <span className="hidden sm:inline text-xl font-bold text-white tracking-wider ">
                            Nesum
                        </span>
                    </a>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-full border border-white/20">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`
                                    px-6 py-2 rounded-full text-white text-sm font-medium
                                    transition-all duration-300
                                    ${
                                        link.active
                                            ? "bg-white/20"
                                            : "hover:bg-white/10"
                                    }
                                `}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-full border border-white/20 mr-2">
                        <a
                            href="#"
                            className="px-6 py-2 rounded-full text-white text-sm font-medium transition-all duration-300 hover:bg-white/10"
                        >
                            Contact us
                        </a>
                        <a
                            href="#"
                            className="px-6 py-2 rounded-full text-white text-sm font-medium bg-white/20 transition-all duration-300"
                        >
                            Login
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden mr-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white"
                        >
                            {isMenuOpen ? (
                                <XIcon className="w-7 h-7" />
                            ) : (
                                <MenuIcon className="w-7 h-7" />
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div
                        className="
                        lg:hidden 
                        mt-2 p-4 
                        rounded-2xl 
                        bg-white/10 
                        backdrop-blur-lg 
                        border border-white/20 
                        shadow-lg
                    "
                    >
                        <div className="flex flex-col items-center gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`
                                        w-full text-center px-6 py-3 rounded-full text-white text-md font-medium
                                        transition-all duration-300
                                        ${
                                            link.active
                                                ? "bg-white/20"
                                                : "hover:bg-white/10"
                                        }
                                    `}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="w-full border-t border-white/20 my-2"></div>
                            <a
                                href="#"
                                className="w-full text-center px-6 py-3 rounded-full text-white text-md font-medium transition-all duration-300 hover:bg-white/10"
                            >
                                Contact us
                            </a>
                            <a
                                href="#"
                                className="w-full text-center px-6 py-3 rounded-full text-white text-md font-medium bg-white/20 transition-all duration-300"
                            >
                                Login
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;