// src/components/icons/Logo.tsx

const Logo = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 100 85" // Adjusted viewBox for better framing
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* The stroke="currentColor" property on the main SVG is removed
            to allow individual colors for each element.
            The stroke width is increased to 2.5 for a bolder look.
        */}

        {/* --- Night Sky Elements (Slate Blue) --- */}
        <g stroke="#7a9aab" strokeWidth="3.5">
            {/* Crescent Moon */}
            <path d="M68 15 A 8 8 0 0 0 62 23 A 6 6 0 1 1 68 15 Z" />
            {/* Stars */}
            <path d="M60 8 L 60.5 9 L 61 8 L 60.5 7 Z" />
            <path d="M82 25 L 82.5 26 L 83 25 L 82.5 24 Z" />
            <path d="M85 45 L 85.5 46 L 86 45 L 85.5 44 Z" />
        </g>

        {/* --- The Chalet (Earthy Terracotta) --- */}
        <g stroke="#a86d5d" strokeWidth="3.5">
            <path d="M25 65 V 45 L 48 30 L 71 45 V 65" />
            <path d="M42 65 V 50 H 54 V 65" />
            <path d="M25 45 L 71 45" />
            <path d="M34 50 L 34 65" />
            <path d="M62 50 L 62 65" />
        </g>

        {/* --- The Pine Tree (Forest Green) --- */}
        <g stroke="#3a5a40" strokeWidth="3.5">
            <path d="M71 65 L 78 65 L 78 40 L 88 40 L 75 15 L 62 40 L 72 40" />
        </g>

        {/* --- The Creek (Slate Blue) --- */}
        <g stroke="#7a9aab" strokeWidth="3.5">
            <path d="M20 70 C 30 75, 40 75, 50 70 S 65 60, 75 65" />
            <path d="M22 75 C 32 80, 42 80, 52 75 S 67 65, 77 70" />
        </g>
    </svg>
);

export default Logo;