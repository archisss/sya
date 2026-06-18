export interface Parent {
  name: string;
  isDeceased: boolean;
}

export interface GiftRegistry {
  company: string;
  eventId: string;
  url?: string;
  show: boolean;
}

export interface BankTransfer {
  show: boolean;
  bank: string;
  accountHolder: string;
  clabe: string;
}

export interface ItineraryItemConfig {
  time: string;
  title: string;
  subtitle: string;
  side: 'left' | 'right';
  type: 'ceremony' | 'reception' | 'toast' | 'dance' | 'party' | 'end' | string;
}

export interface WeddingConfigType {
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingDateDisplay: string;
  itinerary: ItineraryItemConfig[];
  churchName: string;
  churchAddress: string;
  churchMapsLink: string;
  locationName: string;
  locationAddress: string;
  locationMapsLink: string;
  giftRegistries: GiftRegistry[];
  bankTransfer: BankTransfer;
  rsvpWhatsAppNumber: string;
  showRsvpForm: boolean;
  showWelcomeScreen: boolean;
  coupleInitials: string;
  parents: {
    show: boolean;
    title: string;
    brideParents: Parent[];
    groomParents: Parent[];
  };
  // Aesthetic parameters
  theme: 'classic' | 'boho' | 'minimal';
  heroImage: string;
  galleryImages: string[];
  storyImage: string;
  venueImage: string;
  musicUrl: string;
  dressCodeText: string;
  dressCodeSub?: string;
}

// 1. DEFAULT CLASSIC CONFIG: Sylvana & José Carlos
export const WEDDING_CONFIG: WeddingConfigType = {
  brideName: "Sylvana",
  groomName: "José Carlos",
  weddingDate: "2026-05-30T17:00:00",
  weddingDateDisplay: "30 de Mayo, 2026",
  itinerary: [
    { time: "05:00 pm", title: "Ceremonia religiosa", subtitle: "Parroquia del Espíritu Santo", side: 'left', type: 'ceremony' },
    { time: "07:00 pm", title: "Recepción", subtitle: "", side: 'right', type: 'reception' },
    { time: "09:00 pm", title: "Brindis", subtitle: "", side: 'left', type: 'toast' },
    { time: "10:00 pm", title: "Baile de novios", subtitle: "", side: 'right', type: 'dance' },
    { time: "11:00 pm", title: "Fiesta", subtitle: "", side: 'left', type: 'party' },
    { time: "02:00 am", title: "Fin de fiesta", subtitle: "", side: 'right', type: 'end' },
  ],
  churchName: "Parroquia del Espíritu Santo",
  churchAddress: "Felipe Sevilla del Río",
  churchMapsLink: "https://www.google.com/maps/search/?api=1&query=Parroquia+del+Espiritu+Santo+Colima+Felipe+Sevilla+del+Rio",
  locationName: "Las Cavas de Don José",
  locationAddress: "Gildardo Gómez 128959, Las Huertas, 28000 Colima, Col., México.",
  locationMapsLink: "https://www.google.com/maps/place/Las+Cavas+de+Don+Jos%C3%A9/@19.2416912,-103.7304707,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICE7KOHuQE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHVAwep_5q592BxyIhcs84ZX5nrg2eFrwXP-dFvBVAaDMgNozl1bmgyRulnzPF4cLtJtDtCCruzdDshJI0B1YvD7d4L0jKHYvuaBVWVWGyOwFovzKlelidy3DQIJyiefs2UnTXoAJlDP%3Dw152-h86-k-no!7i3920!8i2204!4m7!3m6!1s0x842545549746dffb:0xbf9b1768d294bd98!4b1!8m2!3d19.2416734!4d-103.7305672!16s%2Fg%2F1jmcl_vlk?entry=ttu",
  giftRegistries: [
    { company: "Liverpool", eventId: "51978819", url: "https://mesaderegalos.liverpool.com.mx/milistaderegalos/51978819", show: true },
    { company: "Sears", eventId: "245304", url: "https://www.sears.com.mx/Mesa-de-Regalos/245304/Te-invito-a-mi-Boda---marha-sylvana-&_JOSE-CARLOS", show: true },
    { company: "Amazon", eventId: "98765-432-100", show: false },
  ],
  bankTransfer: {
    show: true,
    bank: "BBVA",
    accountHolder: "Martha Sylvana Aguirre Verduzco",
    clabe: "012090029858964364"
  },
  rsvpWhatsAppNumber: "+523122102848",
  showRsvpForm: false,
  showWelcomeScreen: false,
  coupleInitials: "SyJC",
  parents: {
    show: true,
    title: "Con la Bendición de Dios y nuestros padres",
    brideParents: [
      { name: "Martha Lorena Verduzco LLamas", isDeceased: false },
      { name: "Oswaldo Aguirre Campos", isDeceased: true }
    ],
    groomParents: [
      { name: "Ma. Blanca Esthela Chavez Barragan", isDeceased: false },
      { name: "Jose Anaya Morales", isDeceased: false }
    ]
  },
  // Aesthetics
  theme: 'classic',
  heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000",
  galleryImages: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800"
  ],
  storyImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200",
  venueImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
  musicUrl: "/audio/wedding-music.mp3",
  dressCodeText: "Formal / Etiqueta",
  dressCodeSub: "Se reserva el color blanco para la novia"
};

