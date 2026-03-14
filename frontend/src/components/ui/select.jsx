import React from 'react';

// The main Select component
export const Select = ({ children, value, onValueChange, className = "" }) => {
    return (
        <div className="relative w-full">
            <select
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                className={`w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/20 focus:border-[#1F3A93] text-[#1F3A93] ${className}`}
            >
                {children}
            </select>
            {/* Small custom arrow icon */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};

export const SelectTrigger = ({ children, className = "" }) => (
    <div className={`flex items-center justify-between ${className}`}>{children}</div>
);

export const SelectValue = ({ placeholder }) => (
    <option value="" disabled hidden>{placeholder}</option>
);

export const SelectContent = ({ children }) => <>{children}</>;

export const SelectItem = ({ value, children }) => (
    <option value={value} className="text-[#1F3A93]">
        {children}
    </option>
);