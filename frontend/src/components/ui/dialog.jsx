import React from 'react';

export const Dialog = ({ open, onOpenChange, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
                {children}
            </div>
        </div>
    );
};

export const DialogContent = ({ children, className = "" }) => <div className={`p-6 ${className}`}>{children}</div>;
export const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;
export const DialogTitle = ({ children }) => <h2 className="text-xl font-bold text-[#1F3A93]">{children}</h2>;
export const DialogDescription = ({ children }) => <p className="text-sm text-gray-500 mt-1">{children}</p>;
export const DialogFooter = ({ children, className = "" }) => <div className={`mt-6 flex gap-3 ${className || "justify-end"}`}>{children}</div>;