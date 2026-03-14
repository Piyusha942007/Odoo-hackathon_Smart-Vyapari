import React from "react";
import { useApp } from "../context/AppContext";
import { User, Mail, Briefcase, Calendar } from "lucide-react";

export default function Profile() {
  const app = useApp();
  const user = app?.user || {
    name: "Inventory Manager",
    email: "manager@smartvyapari.com",
    role: "Manager",
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-6">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1F3A93]">Profile</h1>
        <p className="text-[#7F8C8D] text-sm mt-1">Manage your account information</p>
      </div>

      {/* PROFILE HEADER */}
      <div className="bg-white border border-[#e0e0e0] shadow-sm rounded-md p-6 flex items-center gap-6">
        <div className="h-20 w-20 rounded-full bg-white border border-[#e0e0e0] shadow-sm flex items-center justify-center text-[#5DADE2] text-2xl font-medium">
          {getInitials(user?.name)}
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-[#1F3A93]">
            {user?.name || "Inventory Manager"}
          </h2>
          <p className="text-[#7F8C8D] text-sm mt-1 capitalize">
            {user?.role || "Manager"}
          </p>
          <button className="mt-3 text-sm text-[#1F3A93] font-medium hover:underline text-left">
            Change Photo
          </button>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="bg-white border border-[#e0e0e0] shadow-sm rounded-md p-6">
        <h2 className="text-[1.1rem] font-medium text-[#5DADE2] mb-6">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
          {/* FULL NAME */}
          <div>
            <label className="text-sm font-medium text-[#1F3A93] block mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-[#7F8C8D]" />
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full pl-10 pr-4 py-2 border border-[#e0e0e0] rounded-md text-sm text-[#7F8C8D] focus:outline-none focus:border-[#5DADE2] focus:ring-1 focus:ring-[#5DADE2]"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-[#1F3A93] block mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-[#7F8C8D]" />
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full pl-10 pr-4 py-2 border border-[#e0e0e0] rounded-md text-sm text-[#7F8C8D] focus:outline-none focus:border-[#5DADE2] focus:ring-1 focus:ring-[#5DADE2]"
              />
            </div>
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm font-medium text-[#1F3A93] block mb-2">Role</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-[#7F8C8D]" />
              <input
                type="text"
                defaultValue={user?.role}
                disabled
                className="w-full pl-10 pr-4 py-2 border border-[#e0e0e0] rounded-md text-sm text-[#7F8C8D] bg-[#f9fafb] cursor-not-allowed focus:outline-none focus:border-[#5DADE2] focus:ring-1 focus:ring-[#5DADE2]"
              />
            </div>
          </div>

          {/* JOIN DATE */}
          <div>
            <label className="text-sm font-medium text-[#1F3A93] block mb-2">Joined Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-[#7F8C8D]" />
              <input
                type="text"
                defaultValue="2024-01-15"
                disabled
                className="w-full pl-10 pr-4 py-2 border border-[#e0e0e0] rounded-md text-sm text-[#7F8C8D] bg-[#f9fafb] cursor-not-allowed focus:outline-none focus:border-[#5DADE2] focus:ring-1 focus:ring-[#5DADE2]"
              />
            </div>
          </div>
        </div>

        <button className="bg-[#1F3A93] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-900 transition-colors">
          Update Profile
        </button>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="bg-white border border-[#e0e0e0] shadow-sm rounded-md p-6">
        <h2 className="text-[1.1rem] font-medium text-[#5DADE2] mb-6">Change Password</h2>

        <div className="space-y-5 mb-6">
          <div>
            <label className="text-sm font-medium text-[#1F3A93] block mb-2">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full px-4 py-2 border border-[#e0e0e0] rounded-md text-sm text-[#7F8C8D] focus:outline-none focus:border-[#5DADE2] focus:ring-1 focus:ring-[#5DADE2]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#1F3A93] block mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-[#e0e0e0] rounded-md text-sm text-[#7F8C8D] focus:outline-none focus:border-[#5DADE2] focus:ring-1 focus:ring-[#5DADE2]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#1F3A93] block mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-[#e0e0e0] rounded-md text-sm text-[#7F8C8D] focus:outline-none focus:border-[#5DADE2] focus:ring-1 focus:ring-[#5DADE2]"
            />
          </div>
        </div>

        <button className="bg-[#1F3A93] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-900 transition-colors">
          Change Password
        </button>
      </div>
    </div>
  );
}