// import { useState } from "react";
// import { Calendar, momentLocalizer, Event } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);

// const MyBigCalendar = () => {
//   const [events, setEvents] = useState<Event[]>([
//     { title: "Meeting", start: new Date(), end: new Date(), allDay: false },
//   ]);

//   const addEvent = () => {
//     const newEvent: Event = {
//       title: "New Event",
//       start: new Date(), // Change this to the desired start date
//       end: new Date(new Date().getTime() + 60 * 60 * 1000), // Adds 1 hour to start time
//       allDay: false,
//     };

//     setEvents([...events, newEvent]); // Updates state with a new event
//   };

//   return (
//     <div style={{ height: 500 }}>
//       <h2>Event Calendar</h2>
//       <button onClick={addEvent} style={{ marginBottom: "10px" }}>Add Event</button>
//       <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" />
//     </div>
//   );
// };

// export default MyBigCalendar;
