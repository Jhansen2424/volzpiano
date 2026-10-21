/**
 * Where Volz Method teachers drive. Single source of truth for the service-area
 * landing pages, the "Areas we serve" hub, the homepage area links, and the
 * business schema's areaServed.
 *
 * City lists mirror the hiring zones on /teaching-positions (teachers are hired
 * inside each zone, which is what keeps drive times short). Keep the two in
 * sync: a city listed here is a promise that a teacher can reach it.
 */

export type ServiceZone = {
  /** Short name for the zone, e.g. "Southeast valley". */
  name: string;
  cities: string[];
};

export type AreaFaq = { q: string; a: string };

export type ServiceArea = {
  /** Route segment, e.g. "piano-lessons-salt-lake-county". */
  slug: string;
  /** Full county name as used in headings and schema. */
  county: string;
  /** Short label for links and chips. */
  label: string;
  metaTitle: string;
  metaDescription: string;
  /** The hero's supporting sentence. */
  heroLine: string;
  zones: ServiceZone[];
  /** Locally specific paragraphs for the "lessons in your area" section. */
  local: string[];
  /** Cities nearby that families ask about but teachers may not reach yet. */
  askAbout: string[];
  faqs: AreaFaq[];
  /** Other counties to cross-link, by slug. */
  nearby: string[];
};

