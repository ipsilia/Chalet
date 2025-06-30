import React, { useState } from "react"; // Ensure React is imported for types

// Import all icons from their respective files
import Logo from "../icons/Logo";
import MenuIcon from '../icons/MenuIcon';
import XIcon from '../icons/XIcon';

// --- FIX APPLIED HERE: The component now accepts props ---
const Navbar = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: React.Dispatch<React.SetStateAction<string>> }) => {
    // State to manage the mobile menu's visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Navigation links data
    const navLinks = [
        { key: "home", name: "Home" },
        { key: "development", name: "Development" },
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
                    <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 ml-4">
                        <Logo className="w-12 h-12" />
                        <span className="hidden sm:inline text-xl font-bold text-white tracking-wider ">
                            Nesum
                        </span>
                    </button>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-full border border-white/20">
                        {navLinks.map((link) => (
                            <button
                                key={link.key}
                                onClick={() => setCurrentPage(link.key)}
                                className={`
                                    px-6 py-2 rounded-full text-white text-sm font-medium
                                    transition-colors duration-300
                                    ${
                                        currentPage === link.key
                                            ? "bg-white/20"
                                            : "hover:bg-white/10"
                                    }
                                `}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-full border border-white/20 mr-2">
                        <a
                            href="#"
                            className="px-6 py-2 rounded-full text-white text-sm font-medium transition-colors duration-300 hover:bg-white/10"
                        >
                            Contact us
                        </a>
                        <a
                            href="#"
                            className="px-6 py-2 rounded-full text-white text-sm font-medium bg-white/20 transition-colors duration-300"
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
                                <button
                                    key={link.key}
                                    onClick={() => {
                                        setCurrentPage(link.key);
                                        setIsMenuOpen(false); // Close menu on selection
                                    }}
                                    className={`
                                        w-full text-center px-6 py-3 rounded-full text-white text-md font-medium
                                        transition-colors duration-300
                                        ${
                                            currentPage === link.key
                                                ? "bg-white/20"
                                                : "hover:bg-white/10"
                                        }
                                    `}
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;