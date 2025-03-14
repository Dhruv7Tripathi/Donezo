"use client"
import { useState } from "react";
import { CalendarIcon, PlusIcon, UserIcon } from "lucide-react";
import { format, startOfWeek, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import UserAccountNav from "@/components/userAccountNav";
import SignInButton from "@/components/SignInButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"

export default function CalendarPage() {
  const [selectedDate] = useState(new Date());
  const startWeek = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startWeek, i));

  const { data: session } = useSession();
  return (
    <div className="flex h-screen bg-white text-black">
      <aside className="w-64 bg-gray-100 p-4 border-r border-gray-300">
        <div className="flex items-center space-x-2 text-gray-700">
          <CalendarIcon size={24} />
          <h1 className="text-lg font-semibold">Calendar</h1>
        </div>
        <Button className="w-full mt-4 flex items-center space-x-2 bg-blue-500 text-white hover:bg-blue-600">
          <PlusIcon size={16} />
          <Link href="/createTodo">
            <span >Create</span>
          </Link>
        </Button>
        <div className="mt-4">
          <h2 className="text-sm font-semibold text-gray-600">My Calendars</h2>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center space-x-2 text-gray-700">
              <UserIcon size={16} className="text-blue-500" />
              <div className="p-4">
                {session?.user ? (
                  <UserAccountNav user={session.user} />
                ) : (
                  <SignInButton text="Sign In" />
                )}
              </div>
            </li>
            <li className="text-green-600">Holidays in India</li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold">March 2025</h2>
          <Button variant="outline">Today</Button>
        </header>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-2 border-b pb-2 text-center">
          {weekDays.map((day, index) => (
            <div key={index} className="p-2">
              <span className="block text-sm text-gray-500">{format(day, "EEE")}</span>
              <span
                className={`block w-8 h-8 mx-auto rounded-full text-center leading-8 font-medium ${format(day, "d") === format(selectedDate, "d")
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
                  }`}
              >
                {format(day, "d")}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="relative mt-4 h-[500px] border border-gray-300">
          <div className="absolute top-[50%] left-0 w-full h-[2px] bg-red-500"></div>
        </div>
      </div>
    </div>
  );
}
