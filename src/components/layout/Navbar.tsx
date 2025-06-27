import { useState } from "react";

// SVG Icon for the logo - a stylized chalet
const ChaletIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M2 21h20" />
		<path d="M3 10l9-7 9 7" />
		<path d="M4 21V10l3-3" />
		<path d="M20 21V10l-3-3" />
		<path d="M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" />
		<path d="M15 14h.01" />
		<path d="M12 11h.01" />
	</svg>
);

// SVG Icon for the hamburger menu
const MenuIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<line x1="3" y1="12" x2="21" y2="12" />
		<line x1="3" y1="6" x2="21" y2="6" />
		<line x1="3" y1="18" x2="21" y2="18" />
	</svg>
);

// SVG Icon for the close (X) button
const XIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	</svg>
);

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
		// We add some padding at the top of the page to prevent content from being hidden behind it.
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
						<ChaletIcon className="w-8 h-8 text-white" />
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
