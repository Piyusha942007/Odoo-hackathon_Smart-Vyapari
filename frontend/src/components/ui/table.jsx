import React from 'react';

export const Table = ({ children }) => (
    <div className="w-full overflow-auto">
        <table className="w-full text-sm text-left border-collapse">{children}</table>
    </div>
);

export const TableHeader = ({ children }) => (
    <thead className="bg-[#f8f9fa] border-b border-gray-100">{children}</thead>
);

export const TableBody = ({ children }) => (
    <tbody className="divide-y divide-gray-50">{children}</tbody>
);

export const TableRow = ({ children, className = "" }) => (
    <tr className={`hover:bg-gray-50/50 transition-colors ${className}`}>{children}</tr>
);

export const TableHead = ({ children, className = "" }) => (
    <th className={`p-4 font-semibold text-[#1F3A93] ${className}`}>{children}</th>
);

export const TableCell = ({ children, className = "" }) => (
    <td className={`p-4 text-gray-700 ${className}`}>{children}</td>
);