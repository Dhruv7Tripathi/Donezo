"use client"
import { useState, useEffect } from "react";
import { CalendarIcon, PlusIcon, UserIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, subMonths, addMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import UserAccountNav from "@/components/userAccountNav";
import SignInButton from "@/components/SignInButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
const fetchHolidays = async (year: string) => {
  return {
    [`${year}-01-26`]: "Republic Day",
    [`${year}-08-15`]: "Independence Day",
    [`${year}-10-02`]: "Gandhi Jayanti",
    [`${year}-12-25`]: "Christmas Day"
  };
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const year = format(currentDate, "yyyy");
    fetchHolidays(year).then(setHolidays);
  }, [currentDate]);

  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: startMonth, end: endMonth });
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
            <span>Create</span>
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
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4 border-b pb-2">
          <Button variant="outline" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            <ChevronLeft size={16} />
          </Button>
          <h2 className="text-xl font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
          <Button variant="outline" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            <ChevronRight size={16} />
          </Button>
        </header>
        <div className="grid grid-cols-7 gap-2 border-b pb-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
            <div key={index} className="p-2 font-semibold text-gray-600">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {daysInMonth.map((day, index) => {
            const dayFormatted = format(day, "yyyy-MM-dd");
            const holiday = holidays[dayFormatted];
            return (
              <div key={index} className={`p-4 border rounded-md text-gray-700 ${holiday ? "bg-yellow-200" : ""}`}>
                <span className={`${format(day, "d") === format(new Date(), "d") ? "bg-blue-500 text-white rounded-full px-3 py-1" : ""}`}>
                  {format(day, "d")}
                </span>
                {holiday && <div className="text-xs text-red-600 mt-1">{holiday}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
