import React from 'react';

export const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
        {children}
    </div>
);

export const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className = "" }) => (
    <div className={`p-6 border-b border-gray-50 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold text-[#1F3A93] ${className}`}>{children}</h3>
);