import TimeTableClient from "./TimeTableClient";

export const metadata = {
  title: "Timetable – KMG Shuttles Schedule Overview",
  description:
    "Check the complete schedule of KMG shuttle lines including Sea Line, Culture Line, and Sun Line. Plan your Saranda trips with ease.",
  openGraph: {
    title: "Shuttle Timetable | KMG Shuttles",
    description: "Real-time departure and arrival schedule for Saranda shuttle lines.",
    url: "https://kmgshuttles.al/time_table",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TimeTablePage() {
  return <TimeTableClient />;
}
