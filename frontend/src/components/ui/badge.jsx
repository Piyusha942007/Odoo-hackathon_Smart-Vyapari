import React from 'react';

export const Badge = ({ children, className = "" }) => (
    <span className={`px-2.5 py-0.5 rounded-full text-white text-xs font-medium ${className}`}>
        {children}
    </span>
);