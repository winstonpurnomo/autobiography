"use client";

export function Footer() {
  const today = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

  return (
    <footer className="py-8 text-center text-gray-500 text-sm dark:text-gray-400">
      Today is {formattedDate}. I hope you&apos;re having a lovely day.
    </footer>
  );
}