export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: "piano-lessons-salt-lake-county",
    county: "Salt Lake County",
    label: "Salt Lake County",
    metaTitle: "In-Home Piano Lessons in Salt Lake County, UT",
    metaDescription:
      "In-home piano lessons for kids in Sandy, Draper, West Jordan, South Jordan, Riverton, Herriman and nearby. The teacher drives to you. From $29 per half hour.",
    heroLine:
      "From Cottonwood Heights to Herriman, a Volz Method teacher drives to your house each week, so your child learns on the piano they practice on every day.",
    zones: [
      { name: "Southeast valley", cities: ["Sandy", "Draper", "Midvale", "Cottonwood Heights"] },
      {
        name: "Southwest valley",
        cities: ["West Jordan", "South Jordan", "Riverton", "Herriman", "Bluffdale"],
      },
    ],
    local: [
      "Our Salt Lake County teachers work in two zones: the southeast valley (Sandy, Draper, Midvale and Cottonwood Heights) and the southwest valley (West Jordan, South Jordan, Riverton, Herriman and Bluffdale). We hire teachers inside each zone, so the teacher who comes to your home usually lives nearby. Short drives are what make the same weekly time slot dependable.",
      "Families on both sides of the valley tell us the same thing: after school is already a scramble. With lessons at home, there's no I-15 traffic, no waiting room, and siblings can carry on with homework down the hall. If two or more children take lessons, they can go back-to-back in one visit, and multi-student discounts apply.",
    ],
    askAbout: ["Salt Lake City", "Millcreek", "Murray", "Holladay", "Taylorsville", "West Valley City"],
    faqs: [
      {
        q: "Which Salt Lake County cities do your teachers drive to?",
        a: "Our teachers currently cover Sandy, Draper, Midvale, Cottonwood Heights, West Jordan, South Jordan, Riverton, Herriman and Bluffdale. If you live elsewhere in the county, book a free call and we'll tell you right away whether a teacher can reach you.",
      },
      {
        q: "How much are piano lessons in Salt Lake County?",
        a: "Volz Method lessons are $29–$52 per half hour. Your exact price depends on your city and how many students are in your home, and you'll get it on the free 15-minute call.",
      },
      {
        q: "Will my child have the same teacher every week?",
        a: "Yes. Your child keeps the same teacher week after week, so the teacher really gets to know how your child learns.",
      },
    ],
    nearby: ["piano-lessons-utah-county", "piano-lessons-davis-county"],
  },
  {
    slug: "piano-lessons-utah-county",
    county: "Utah County",
    label: "Utah County",
    metaTitle: "In-Home Piano Lessons in Utah County, UT",
    metaDescription:
      "In-home piano lessons for kids in Lehi, American Fork, Saratoga Springs, Eagle Mountain, Orem and nearby. The teacher drives to you. From $29.",
    heroLine:
      "From Lehi and Saratoga Springs down to Orem, a Volz Method teacher comes to your home each week. No studio drive, no waiting room.",
    zones: [
      { name: "North county", cities: ["Lehi", "American Fork", "Cedar Hills", "Highland", "Alpine"] },
      { name: "West of Utah Lake", cities: ["Eagle Mountain", "Saratoga Springs"] },
      { name: "Central county", cities: ["Pleasant Grove", "Lindon", "Orem", "Vineyard"] },
    ],
    local: [
      "In Utah County our teachers cover three zones: the north end (Lehi, American Fork, Cedar Hills, Highland and Alpine), the fast-growing communities west of Utah Lake (Eagle Mountain and Saratoga Springs), and the central county (Pleasant Grove, Lindon, Orem and Vineyard). Teachers are hired within these zones, so your teacher isn't crossing the county to reach you.",
      "Utah County has plenty of piano studios, but most mean a drive there and back plus a wait while your child is in lessons. For families in Eagle Mountain and Saratoga Springs especially, a teacher who comes to the house saves a long round trip every week. Lessons happen on your own piano, the one your child practices on all week.",
    ],
    askAbout: ["Provo", "Springville", "Spanish Fork", "Mapleton"],
    faqs: [
      {
        q: "Which Utah County cities do your teachers drive to?",
        a: "Our teachers currently cover Lehi, American Fork, Cedar Hills, Highland, Alpine, Eagle Mountain, Saratoga Springs, Pleasant Grove, Lindon, Orem and Vineyard. In Provo, Springville or further south? Book a free call and we'll check whether a teacher can reach you.",
      },
      {
        q: "How much are piano lessons in Utah County?",
        a: "Volz Method lessons are $29–$52 per half hour, depending on your city and how many students are in your home. Multi-student discounts are available, and you'll get your exact price on the free call.",
      },
      {
        q: "Can we use the Utah Fits All Scholarship?",
        a: "Yes. Volz Method accepts the Utah Fits All Scholarship. Mention it on your call and we'll walk you through what you need.",
      },
    ],
    nearby: ["piano-lessons-salt-lake-county", "piano-lessons-davis-county"],
  },
  {
    slug: "piano-lessons-davis-county",
    county: "Davis County",
    label: "Davis County",
    metaTitle: "In-Home Piano Lessons in Davis County, UT",
    metaDescription:
      "In-home piano lessons for kids in Bountiful, Layton, Kaysville, Farmington, Centerville, Syracuse and nearby, plus Roy and Hooper. The teacher drives to you.",
    heroLine:
      "From North Salt Lake to Layton, plus Roy and Hooper next door, a Volz Method teacher drives to your home every week.",
    zones: [
      {
        name: "South Davis",
        cities: ["North Salt Lake", "Woods Cross", "Bountiful", "Centerville", "Farmington"],
      },
      {
        name: "North Davis",
        cities: ["Kaysville", "Layton", "Syracuse", "Clearfield", "Clinton", "South Weber"],
      },
      { name: "Nearby Weber County", cities: ["Roy", "Hooper"] },
    ],
    local: [
      "Our Davis County teachers cover the full length of the county, from North Salt Lake, Woods Cross and Bountiful in the south to Kaysville, Layton, Syracuse, Clearfield, Clinton and South Weber in the north. The same zone also reaches Roy and Hooper just over the Weber County line.",
      "Davis County families often juggle commutes up and down I-15 and Legacy Parkway. Lessons at home take one drive out of the week entirely: the teacher arrives, your child plays on the piano they know, and you never leave the house. Weekly lessons stay on the same day and time, so they fit around school and activities instead of competing with them.",
    ],
    askAbout: ["Ogden", "Riverdale", "West Haven"],
    faqs: [
      {
        q: "Which Davis County cities do your teachers drive to?",
        a: "Our teachers currently cover North Salt Lake, Woods Cross, Bountiful, Centerville, Farmington, Kaysville, Layton, Syracuse, Clearfield, Clinton and South Weber, plus Roy and Hooper in Weber County.",
      },
      {
        q: "Do you teach in Ogden?",
        a: "Our Weber County coverage currently includes Roy and Hooper. If you're in Ogden or nearby, book a free call and we'll tell you whether a teacher can reach you.",
      },
      {
        q: "How much are piano lessons in Davis County?",
        a: "Volz Method lessons are $29–$52 per half hour. Your exact price depends on your city and how many students are in your home, and you'll get it on the free 15-minute call.",
      },
    ],
    nearby: ["piano-lessons-salt-lake-county", "piano-lessons-utah-county"],
  },
];

export function getArea(slug: string): ServiceArea {
  const area = SERVICE_AREAS.find((a) => a.slug === slug);
  if (!area) throw new Error(`Unknown service area: ${slug}`);
  return area;
}

/** Every city a teacher currently reaches, across all areas. */
export function allServedCities(): string[] {
  return SERVICE_AREAS.flatMap((a) => a.zones.flatMap((z) => z.cities));
}
