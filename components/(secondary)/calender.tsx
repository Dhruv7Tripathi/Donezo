import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  highlightDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, highlightDates = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const dayOfWeek = firstDayOfMonth.getDay();

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Generate day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Check if a date is highlighted
  const isHighlighted = (date: Date) => {
    return highlightDates.some(highlightDate =>
      highlightDate.getDate() === date.getDate() &&
      highlightDate.getMonth() === date.getMonth() &&
      highlightDate.getFullYear() === date.getFullYear()
    );
  };

  // Handle date selection
  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(selectedDate);
    if (onDateSelect) {
      onDateSelect(selectedDate);
    }
  };

  // Generate calendar grid
  const generateCalendarDays = () => {
    const today = new Date();
    const calendarDays = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < dayOfWeek; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="h-10 w-10"></div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;

      const isSelected = selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;

      const hasHighlight = isHighlighted(date);

      calendarDays.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`
            h-10 w-10 flex items-center justify-center rounded-full cursor-pointer
            ${isToday ? 'border border-blue-500' : ''}
            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
            ${hasHighlight ? 'font-bold text-blue-700' : ''}
          `}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="w-full max-w-md border rounded-lg shadow-sm p-4 bg-white">
      {/* Calendar header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={goToNextMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;