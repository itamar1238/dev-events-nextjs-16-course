export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "Google I/O 2026",
    image: "/images/event1.png",
    slug: "google-io-2026",
    location: "Mountain View, CA",
    date: "May 14-15, 2026",
    time: "9:00 AM - 6:00 PM PDT",
  },
  {
    title: "React Summit 2026",
    image: "/images/event2.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands",
    date: "June 12-13, 2026",
    time: "10:00 AM - 7:00 PM CEST",
  },
  {
    title: "AWS re:Invent 2026",
    image: "/images/event3.png",
    slug: "aws-reinvent-2026",
    location: "Las Vegas, NV",
    date: "November 30 - December 4, 2026",
    time: "8:00 AM - 8:00 PM PST",
  },
  {
    title: "GitHub Universe 2026",
    image: "/images/event4.png",
    slug: "github-universe-2026",
    location: "San Francisco, CA",
    date: "October 28-29, 2026",
    time: "9:00 AM - 5:00 PM PDT",
  },
  {
    title: "PyCon US 2026",
    image: "/images/event5.png",
    slug: "pycon-us-2026",
    location: "Pittsburgh, PA",
    date: "May 27-30, 2026",
    time: "9:00 AM - 6:00 PM EDT",
  },
  {
    title: "Tech Crunch Disrupt 2026",
    image: "/images/event6.png",
    slug: "techcrunch-disrupt-2026",
    location: "San Francisco, CA",
    date: "September 21-23, 2026",
    time: "9:00 AM - 7:00 PM PDT",
  },
];
