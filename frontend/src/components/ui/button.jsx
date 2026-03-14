import React from 'react';

export const Button = ({ children, onClick, className = "", variant = "primary", ...props }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center";
    const variants = {
        primary: "bg-[#1F3A93] text-white hover:bg-[#2c4fa8]",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
        ghost: "text-gray-600 hover:bg-gray-100",
        success: "bg-green-500 text-white hover:bg-green-600",
        warning: "bg-orange-500 text-white hover:bg-orange-600",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};