// 2. BOHO-CHIC STYLE CONFIG: Diana & Manuel
export const BOHO_CONFIG: WeddingConfigType = {
  brideName: "Diana",
  groomName: "Manuel",
  weddingDate: "2026-10-17T16:00:00",
  weddingDateDisplay: "17 de Octubre, 2026",
  itinerary: [
    { time: "04:00 pm", title: "Ceremonia de Arena", subtitle: "Templo Jardín del Cortijo", side: 'left', type: 'ceremony' },
    { time: "06:00 pm", title: "Coctel de Bienvenida", subtitle: "Sunset Garden", side: 'right', type: 'toast' },
    { time: "07:30 pm", title: "Banquete & Brindis", subtitle: "Terraza Rústica", side: 'left', type: 'reception' },
    { time: "09:30 pm", title: "Baile Bajo las Estrellas", subtitle: "Pista Central", side: 'right', type: 'dance' },
    { time: "11:00 pm", title: "Fogata & Mariachi", subtitle: "Área de Jardines", side: 'left', type: 'party' },
    { time: "01:30 am", title: "Agradecimientos", subtitle: "Cierre de Evento", side: 'right', type: 'end' },
  ],
  churchName: "Templo Jardín del Cortijo",
  churchAddress: "Camino Real a Cofradía de Suchitlán, Colima",
  churchMapsLink: "https://www.google.com/maps/search/?api=1&query=Suchitlan+Comala+Colima",
  locationName: "Hacienda del Cortijo",
  locationAddress: "Carretera a Comala Km 4.5, Las Rosas, 28450 Comala, Col., México.",
  locationMapsLink: "https://www.google.com/maps/search/?api=1&query=Hacienda+el+Cortijo+Comala+Colima",
  giftRegistries: [
    { company: "Amazon", eventId: "AMZN-DIANA-MANUEL-2026", url: "https://www.amazon.com.mx/wedding", show: true },
    { company: "Liverpool", eventId: "54321987", url: "https://mesaderegalos.liverpool.com.mx", show: true },
  ],
  bankTransfer: {
    show: true,
    bank: "Santander",
    accountHolder: "Diana Robles Escobedo",
    clabe: "014090567843219087"
  },
  rsvpWhatsAppNumber: "+523122102848",
  showRsvpForm: false,
  showWelcomeScreen: true, // Show the romantic boho entrance screen!
  coupleInitials: "DyM",
  parents: {
    show: true,
    title: "Con el amor y apoyo de nuestras familias",
    brideParents: [
      { name: "Sonia Escobedo Ruiz", isDeceased: false },
      { name: "Héctor Robles Morán", isDeceased: false }
    ],
    groomParents: [
      { name: "Elsa Ramos Cueva", isDeceased: false },
      { name: "Rigoberto Cárdenas Gil", isDeceased: false }
    ]
  },
  // Aesthetics
  theme: 'boho',
  heroImage: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=2000",
  galleryImages: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1507504038482-7621abf8c325?auto=format&fit=crop&q=80&w=800"
  ],
  storyImage: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=1200",
  venueImage: "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=1000",
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Romantic acoustic track
  dressCodeText: "Boho-Chic / Jardín Cálido",
  dressCodeSub: "Guayabera o traje claro para caballero. Vestidos ligeros y sandalias cómodas."
};

