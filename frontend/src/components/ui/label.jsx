import React from 'react';

export const Label = ({ children, htmlFor, className = "" }) => (
    <label
        htmlFor={htmlFor}
        className={`text-sm font-medium text-[#1F3A93] mb-1.5 block ${className}`}
    >
        {children}
    </label>
);