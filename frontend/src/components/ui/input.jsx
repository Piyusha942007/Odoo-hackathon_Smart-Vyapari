import React from 'react';

export const Input = ({ className = "", ...props }) => (
    <input
        className={`w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/20 focus:border-[#1F3A93] transition-all ${className}`}
        {...props}
    />
);