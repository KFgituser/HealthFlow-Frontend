//use dummy doctor data
       
const dummyDoctors = [
        {
            id: 1,
            name: "John Doe",
            specialty: "Dermatology",
            rating: 4.5,
            reviewCount: 56,
            distance: 1.3,
            availability: [
            { date: "Mon, Jul 22", slots: 2 },
            { date: "Tue, Jul 23", slots: 0 },
            { date: "Wed, Jul 24", slots: 3 },
            { date: "Thu, Jul 25", slots: 0 },
            { date: "Fri, Jul 26", slots: 2 },
            { date: "Sat, Jul 27", slots: 0 },
            { date: "Sun, Jul 28", slots: 2 },
            { date: "Mon, Jul 29", slots: 3 },
            { date: "Tue, Jul 30", slots: 1 },
            { date: "Wed, Jul 31", slots: 0 },
            { date: "Thu, Aug 1", slots: 0 },
            { date: "Fri, Aug 2", slots: 5 },
            ],
            imageUrl: "/images/doctors/john.png"
        },

        {
            id: 2,
            name: "Alice Smith",
            specialty: "Cardiology",
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
        rating: 4.9,
        reviewCount: 150,
        distance: 0.8,
        availability: [
            { date: "Mon, Jul 22", slots: 3 },
            { date: "Tue, Jul 23", slots: 2 },
            { date: "Wed, Jul 24", slots: 1 },
            { date: "Thu, Jul 25", slots: 0 },
            { date: "Fri, Jul 26", slots: 4 },
            { date: "Sat, Jul 27", slots: 0 },
            { date: "Sun, Jul 28", slots: 0 },
            { date: "Mon, Jul 29", slots: 3 },
            { date: "Tue, Jul 30", slots: 1 },
            { date: "Wed, Jul 31", slots: 0 },
            { date: "Thu, Aug 1", slots: 2 },
            { date: "Fri, Aug 2", slots: 5 },
        ],
        imageUrl: "/images/doctors/sarah.png"
        },
        {
        id: 5,
        name: "David Kim",
        specialty: "Orthopedics",
        rating: 4.0,
        reviewCount: 34,
        distance: 4.1,
        availability: [
            { date: "Mon, Jul 22", slots: 0 },
            { date: "Tue, Jul 23", slots: 0 },
            { date: "Wed, Jul 24", slots: 0 },
            { date: "Thu, Jul 25", slots: 0 },
            { date: "Fri, Jul 26", slots: 2 },
            { date: "Sat, Jul 27", slots: 0 },
            { date: "Sun, Jul 28", slots: 2 },
            { date: "Mon, Jul 29", slots: 3 },
            { date: "Tue, Jul 30", slots: 0 },
            { date: "Wed, Jul 31", slots: 2 },
            { date: "Thu, Aug 1", slots: 4 },
            { date: "Fri, Aug 2", slots: 0 },
        ],
        imageUrl: "/images/doctors/kim.png"
        }
        ];

        export default dummyDoctors;