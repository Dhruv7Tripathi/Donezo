"use client"

import dynamic from "next/dynamic";

const MyBigCalendar = dynamic(() => import("@/components/calender"), { ssr: false });

export default function CalendarPage() {
  return (
    <div>
      <h1>My Calendar</h1>
      <MyBigCalendar />
    </div>
  );
}
