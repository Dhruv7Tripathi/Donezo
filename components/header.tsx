"use client";

import React, { useEffect, useState } from 'react';
// import DarkModeToggle from '../component/ui/darkmode';
const Header: React.FC = () => {
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <>
      {/* <DarkModeToggle /> */}
      {/* <Header /> */}


      <header className="flex justify-between items-center p-4 bg-blue-100">
        {/* <img src="/logo.jpg" alt="Hospital Logo" className="h-24" /> */}
        <h1 className="text-black text-3xl font-semibold">System</h1>
        <div className="text-black text-xl italic">{greeting}</div>
      </header>


    </>
  );
};

export default Header;
