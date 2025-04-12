"use client"
import { useState, useEffect } from "react";
import { CalendarIcon, PlusIcon, UserIcon, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, subMonths, addMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import UserAccountNav from "@/components/auth/userAccountNav";
import SignInButton from "@/components/auth/SignInButton";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const year = format(currentDate, "yyyy");
    fetchHolidays(year).then(setHolidays);
  }, [currentDate]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (sidebarOpen && !target.closest('.sidebar')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: startMonth, end: endMonth });
  const { data: session } = useSession();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-white text-black md:flex-row">
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-300 bg-gray-100">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu size={24} />
        </Button>
        <div className="flex items-center space-x-2 text-gray-700">
          <CalendarIcon size={20} />
          <h1 className="text-lg font-semibold">Calendar</h1>
        </div>
        <Link href="/createTodo">
          <Button size="icon" className="bg-blue-500 text-white hover:bg-blue-600">
            <PlusIcon size={16} />
          </Button>
        </Link>
      </div>

      <aside
        className={`sidebar fixed inset-y-0 left-0 w-64 bg-gray-100 p-4 border-r border-gray-300 md:relative md:block transform transition-transform duration-300 ease-in-out z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        <div className="flex items-center justify-between md:justify-start md:space-x-2 text-gray-700">
          <div className="flex items-center space-x-2">
            <CalendarIcon size={24} />
            <h1 className="text-lg font-semibold">Calendar</h1>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <X size={20} />
          </Button>
        </div>

        <Button className="w-full mt-4 flex items-center justify-center space-x-2 bg-blue-500 text-white hover:bg-blue-600">
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
              <div className="p-2">
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

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 p-3 md:p-6 overflow-auto">
        <header className="flex justify-between items-center mb-4 border-b pb-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            <ChevronLeft size={16} />
          </Button>
          <h2 className="text-lg md:text-xl font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            <ChevronRight size={16} />
          </Button>
        </header>

        <div className="grid grid-cols-7 gap-1 md:gap-2 border-b pb-2 text-center">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div key={index} className="p-1 md:p-2 font-semibold text-gray-600 text-xs md:text-sm">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 md:gap-2 text-center">
          {daysInMonth.map((day, index) => {
            const dayFormatted = format(day, "yyyy-MM-dd");
            const holiday = holidays[dayFormatted];
            const isToday = format(day, "d") === format(new Date(), "d") &&
              format(day, "M") === format(new Date(), "M") &&
              format(day, "y") === format(new Date(), "y");
            return (
              <div
                key={index}
                className={`p-1 md:p-4 border rounded-md text-gray-700 ${holiday ? "bg-yellow-200" : ""} flex flex-col items-center justify-center min-h-[40px] md:min-h-[100px]`}
              >
                <span className={`text-xs md:text-base ${isToday ? "bg-blue-500 text-white rounded-full px-2 py-0.5 md:px-3 md:py-1" : ""}`}>
                  {format(day, "d")}
                </span>
                {holiday && <div className="hidden md:block text-[10px] md:text-xs text-red-600 mt-1">{holiday}</div>}
                {holiday && <div className="md:hidden w-2 h-2 bg-red-600 rounded-full mt-1"></div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}