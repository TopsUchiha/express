/**
 * Central brand + company configuration.
 * Change values here to rebrand the entire website.
 */
export const siteConfig = {
  company: {
    name: 'Logistix',
    shortName: 'Logistix',
    logoMark: 'L',
    logo: null as string | null,
    tagline: 'Freight forwarding that keeps you posted.',
    description:
      'We move freight by air, sea and road, and you can see where it is from pickup to delivery.',
    email: 'hello@logistix.example',
    headquarters: 'Global Headquarters, Port District',
    businessHours: [
      { days: 'Monday – Friday', hours: '08:00 – 18:00' },
      { days: 'Saturday', hours: '09:00 – 14:00' },
      { days: 'Sunday', hours: 'Closed' },
    ],
    supportNote: 'Someone is on call 24/7 for shipments in transit.',
    social: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: 'linkedin' },
      { label: 'Facebook', href: 'https://www.facebook.com', icon: 'facebook' },
      { label: 'X', href: 'https://x.com', icon: 'x' },
      { label: 'Instagram', href: 'https://www.instagram.com', icon: 'instagram' },
    ] as const,
    foundedYearsAgo: 10,
  },
  brand: {
    primary: '#F26B1D',
    dark: '#0B1A2B',
  },
  tracking: {
    prefix: 'LGX',
    placeholder: 'LGX-7K4M2P9XQ3',
  },
  url: 'https://www.logistix.example',
}

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Air Freight', href: '/services/air-freight' },
      { label: 'Ocean Freight', href: '/services/ocean-freight' },
      { label: 'Heavy Machinery Transport', href: '/services/heavy-machinery' },
      { label: 'Warehousing', href: '/services/warehousing' },
      { label: 'Customs Clearance', href: '/services/customs-clearance' },
      { label: 'Pet Transport', href: '/services/pet-transport' },
      { label: 'Service Comparison', href: '/service-comparison' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  { label: 'Track & Trace', href: '/track' },
  { label: 'Contact', href: '/contact' },
] as const

/** All imagery in one place so it can be swapped without touching components. */
export const images = {
  heroPort: '/images/hero-port.jpg',
  warehouse: '/images/warehouse.jpg',
  truck: '/images/truck.jpg',
  oceanFreight: '/images/ocean-freight.jpg',
  airFreight: '/images/air-freight.jpg',
  heavyMachinery: '/images/heavy-machinery.jpg',
  customs: '/images/customs.jpg',
  petTransport: '/images/puppy-crate.jpg',
  statsBackground: '/images/stats-bg.jpg',
  ctaBackground: '/images/cta-bg.jpg',
  trackHero: '/images/track-hero.jpg',
  contactHero: '/images/contact-hero.jpg',
  process: '/images/process.jpg',
}

export const statistics = [
  { value: '10,000+', label: 'Shipments Delivered' },
  { value: '500+', label: 'Happy Clients' },
  { value: `${siteConfig.company.foundedYearsAgo}+`, label: 'Years of Experience' },
  { value: '99.8%', label: 'On-Time Delivery' },
]

export const processSteps = [
  {
    number: '01',
    title: 'Pick & Secure Package',
    description:
      'We collect your cargo, check the paperwork, then pack, lash and label it for the trip.',
  },
  {
    number: '02',
    title: 'Transport & Tracking',
    description:
      'Your cargo moves through our carriers and hubs. Each milestone shows up on the Track & Trace page as it happens.',
  },
  {
    number: '03',
    title: 'Safe Delivery',
    description:
      'The local team books a delivery slot, arranges site access and handles the unloading.',
  },
  {
    number: '04',
    title: 'Delivery Confirmation',
    description:
      'Once it’s handed over, you get the signature, the proof of delivery and a condition report.',
  },
]
