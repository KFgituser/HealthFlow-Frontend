// use dummy doctor data

const fullTimeSlots = [
  "09:30", "10:00", "10:30", "11:00",
  "13:00", "13:30", "14:00", "15:00",
  "15:30", "16:00"
];

function fillMissingSlots(times) {
  const timeMap = Object.fromEntries(times.map(t => [t.time, t.available]));
  return fullTimeSlots.map(t => ({
    time: t,
    available: timeMap[t] ?? false
  }));
}

const dummyDoctors = [
  {
    id: 1,
    name: "John Doe",
    specialty: "Dermatology",
    city: "Dublin",
    rating: 4.5,
    reviewCount: 56,
    distance: 1.3,
    availability: [
      {
        date: "Mon, Jul 22",
        slots: 2,
        times: fillMissingSlots([
          { time: "09:30", available: false },
          { time: "10:00", available: true },
          { time: "11:00", available: false },
          { time: "13:30", available: true }
        ])
      },
      {
        date: "Tue, Jul 23",
        slots: 0,
        times: fillMissingSlots([
          { time: "09:30", available: false },
          { time: "10:00", available: false },
          { time: "11:00", available: false },
          { time: "13:30", available: false }
        ])
      },
      {
        date: "Wed, Jul 24",
        slots: 3,
        times: fillMissingSlots([
          { time: "09:30", available: true },
          { time: "10:00", available: false },
          { time: "11:00", available: true },
          { time: "13:30", available: true }
        ])
      },
      {
        date: "Thu, Jul 25",
        slots: 0,
        times: fillMissingSlots([])
      },
      {
        date: "Fri, Jul 26",
        slots: 2,
        times: fillMissingSlots([
          { time: "11:00", available: true },
          { time: "13:00", available: true },
          { time: "15:00", available: false }
        ])
      },
      {
        date: "Sat, Jul 27",
        slots: 0,
        times: fillMissingSlots([])
      },
      {
        date: "Sun, Jul 28",
        slots: 2,
        times: fillMissingSlots([
          { time: "10:00", available: true },
          { time: "10:30", available: true },
          { time: "11:00", available: false }
        ])
      },
      {
        date: "Mon, Jul 29",
        slots: 3,
        times: fillMissingSlots([
          { time: "09:30", available: true },
          { time: "10:00", available: true },
          { time: "11:00", available: true },
          { time: "13:00", available: false }
        ])
      },
      {
        date: "Tue, Jul 30",
        slots: 1,
        times: fillMissingSlots([
          { time: "15:00", available: true },
          { time: "16:00", available: false }
        ])
      },
      {
        date: "Wed, Jul 31",
        slots: 0,
        times: fillMissingSlots([])
      },
      {
        date: "Thu, Aug 1",
        slots: 0,
        times: fillMissingSlots([])
      },
      {
        date: "Fri, Aug 2",
        slots: 5,
        times: fillMissingSlots([
          { time: "09:30", available: true },
          { time: "10:00", available: true },
          { time: "11:00", available: true },
          { time: "13:00", available: true },
          { time: "15:00", available: true }
        ])
      }
    ],
    imageUrl: "/images/doctors/john.png"
  },
    {
    id: 2,
    name: "Alice Smith",
    specialty: "Cardiology",
    city: "Dublin",
    rating: 4.8,
    reviewCount: 67,
    distance: 2.0,
    availability: [],
    nextAvailable: "Mon, Aug 4",
    imageUrl: "/images/doctors/alice.png"
  },
  {
    id: 3,
    name: "David Tan",
    specialty: "Orthopedics",
    city: "Cork",
    rating: 4.6,
    reviewCount: 37,
    distance: 2.7,
    availability: [],
    nextAvailable: "Thu, Aug 7",
    imageUrl: "/images/doctors/david.png"
  },
 {
    id: 4,
    name: "Sarah Johnson",
    specialty: "Pediatrics",
    city: "Dublin",
    rating: 4.9,
    reviewCount: 150,
    distance: 0.8,
    availability: [
      {
        date: "Mon, Jul 22",
        slots: 2,
        times: fillMissingSlots([
          { time: "09:30", available: true },
      { time: "10:00", available: true },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Tue, Jul 23",
        slots: 2,
         times: fillMissingSlots([
          { time: "09:30", available: true },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: true },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Wed, Jul 24",
        slots: 1,
        times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: true },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Thu, Jul 25",
        slots: 0,
       times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
       ])
      },
      {
        date: "Fri, Jul 26",
        slots: 4,
         times: fillMissingSlots([
          { time: "09:30", available: true },
      { time: "10:00", available: true },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: true },
      { time: "14:00", available: false },
      { time: "15:00", available: true },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Sat, Jul 27",
        slots: 0,
        times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Sun, Jul 28",
        slots: 0,
        times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
         ])
      },
      {
        date: "Mon, Jul 29",
        slots: 3,
        times: fillMissingSlots([
          { time: "09:30", available: true },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: true },
      { time: "13:00", available: false },
      { time: "13:30", available: true },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Tue, Jul 30",
        slots: 1,
        times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: true },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Wed, Jul 31",
        slots: 0,
        times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Thu, Aug 1",
        slots: 2,
         times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: true },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: true },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
       ])
      },
      {
        date: "Fri, Aug 2",
        slots: 5,
        times: fillMissingSlots([
          { time: "09:30", available: true },
      { time: "10:00", available: true },
      { time: "10:30", available: false },
      { time: "11:00", available: true },
      { time: "13:00", available: true },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: true },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
       ])
      }
    ],
    imageUrl: "/images/doctors/sarah.png"
},
  {
    id: 5,
    name: "David Kim",
    specialty: "Orthopedics",
    city: "Limerick",
    rating: 4.0,
    reviewCount: 34,
    distance: 4.1,
    availability: [
      {
        date: "Mon, Jul 22",
        slots: 0,
        times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Tue, Jul 23",
        slots: 0,
         times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Wed, Jul 24",
        slots: 0,
         times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
         ])
      },
      {
        date: "Thu, Jul 25",
        slots: 0,
         times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Fri, Jul 26",
        slots: 2,
         times: fillMissingSlots([
          { time: "09:30", available: true },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: true },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
         ])
      },
      {
        date: "Sat, Jul 27",
        slots: 0,
        times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Sun, Jul 28",
        slots: 2,
       times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: true },
      { time: "10:30", available: false },
      { time: "11:00", available: true },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
       ])
      },
      {
        date: "Mon, Jul 29",
        slots: 3,
        times: fillMissingSlots([
          { time: "09:30", available: true },
      { time: "10:00", available: true },
      { time: "10:30", available: false },
      { time: "11:00", available: true },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
         ])
      },
      {
        date: "Tue, Jul 30",
        slots: 0,
        times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      },
      {
        date: "Wed, Jul 31",
        slots: 2,
         times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: true },
      { time: "14:00", available: false },
      { time: "15:00", available: true },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
       ])
      },
      {
        date: "Thu, Aug 1",
        slots: 4,
         times: fillMissingSlots([
          { time: "09:30", available: true },
      { time: "10:00", available: true },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: true },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: true },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
         ])
      },
      {
        date: "Fri, Aug 2",
        slots: 0,
        times: fillMissingSlots([
          { time: "09:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: false },
      { time: "11:00", available: false },
      { time: "13:00", available: false },
      { time: "13:30", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
      { time: "15:30", available: false },
      { time: "16:00", available: false }
        ])
      }
    ],
    imageUrl: "/images/doctors/kim.png"
}
];
        export default dummyDoctors;