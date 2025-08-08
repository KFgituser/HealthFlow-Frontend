// use dummy doctor data

export const fullTimeSlots = [
  "09:30", "10:00", "10:30", "11:00",
  "13:00", "13:30", "14:00", "15:00",
  "15:30", "16:00"
];

export function fillMissingSlots(times) {
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
      location: { lat: 53.3489, lng:-6.266277 },
      availability: [
        {
          date: "Mon, Jul 22",
          slots: 3,
          times: fillMissingSlots([
            { time: "09:30", available: false },
            { time: "10:00", available: true },
            { time: "11:00", available: false },
            { time: "13:30", available: true },
            { time: "14:00", available: false },
            { time: "15:00", available: true  }
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
      location: { lat: 53.3462, lng: -6.2411 },
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
      distance: 220.7,
      location: { lat: 51.8985, lng: -8.4756 },
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
      location: { lat: 53.3561, lng: -6.23888 },
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
        distance: 175.77,
        location: { lat: 52.688, lng: -8.6305 },
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
    },
    {
      id: 6,
      name: "Emma Wilson",
      specialty: "Neurology",
      city: "Galway",
      rating: 4.7,
      reviewCount: 58,
      distance: 187.12,
      location: { lat: 53.2707, lng: -9.0568 },
      availability: [],
      nextAvailable: "Fri, Aug 2",
      imageUrl: "/images/doctors/emma.png"
    },
    {
      id: 7,
      name: "Liam Murphy",
      specialty: "General Practice",
      city: "Dublin",
      rating: 4.4,
      reviewCount: 45,
      distance: 1.5,
      location: { lat: 53.3624, lng: -6.2351 },
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
      imageUrl: "/images/doctors/liam.png"
    },
    {
      id: 8,
      name: "Olivia Byrne",
      specialty: "Gastroenterology",
      city: "Cork",
      rating: 4.6,
      reviewCount: 72,
      distance: 220.7,
       location: { lat: 51.8985, lng: -8.4756 },
      availability: [],
      nextAvailable: "Tue, Aug 6",
      imageUrl: "/images/doctors/olivia.png"
    },
    {
      id: 9,
      name: "Noah Kelly",
      specialty: "ENT",
      city: "Limerick",
      rating: 4.2,
      reviewCount: 39,
      distance: 176.75,
      location: { lat: 52.668, lng: -8.6305 },
      availability: [],
      nextAvailable: "Wed, Aug 7",
      imageUrl: "/images/doctors/noah.png"
    },
    {
      id: 10,
      name: "Ava O'Sullivan",
      specialty: "Psychiatry",
      city: "Waterford",
      rating: 4.9,
      reviewCount: 88,
      distance: 134.44,
       location: { lat: 52.2593, lng: -7.1101 },
      availability: [],
      nextAvailable: "Thu, Aug 8",
      imageUrl: "/images/doctors/ava.png"
    }
];
        export default dummyDoctors;
        