// 3. MINIMAL MODERN STYLE CONFIG: Sofía & Carlos
export const MINIMAL_CONFIG: WeddingConfigType = {
  brideName: "Sofía",
  groomName: "Carlos",
  weddingDate: "2026-11-21T18:00:00",
  weddingDateDisplay: "21 de Noviembre, 2026",
  itinerary: [
    { time: "06:00 pm", title: "Ceremonia Civil", subtitle: "Santuario de la Guadalupana", side: 'left', type: 'ceremony' },
    { time: "07:30 pm", title: "Brindis Imperial", subtitle: "Modern Glass Lounge", side: 'right', type: 'toast' },
    { time: "08:30 pm", title: "Banquete Gourmet", subtitle: "Salón Principal Black & White", side: 'left', type: 'reception' },
    { time: "10:30 pm", title: "Vals de los Esposos", subtitle: "Pista Infinita", side: 'right', type: 'dance' },
    { time: "11:30 pm", title: "Luxury Rave", subtitle: "DJ Set Especial", side: 'left', type: 'party' },
    { time: "03:00 am", title: "Despedida", subtitle: "Match-box Afterparty", side: 'right', type: 'end' },
  ],
  churchName: "Santuario de la Guadalupana",
  churchAddress: "Av. Felipe Sevilla del Río 520, Lomas de Circunvalación, Colima, Col.",
  churchMapsLink: "https://www.google.com/maps/search/?api=1&query=Santuario+de+la+Guadalupana+Colima",
  locationName: "Espacio Galván Trapiche",
  locationAddress: "Calzada Galván Norte 90, Centro, 28000 Colima, Col., México.",
  locationMapsLink: "https://www.google.com/maps/search/?api=1&query=Calzada+Galvan+Colima+Comonfort",
  giftRegistries: [
    { company: "Liverpool", eventId: "59874123", url: "https://mesaderegalos.liverpool.com.mx", show: true },
    { company: "Palacio de Hierro", eventId: "88992211", url: "https://www.elpalaciodehierro.com", show: true },
  ],
  bankTransfer: {
    show: true,
    bank: "BBVA",
    accountHolder: "Carlos Alcaraz Solis",
    clabe: "012090098543210744"
  },
  rsvpWhatsAppNumber: "+523122102848",
  showRsvpForm: false,
  showWelcomeScreen: true, // Slick dark cinematic welcome screen
  coupleInitials: "SyC",
  parents: {
    show: true,
    title: "Acompañados por el amor eterno de nuestros padres",
    brideParents: [
      { name: "Silvia Garza Treviño", isDeceased: false },
      { name: "Fernando Fuentes Ortega", isDeceased: false }
    ],
    groomParents: [
      { name: "Mónica Solis Delgado", isDeceased: false },
      { name: "Carlos Alcaraz Ruiz", isDeceased: true }
    ]
  },
  // Aesthetics
  theme: 'minimal',
  heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000",
  galleryImages: [
    "https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800"
  ],
  storyImage: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1200",
  venueImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1000",
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // Modern piano/electronic chill theme
  dressCodeText: "Coctel Creativo / Elegante",
  dressCodeSub: "Traje oscuro moderno sin corbata opcional. Vestidos de noche contemporáneos de colores sólidos."
};

// Map of slugs (all lowercase for safer comparisons)
export const CONFIGS_BY_SLUG: Record<string, WeddingConfigType> = {
  'sylvanayjosecarlos': WEDDING_CONFIG,
  'dianaymanuel': BOHO_CONFIG,
  'sofiaycarlos': MINIMAL_CONFIG
};

export const getWhatsAppMessage = (config: WeddingConfigType = WEDDING_CONFIG) => {
  const date = new Date(config.weddingDate);
  const day = date.getDate();
  const month = date.toLocaleString('es-ES', { month: 'long' });
  return `Hola me gustaría confirmar mi asistencia a la boda de ${config.brideName} y ${config.groomName} el ${day} de ${month}`;
};

export const getWhatsAppNoMessage = (config: WeddingConfigType = WEDDING_CONFIG) => {
  const date = new Date(config.weddingDate);
  const day = date.getDate();
  const month = date.toLocaleString('es-ES', { month: 'long' });
  return `Hola NO podre asistir a la boda de ${config.brideName} y ${config.groomName} el ${day} de ${month}`;
};
