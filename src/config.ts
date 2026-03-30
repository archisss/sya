export const WEDDING_CONFIG = {
  brideName: "Sylvana",
  groomName: "José Carlos",
  weddingDate: "2026-05-30T17:00:00", // ISO format for countdown
  weddingDateDisplay: "30 de Mayo, 2026",
  itinerary: [
    { time: "05:00 pm", title: "Ceremonia religiosa", subtitle: "Parroquia del Espíritu Santo", side: 'left' as const, type: 'ceremony' },
    { time: "07:00 pm", title: "Recepción", subtitle: "", side: 'right' as const, type: 'reception' },
    { time: "09:00 pm", title: "Brindis", subtitle: "", side: 'left' as const, type: 'toast' },
    { time: "10:00 pm", title: "Baile de novios", subtitle: "", side: 'right' as const, type: 'dance' },
    { time: "11:00 pm", title: "Fiesta", subtitle: "", side: 'left' as const, type: 'party' },
    { time: "02:00 am", title: "Fin de fiesta", subtitle: "", side: 'right' as const, type: 'end' },
  ],
  locationName: "Las Cavas de Don José",
  locationAddress: "Gildardo Gómez 128959, Las Huertas, 28000 Colima, Col., México.",
  giftRegistries: [
    { company: "Liverpool", eventId: "51978819", show: true },
    { company: "Sears", eventId: "245304", show: true },
    { company: "Amazon", eventId: "98765-432-100", show: false },
  ],
  bankTransfer: {
    show: true,
    accountHolder: "Martha Sylvana Aguirre Verduzco",
    clabe: "012090029858964364"
  },
  rsvpWhatsAppNumber: "+523122102848",
  showRsvpForm: false, // Set to true to show the form, false to hide it
  showWelcomeScreen: true, // Set to true to show the welcome screen, false to skip it
  coupleInitials: "SyJC",
};

export const getWhatsAppMessage = () => {
  const date = new Date(WEDDING_CONFIG.weddingDate);
  const day = date.getDate();
  const month = date.toLocaleString('es-ES', { month: 'long' });
  return `Hola me gustaría confirmar mi asistencia a la boda de ${WEDDING_CONFIG.brideName} y ${WEDDING_CONFIG.groomName} el ${day} de ${month}`;
};

export const getWhatsAppNoMessage = () => {
  const date = new Date(WEDDING_CONFIG.weddingDate);
  const day = date.getDate();
  const month = date.toLocaleString('es-ES', { month: 'long' });
  return `Hola NO podre asistir a la boda de ${WEDDING_CONFIG.brideName} y ${WEDDING_CONFIG.groomName} el ${day} de ${month}`;
};
