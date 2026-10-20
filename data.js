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
    whatsappNumber: '918850872404',            // digits only, with country code; used for wa.me links
    whatsappDisplay: '+91 88508 72404',
    contactEmail: 'theshunayaretreats@gmail.com', // public email shown in the footer (from the current site)
    notificationEmail: 'hello@theshunaya.in',    // where booking notifications should go (placeholder)
    instagramUrl: 'https://www.instagram.com/theshunayaretreats',
    instagramHandle: '@theshunayaretreats',
    metaPixelId: '',      // e.g. '1234567890'. Leave empty to disable the Meta Pixel.
    formEndpoint: '',     // e.g. a Formspree / Make / n8n webhook URL. Empty = log the payload to the console.
    tbc: {
      notificationEmail: 'Placeholder address. Confirm where booking notifications should go.',
      formEndpoint: 'No form endpoint yet; submissions are only logged and handed to WhatsApp.'
    }
  },

  /* ------------------------------------------------------------------ */
  /* The upcoming retreat (every Reserve / Book button points here)      */
  /* ------------------------------------------------------------------ */
  upcoming: {
    id: 'bir-2',
    name: 'The Undoing',
    ensoLetter: 'o',                            // this letter of the name is drawn as a brushed ensō in the hero
    placeShort: 'Bir',
    place: 'Bir Billing, Himachal Pradesh',
    region: 'Sacred Valley',
    startDate: '2026-12-24',
    endDate: '2026-12-27',
    timezone: 'Asia/Kolkata',
    countdownTo: '2026-12-24T00:00:00+05:30',  // countdown target (start of day 1, IST)
    days: 4,
    nights: 3,
    seatsTotal: 18,
    seatsLeft: 18,                              // update as seats sell; drives every seat count on the site
    maxSeatsPerBooking: 4,                      // the booking form's "Seats" dropdown goes up to this (or seatsLeft)
    promise: 'Detox and detach: a retreat that nourishes your mind, body and soul. Yoga with art.',
    // Hero photo: chosen from the client's "Hero page image options" (5 more in source-raw/drive)
    heroImage: 'assets/img/gallery/hero/meditation-apple-orchard.webp',
    heroImageSm: 'assets/img/gallery/hero/meditation-apple-orchard-sm.webp',
    heroImageAlt: 'Guests meditating on mats in a sunlit apple orchard at a Shunaya retreat',
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
      countdownTo: 'Countdown runs to 00:00 IST on 24 Dec. Update once check-in time is fixed.'
    }
  },

  /* ------------------------------------------------------------------ */
  /* Homepage: What we do                                                */
  /* ------------------------------------------------------------------ */
  // Approved copy (Shunaya change request, Oct 2026). The first sentence is shown as the heading.
  about: {
    title: 'We created the kind of space we were looking for.',
    intro: 'Like many people, we found ourselves caught in routines that left little room to pause, reflect, or simply be present.',
    lines: [
      'Yoga helped us reconnect with our bodies.',
      'Art gave us a way to express what words often couldn’t.',
      'Nature reminded us to slow down.',
      'The people we met along the way showed us the value of genuine community.'
    ],
    outro: [
      'Shunaya grew from those experiences.',
      'Today, we create retreats and gatherings where people can step away from everyday life, meet like minded individuals, explore creativity, and build habits that support lasting wellbeing.',
      'Whether you come alone or with friends, you’ll find a welcoming community waiting for you.'
    ]
  },

  pillars: [
    {
      id: 'yoga',
      number: '01',
      name: 'Yoga',
      image: 'assets/img/pillar-yoga-sm.webp',
      imageAlt: 'Guests doing yoga on mats outside a heritage house',
      lead: 'Yoga at Shunaya is about building a stronger relationship with yourself, not achieving the perfect pose.',
      experience: 'We offer guided yoga sessions suitable for all experience levels, along with breathing techniques, meditation, and reflective practices that encourage physical and mental wellbeing. We also host **Yoga Talks** that explore the philosophy of yoga, its deeper meaning, and how its timeless wisdom can be applied to everyday life, helping you connect with yoga beyond the mat.'
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
      cardImage: 'assets/img/gallery/tosh/02-meadow-sm.webp',
      gallery: [
        ['assets/img/gallery/tosh/01-arrival', 'Arriving in Tosh under the snow peaks'],
        ['assets/img/gallery/tosh/02-meadow', 'The meadow below the snow peaks'],
        ['assets/img/gallery/tosh/03-yoga-grass', 'Yoga on the grass by the cottage'],
        ['assets/img/gallery/tosh/04-meditation', 'Outdoor meditation in the meadow'],
        ['assets/img/gallery/tosh/05-art-coasters', 'Hand-painted coasters from the art session'],
        ['assets/img/gallery/tosh/06-group-paintings', 'The group with their paintings'],
        ['assets/img/gallery/tosh/07-trek', 'On the trek'],
        ['assets/img/gallery/tosh/08-forest-path', 'A sunlit forest path'],
        ['assets/img/gallery/tosh/09-celebration', 'Celebrating outside the cottage'],
        ['assets/img/gallery/tosh/10-wildflowers', 'Wildflowers and mountains'],
        ['assets/img/gallery/tosh/11-milky-way', 'The Milky Way over Tosh']
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
      cardImage: 'assets/img/gallery/bir-2025/08-trek-sunset-sm.webp',
      gallery: [
        ['assets/img/gallery/bir-2025/01-group-yoga-hall', 'The Bir 2025 group with their yoga mats'],
        ['assets/img/gallery/bir-2025/02-yoga-class', 'Morning yoga in the hall'],
        ['assets/img/gallery/bir-2025/03-yoga-wheel', 'A guest in wheel pose'],
        ['assets/img/gallery/bir-2025/04-art-sketching', 'Sketching during an art session'],
        ['assets/img/gallery/bir-2025/05-painting', 'A painting in progress'],
        ['assets/img/gallery/bir-2025/06-group-paintings', 'Guests holding the paintings they made'],
        ['assets/img/gallery/bir-2025/07-monastery', 'A Buddhist monastery near Bir'],
        ['assets/img/gallery/bir-2025/08-trek-sunset', 'The group on a mountain trail at sunset'],
        ['assets/img/gallery/bir-2025/09-stream', 'Crossing a mountain stream'],
        ['assets/img/gallery/bir-2025/10-waterfall', 'A group selfie at the waterfall'],
        ['assets/img/gallery/bir-2025/11-billing', 'At the Billing paragliding take-off point'],
        ['assets/img/gallery/bir-2025/12-sunset', 'Sunset over the valley']
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
      cardImage: 'assets/img/gallery/goa/12-sunset-sm.webp',
      gallery: [
        ['assets/img/gallery/goa/01-courtyard', 'The group in the courtyard of the heritage stay'],
        ['assets/img/gallery/goa/02-library', 'Sharing a laugh in the library'],
        ['assets/img/gallery/goa/03-yoga-house', 'Yoga outside the heritage house'],
        ['assets/img/gallery/goa/04-yoga-trees', 'Yoga under the trees'],
        ['assets/img/gallery/goa/05-savasana', 'Rest at the end of a session'],
        ['assets/img/gallery/goa/06-art-lounge', 'An art session in the lounge'],
        ['assets/img/gallery/goa/07-beach-meditation', 'Morning meditation on the beach'],
        ['assets/img/gallery/goa/08-beach-yoga', 'Beach yoga at sunrise'],
        ['assets/img/gallery/goa/09-beach-rest', 'Lying back on the sand'],
        ['assets/img/gallery/goa/10-beach-group', 'The group on the beach'],
        ['assets/img/gallery/goa/11-beach-selfie', 'A group selfie by the sea'],
        ['assets/img/gallery/goa/12-sunset', 'In the water at sunset']
      ],
      itinerary: [
        ['Day 1', 'Arrival at the wellness resort, evening sunset circle on the beach.'],
        ['Day 2', 'Vinyasa flow, watercolour workshop, evening beach sound meditation.'],
        ['Day 3', 'Hatha yoga, excursion to a hidden waterfall in Netravali, picnic lunch.']
      ],
      tbc: {
        length: 'Derived from the 2–4 Oct dates.',
        itinerary: 'From the old site’s 4-day Goa listing (dated 12–15 Feb 2026); day 4 dropped to fit 3 days. Confirm.'
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
      cardImage: 'assets/img/gallery/tosh-2/03-yoga-peaks-sm.webp',
      gallery: [
        ['assets/img/gallery/tosh-2/01-stay', 'The wooden guesthouse in Tosh'],
        ['assets/img/gallery/tosh-2/02-yoga-morning', 'Morning yoga outdoors'],
        ['assets/img/gallery/tosh-2/03-yoga-peaks', 'Yoga below the snow peaks'],
        ['assets/img/gallery/tosh-2/04-savasana', 'A happy moment at the end of savasana'],
        ['assets/img/gallery/tosh-2/05-painting', 'A guest painting'],
        ['assets/img/gallery/tosh-2/06-art-cafe', 'An art session in the café'],
        ['assets/img/gallery/tosh-2/07-group-paintings', 'Showing off the paintings'],
        ['assets/img/gallery/tosh-2/08-forest-walk', 'A forest walk through the meadow'],
        ['assets/img/gallery/tosh-2/09-tree-hug', 'Hugging a cedar on the forest walk'],
        ['assets/img/gallery/tosh-2/10-waterfall', 'At the waterfall'],
        ['assets/img/gallery/tosh-2/11-group', 'The Tosh 2.0 group'],
        ['assets/img/gallery/tosh-2/12-night-sky', 'The night sky over Tosh']
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
    { name: 'Vixie', logo: 'assets/img/brand-vixie.png', height: 40 },
    { name: 'Fitnut', logo: 'assets/img/brand-fitnut.png', height: 26 }
  ],

  /* ------------------------------------------------------------------ */
  /* The Undoing landing page (bir.html)                                 */
  /* ------------------------------------------------------------------ */
  bir: {
    experiences: [
      {
        name: 'Yoga',
        image: 'assets/img/gallery/bir-2025/02-yoga-class-sm.webp',
        imageAlt: 'Morning yoga at Shunaya’s Bir retreat',
        text: 'Daily yoga with breathwork and meditation, plus tratak (candle-gazing) to settle a busy mind. Suitable for all experience levels.'
      },
      {
        name: 'Art',
        image: 'assets/img/gallery/bir-2025/04-art-sketching-sm.webp',
        imageAlt: 'Guests sketching during an art session in Bir',
        text: 'Art therapy sessions led by artists who encourage curiosity instead of perfection. No experience needed, just a willingness to play.'
      },
      {
        name: 'Nature',
        image: 'assets/img/gallery/bir-2025/08-trek-sunset-sm.webp',
        imageAlt: 'The group on a mountain trail near Bir at sunset',
        text: 'A trek to the Mata Maheshwari temple, a bonfire under the winter sky and a night of stargazing in the mountains.'
      }
    ],
    experiencesTbc: 'Copy drafted from the activities named on the client call.',

    // From The Undoing deck. title = the day's name, stage = the word shown faded at the foot of the card.
    itinerary: [
      {
        day: 'Day 1',
        date: 'Thu 24 Dec',
        title: 'Sankalpa',
        stage: 'Arrive',
        items: ['Welcome & opening ceremony', 'Introduction to Undoing', 'Setting up an intention', 'Yoga session', 'Connection', 'Yoga talks']
      },
      {
        day: 'Day 2',
        date: 'Fri 25 Dec',
        title: 'Antar',
        stage: 'Unlearn',
        items: ['Morning walk', 'Yoga + pranayama', 'Reflection', 'Art: Unlearning Perfect', 'Yoga session', 'Evening meditation', 'Capturing corner', 'Bonfire + fun activity']
      },
      {
        day: 'Day 3',
        date: 'Sat 26 Dec',
        title: 'Abhyasa',
        stage: 'Release',
        items: ['Morning yoga', 'Pranayama', 'Monastery', 'Trek to Mata Maheshwari Temple', 'Journalling', 'Sunset', 'Evening meditation', 'Yoga talks', 'Jamming & sharing']
      },
      {
        day: 'Day 4',
        date: 'Sun 27 Dec',
        title: 'Anubhava',
        stage: 'Return',
        items: ['Morning yoga', 'Gratitude circle', 'Reflecting on what remains', 'A new beginning', 'Goodbye with beautiful memories']
      }
    ],

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
      },
      {
        name: 'Smit Gajjar',
        handle: '',
        role: 'Yoga teacher & practitioner',
        photo: 'assets/img/host-smit-gajjar.webp',
        tbc: { photo: 'Cropped from the deck’s low-light studio photo. A proper portrait would help.' }
      }
    ],

    stay: {
      name: 'Mandala Sanctuary',
      kind: 'A mud-house resort in Bir',
      text: 'In the heart of Bir, right beside a monastery. Designed for a mindful escape, with an in-house yogshala for our sessions. Three nights of warm rooms, quiet mornings and satvik meals cooked fresh.',
      logo: 'assets/img/mandala-sanctuary-logo.webp',
      // [image path without extension, alt text]; each has .webp and -sm.webp
      photos: [
        ['assets/img/gallery/mandala/01-cottages-dusk', 'Mud-house cottages at Mandala Sanctuary at dusk, lamps lit'],
        ['assets/img/gallery/mandala/02-round-window', 'A stone cottage with a round window in the Mandala Sanctuary garden'],
        ['assets/img/gallery/mandala/03-satvik-thali', 'A satvik thali served at Mandala Sanctuary']
      ]
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
        a: 'Absolutely. Groups are small (18 seats), and many guests arrive as strangers. As one of them put it: “Came here as strangers, leaving with a family I didn’t know I needed.”'
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
