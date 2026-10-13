/*
 * Shunaya: all site content and business config in one place.
 *
 * Edit text, prices, dates, seats, testimonials, FAQ etc. here; both pages
 * (index.html and bir.html) read from this file.
 *
 * `tbc` marks anything not yet confirmed by the client. With ?review=1 in the
 * URL, every element tied to a `tbc` note gets a yellow highlight and a "TBC"
 * tag. Delete the `tbc` entry once the client confirms the item.
 *   - tbc: 'note'                → flags the whole item
 *   - tbc: { field: 'note', … }  → flags individual fields of the item
 */
window.SHUNAYA = {
  /* ------------------------------------------------------------------ */
  /* Business details                                                    */
  /* ------------------------------------------------------------------ */
  config: {
    siteName: 'Shunaya',
    legalName: 'Shunaya Retreats',
    whatsappNumber: '919131744426',            // digits only, with country code; used for wa.me links
    whatsappDisplay: '+91 91317 44426',
    contactEmail: 'theshunayaretreats@gmail.com', // public email shown in the footer (from the current site)
    notificationEmail: 'hello@theshunaya.in',    // where booking notifications should go (placeholder)
    instagramUrl: 'https://www.instagram.com/theshunayaretreats',
    instagramHandle: '@theshunayaretreats',
    metaPixelId: '',      // e.g. '1234567890'. Leave empty to disable the Meta Pixel.
    formEndpoint: '',     // e.g. a Formspree / Make / n8n webhook URL. Empty = log the payload to the console.
    tbc: {
      whatsappNumber: 'Assumed booking number. Alternatives: 88508 72404 (on current sites), 99673 60597.',
      notificationEmail: 'Placeholder address. Confirm where booking notifications should go.',
      formEndpoint: 'No form endpoint yet; submissions are only logged and handed to WhatsApp.'
    }
  },

  /* ------------------------------------------------------------------ */
  /* The upcoming retreat (every Reserve / Book button points here)      */
  /* ------------------------------------------------------------------ */
  upcoming: {
    id: 'bir-2',
    name: 'Bir 2.0',
    place: 'Bir Billing, Himachal Pradesh',
    region: 'Sacred Valley',
    startDate: '2026-12-24',
    endDate: '2026-12-27',
    timezone: 'Asia/Kolkata',
    countdownTo: '2026-12-24T00:00:00+05:30',  // countdown target (start of day 1, IST)
    days: 4,
    nights: 3,
    seatsTotal: 15,
    seatsLeft: 15,                              // update as seats sell; drives every seat count on the site
    maxSeatsPerBooking: 4,                      // the booking form's "Seats" dropdown goes up to this (or seatsLeft)
    promise: 'Detox and detach: a retreat that nourishes your mind, body and soul. Yoga with art.',
    heroImage: 'assets/img/bir-2025-group-with-paintings.webp',
    heroImageSm: 'assets/img/bir-2025-group-with-paintings-sm.webp',
    heroImageAlt: 'Guests at Shunaya’s Bir retreat in December 2025, holding the paintings they made',
    rooms: [
      { id: 'triple', name: 'Triple sharing', price: 27399, note: 'Share a room with two other guests' },
      { id: 'dual', name: 'Dual sharing', price: 33599, note: 'Share a room with one other guest' }
    ],
    bookingAmount: 12000,
    included: [
      '3 nights at Mandala Sanctuary',
      'Satvik meals',
      'All yoga, art and meditation sessions',
      'Shunaya goodie kit',
      'Trek to the Mata Maheshwari temple'
    ],
    notIncluded: [
      'Travel to and from Bir',
      'Paragliding flights'
    ],
    tbc: {
      heroImage: 'Photo is from Bir 2025 (a group shot). Ask the client for a Bir landscape photo.',
      countdownTo: 'Countdown runs to 00:00 IST on 24 Dec. Update once check-in time is fixed.'
    }
  },

  /* ------------------------------------------------------------------ */
  /* Homepage: What we do                                                */
  /* ------------------------------------------------------------------ */
  about: {
    partners: ['Avinash Kaur', 'Rhythm S.', 'Partner name'],
    tbc: {
      partners: 'Name of the third partner is unknown.',
      paragraph: 'Draft: reworded from the site’s “Our story” copy to introduce the partners.'
    },
    note: {
      title: 'Everything begins at *zero.*',
      body: 'Shunaya was inspired by the idea of Shunya, the state of beginning with nothing, not because nothing exists, but because everything becomes possible from there. Every retreat is an invitation to begin again. From zero.',
      signature: 'Shunaya (0)'
    }
  },

  pillars: [
    {
      id: 'yoga',
      number: '01',
      name: 'Yoga',
      image: 'assets/img/pillar-yoga-sm.webp',
      imageAlt: 'Guests doing yoga on mats outside a heritage house',
      lead: 'Yoga at Shunaya is about building a stronger relationship with yourself, not achieving the perfect pose.',
      experience: 'We offer guided yoga sessions suitable for all experience levels, along with breathing techniques, meditation, and reflective practices that encourage both physical and mental wellbeing.'
    },
    {
      id: 'art',
      number: '02',
      name: 'Art',
      image: 'assets/img/pillar-art-sm.webp',
      imageAlt: 'Guests drawing together during an art session',
      lead: 'Creativity allows us to slow down, observe, and express ourselves without pressure.',
      experience: 'Painting, journaling, storytelling, pottery, and collaborative creative sessions led by artists who encourage curiosity instead of perfection.'
    },
    {
      id: 'nature',
      number: '03',
      name: 'Nature',
      image: 'assets/img/pillar-nature-sm.webp',
      imageAlt: 'A sunlit forest trail in the Himalayas',
      lead: 'Some of our most meaningful conversations happen outdoors.',
      experience: 'Nature walks, mindful hikes, outdoor yoga, forest experiences, and quiet moments designed to help you appreciate the simple things that often go unnoticed.'
    }
  ],

  /* ------------------------------------------------------------------ */
  /* Past retreats ("Where we've been"). No booking from these.          */
  /* ------------------------------------------------------------------ */
  pastRetreats: [
    {
      id: 'tosh',
      name: 'Tosh',
      region: 'Himalayas',
      place: 'Tosh, Himachal Pradesh',
      startDate: '2025-10-09',
      endDate: '2025-10-12',
      length: '4 days · 3 nights',
      description: 'The original mountain retreat. Snow-capped peaks, bonfire nights, and the kind of silence that speaks louder than words.',
      cardImage: 'assets/img/tosh-dusk-fairy-lights-sm.webp',
      gallery: [
        ['assets/img/tosh-dusk-fairy-lights', 'Mountains at dusk under string lights'],
        ['assets/img/tosh-group-with-paintings', 'The Tosh group holding their paintings'],
        ['assets/img/tosh-waterfall-group', 'Guests resting on a mountain trail'],
        ['assets/img/tosh-snow-peaks-flowers', 'Snow peaks above Tosh'],
        ['assets/img/tosh-group-photo', 'The whole group together']
      ],
      itinerary: [
        ['Day 1', 'Arrival in snow-dusted Tosh, warm welcome ginger tea, grounding stretch.'],
        ['Day 2', 'Snow trek to Kutla, high-altitude breathing exercises, bonfire chats.'],
        ['Day 3', 'Mindful walk, clay workshop, evening silent meditation.'],
        ['Day 4', 'Intuitive drawing, hot spring visit in Manikaran, dinner circle.']
      ],
      tbc: { dates: 'Dates taken from the old site’s calendar (9–12 Oct 2025). Confirm.' }
    },
    {
      id: 'bir-2025',
      name: 'Bir 2025',
      region: 'Sacred Valley',
      place: 'Bir, Himachal Pradesh',
      startDate: '2025-12-19',
      endDate: '2025-12-22',
      length: '4 days · 3 nights',
      description: 'Where stillness becomes sacred. A home for the wandering soul in the paragliding capital surrounded by Buddhist monasteries.',
      cardImage: 'assets/img/bir-2025-group-yoga-hall-sm.webp',
      gallery: [
        ['assets/img/bir-2025-group-yoga-hall', 'The Bir 2025 group with their yoga mats'],
        ['assets/img/bir-2025-art-session-1', 'An art session in progress'],
        ['assets/img/bir-2025-art-session-2', 'Painting close-up'],
        ['assets/img/bir-2025-group-with-paintings', 'Guests holding the paintings they made'],
        ['assets/img/bir-2025-art-session-3', 'Painting around the table'],
        ['assets/img/bir-2025-night-exterior', 'The stay at night']
      ],
      itinerary: [
        ['Day 1', 'Arrive in Bir, meet and greet, settle in, evening candlelit restorative yoga.'],
        ['Day 2', 'Morning yoga, walk around Sherab Ling monastery, clay pottery class.'],
        ['Day 3', 'Sunrise flow, paragliding landing site walk, evening journaling.'],
        ['Day 4', 'Comic and storytelling art session, forest walk, hot chai circle.']
      ]
    },
    {
      id: 'goa',
      name: 'Goa',
      region: 'Coastal',
      place: 'South Goa',
      startDate: '2026-10-02',
      endDate: '2026-10-04',
      length: '3 days · 2 nights',
      description: 'The coastal soul of Shunaya. A journey through ocean tides, creative expression, and the warm embrace of community.',
      cardImage: 'assets/img/goa-beach-group-sm.webp',
      gallery: [
        ['assets/img/goa-beach-group', 'Guests on the beach at sunset'],
        ['assets/img/goa-group-yoga-lounge', 'Group yoga in the lounge'],
        ['assets/img/goa-painting', 'A guest painting'],
        ['assets/img/goa-art-supplies', 'Paints and canvases laid out for a session'],
        ['assets/img/goa-library-lounge', 'Guests relaxing in the library lounge'],
        ['assets/img/goa-group-yoga-lounge-2', 'Yoga in the lounge']
      ],
      itinerary: [
        ['Day 1', 'Arrival at the wellness resort, evening sunset circle on the beach.'],
        ['Day 2', 'Vinyasa flow, watercolour workshop, evening beach sound meditation.'],
        ['Day 3', 'Hatha yoga, excursion to a hidden waterfall in Netravali, picnic lunch.']
      ],
      tbc: {
        length: 'Derived from the 2–4 Oct dates.',
        itinerary: 'From the old site’s 4-day Goa listing (dated 12–15 Feb 2026); day 4 dropped to fit 3 days. Confirm.',
        gallery: 'Photos are from the old site’s Goa gallery, which predates the Oct retreat. Client to supply Oct 2026 photos.'
      }
    },
    {
      id: 'tosh-2',
      name: 'Tosh 2.0',
      region: 'Himalayas',
      place: 'Tosh, Himachal Pradesh',
      startDate: '2026-05-20',
      endDate: '2026-05-24',
      length: '5 days · 4 nights',
      description: 'Where silence meets the mountains. A deeper journey into the Himalayan stillness with extended meditation and nature immersion.',
      cardImage: 'assets/img/tosh-milky-way-sm.webp',
      gallery: [
        ['assets/img/tosh-milky-way', 'The Milky Way over Tosh'],
        ['assets/img/tosh-sun-valley', 'A guest taking in the valley'],
        ['assets/img/tosh-guest-with-painting', 'A guest with her painting among wildflowers'],
        ['assets/img/tosh-cafe-painting', 'Painting in a mountain café'],
        ['assets/img/tosh-snow-peaks', 'Snow peaks under a blue sky']
      ],
      itinerary: [
        ['Day 1', 'Arrival, orientation circle, welcome yin yoga under the mountain sky.'],
        ['Day 2', 'Sunrise pranayama, mindful hike to local waterfalls, intuitive art session.'],
        ['Day 3', 'Morning vinyasa, forest bathing in the cedar forests, evening silent meditation.'],
        ['Day 4', 'Journaling, mixed-media art session, bonfire stories.'],
        ['Day 5', 'Hike to Kutla village, high-altitude yoga, connection circle.']
      ]
    }
  ],

  /* ------------------------------------------------------------------ */
  /* Testimonials (real quotes from the current site; do not invent)     */
  /* ------------------------------------------------------------------ */
  testimonials: [
    {
      name: 'Ashwini Nagesh',
      retreat: 'Shunaya retreat',
      quote: 'Came here as strangers, leaving with a family I didn’t know I needed. This retreat gave me memories, laughter, and connections I’ll always cherish. Huge gratitude to Rhythm and Avinash for hosting something so beautiful and meaningful.',
      tbc: { retreat: 'Source only says “Retreat Guest”. Which retreat?' }
    },
    {
      name: 'smriee_',
      retreat: 'Tosh',
      quote: 'Last winter, I took a leap and went on a crazy trip with a bunch of strangers… who somehow don’t feel like strangers anymore <3\n\nTo a little Himalayan town called Tosh, a place that felt closer to heaven than earth. My first ‘not-so-solo but still solo’ trip, and hands down one of the most thrilling, soul-stirring experiences of my life.\n\nForever grateful for moments like these.'
    },
    {
      name: 'Sneha',
      retreat: 'Goa',
      quote: 'The Goa fever is not going away soon for sure! 🫶 😇 Thank you Rhythm & Avinash for being such loving and fun hosts, I believe that’s how we all connected with each other so beautifully 🌷 💙'
    },
    {
      name: 'Sambhav K.',
      retreat: 'Shunaya retreat',
      quote: 'This trip ended up being quite an adventure for me! Thank you for being such lovely hosts, Rhythm and Avinash 💕 Met some wonderful people there. Hope to see you guys again soon! 🤗',
      tbc: { retreat: 'Source only says “Retreat Guest”. Which retreat?' }
    },
    {
      name: 'Diksha Thakur',
      retreat: 'Shunaya retreat',
      quote: 'Hey Rhythm! Just wanted to say what an amazing trip it was. Everything from the vibe to the planning was spot on. After watching my Ig stories, so many people have been asking about the trip and are dying to join you next time! Whatever vibe criteria you used to select the group clearly worked. It was the perfect mix of people and energy.',
      tbc: { retreat: 'Source only says “Retreat Guest”. Which retreat?' }
    }
  ],

  // YouTube videos for the inline player. Nothing loads from YouTube until a
  // visitor presses play. The first video is the one shown in the big player.
  // poster: local still (1280px where YouTube has one); thumb: small playlist image
  videos: [
    { id: 'Fe0BG2o8ZzM', title: 'Words by our participants', poster: 'assets/img/yt-Fe0BG2o8ZzM-lg.webp', thumb: 'assets/img/yt-Fe0BG2o8ZzM.webp' },
    { id: 'zfC67Sj3Iqc', title: 'Feel the retreat', poster: 'assets/img/yt-zfC67Sj3Iqc.webp', thumb: 'assets/img/yt-zfC67Sj3Iqc.webp' },
    { id: 'e2egKhC3ttM', title: 'More words from our participants', poster: 'assets/img/yt-e2egKhC3ttM-lg.webp', thumb: 'assets/img/yt-e2egKhC3ttM.webp' }
  ],

  instagramPost: {
    url: '',  // paste the Instagram post URL to embed
    tbc: 'Placeholder. Pick one Instagram post to embed.'
  },

  /* ------------------------------------------------------------------ */
  /* Brands we've worked with                                            */
  /* ------------------------------------------------------------------ */
  brands: [
    // height: display height in px (logos have different shapes)
    { name: 'Wise Life', logo: 'assets/img/brand-wiselife.png', height: 32 },
    { name: 'Boldfit', logo: 'assets/img/brand-boldfit.png', height: 26 },
    { name: 'Scarlet Blinks', logo: 'assets/img/brand-scarlet-blinks.png', height: 60 },
    { name: 'Brand logo', logo: '', tbc: 'Placeholder slot. Client to supply logo.' },
    { name: 'Brand logo', logo: '', tbc: 'Placeholder slot. Client to supply logo.' },
    { name: 'Brand logo', logo: '', tbc: 'Placeholder slot. Client to supply logo.' }
  ],

  /* ------------------------------------------------------------------ */
  /* Bir 2.0 landing page (bir.html)                                     */
  /* ------------------------------------------------------------------ */
  bir: {
    experiences: [
      {
        name: 'Yoga',
        image: 'assets/img/bir-2025-group-yoga-hall-sm.webp',
        imageAlt: 'The Bir 2025 group with their yoga mats',
        text: 'Daily yoga with breathwork and meditation, plus tratak (candle-gazing) to settle a busy mind. Suitable for all experience levels.'
      },
      {
        name: 'Art',
        image: 'assets/img/bir-2025-art-session-1-sm.webp',
        imageAlt: 'An art session at Bir 2025',
        text: 'Art therapy sessions led by artists who encourage curiosity instead of perfection. No experience needed, just a willingness to play.'
      },
      {
        name: 'Nature',
        image: '',
        imageAlt: '',
        text: 'A trek to the Mata Maheshwari temple, a bonfire under the winter sky and a night of stargazing in the mountains.',
        tbc: { image: 'No Bir nature photo yet. Client to supply.' }
      }
    ],
    experiencesTbc: 'Copy drafted from the activities named on the client call.',

    itinerary: [
      {
        day: 'Day 1',
        date: 'Thu 24 Dec',
        title: 'Arrive and settle in',
        items: ['Check in at Mandala Sanctuary', 'Welcome circle', 'Gentle evening yoga', 'Satvik dinner']
      },
      {
        day: 'Day 2',
        date: 'Fri 25 Dec',
        title: 'Into the mountains',
        items: ['Morning yoga', 'Trek to the Mata Maheshwari temple', 'Art therapy session', 'Stargazing after dinner']
      },
      {
        day: 'Day 3',
        date: 'Sat 26 Dec',
        title: 'Stillness and colour',
        items: ['Sunrise yoga', 'Tratak (candle-gazing) meditation', 'Art therapy session', 'Bonfire night']
      },
      {
        day: 'Day 4',
        date: 'Sun 27 Dec',
        title: 'Begin again',
        items: ['Morning yoga', 'Closing circle over breakfast', 'Goodbyes and departures']
      }
    ],
    itineraryTbc: 'Draft built from the activities named on the call. The official Bir deck has the real day-by-day; replace with that.',

    hosts: [
      {
        name: 'Avinash Kaur',
        handle: 'An Art Child',
        role: 'Yoga practitioner & story artist',
        photo: 'assets/img/host-avinash-kaur-sm.webp',
        tbc: { name: 'Spelling: site says “Kaur”, her cal.com link says “kour”.' }
      },
      {
        name: 'Rhythm S.',
        handle: '',
        role: 'Storyboard & comic artist',
        photo: 'assets/img/host-rhythm-s.webp',
        tbc: { photo: 'Only a small (745px) photo exists. A larger one would help.' }
      }
    ],

    stay: {
      name: 'Mandala Sanctuary',
      kind: 'A mud-house resort in Bir',
      text: 'Mud walls, slow mornings and mountain air: a quiet base for four days of practice, art and rest.',
      photos: ['', '', ''],
      tbc: {
        text: 'Draft description.',
        photos: 'No photos of Mandala Sanctuary yet. Client to supply 4–6.'
      }
    },

    faq: [
      {
        q: 'How cold is Bir in late December, and what should I pack?',
        a: 'Expect crisp, often sunny days and cold nights that can drop close to freezing. Pack warm layers: thermals, a heavy jacket, woollen socks, a beanie and gloves. Add comfortable clothes for yoga, good walking shoes for the temple trek, a water bottle and any medication you need.'
      },
      {
        q: 'How do I get to Bir?',
        a: 'The easiest way from Delhi is an overnight Volvo bus to Bir (around 12 hours). If you prefer to fly, the nearest airport is Gaggal (Kangra), about two hours from Bir by road. Travel to Bir isn’t included in the price.'
      },
      {
        q: 'Can I come on my own?',
        a: 'Absolutely. Groups are small (15 seats), and many guests arrive as strangers. As one of them put it: “Came here as strangers, leaving with a family I didn’t know I needed.”'
      },
      {
        q: 'I’m a beginner. Is that OK?',
        a: 'Yes. Our yoga sessions are suitable for all experience levels, and the art sessions are designed for everyone, whether you’re an experienced artist or trying something new for the first time.'
      },
      {
        q: 'How does payment work?',
        a: '₹12,000 reserves your seat. The balance is due before the retreat; we’ll share the exact date and payment details on WhatsApp once you reserve.',
        tbc: 'Balance due date and payment method to be confirmed.'
      },
      {
        q: 'What is the cancellation policy?',
        a: 'Our cancellation policy will be listed here. Until then, message us on WhatsApp and we’ll walk you through it.',
        tbc: 'Cancellation policy to be supplied by the client.'
      },
      {
        q: 'What time is check-in, and is there a pickup?',
        a: 'Check-in is on 24 December; we’ll share the exact time and pickup details on WhatsApp before you travel.',
        tbc: 'Check-in time and pickup point/cost to be confirmed.'
      }
    ]
  }
};
