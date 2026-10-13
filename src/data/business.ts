export const business = {
  name: 'Mercato Montagna',
  address: '4701 Boulevard Saint-Jean, Dollard-des-Ormeaux, QC H9H 2A7',
  phone: '438-772-1313',
  email: 'contact@mercatomontagna.ca',
  hours: [
    { days: 'Monday', hours: 'Closed' },
    { days: 'Tuesday – Saturday', hours: '8:00 am – 6:00 pm' },
    { days: 'Sunday', hours: '8:00 am – 5:00 pm' },
  ],
  pickupHours: [
    { day: 0, open: '08:00', close: '17:00' },
    { day: 2, open: '08:00', close: '18:00' },
    { day: 3, open: '08:00', close: '18:00' },
    { day: 4, open: '08:00', close: '18:00' },
    { day: 5, open: '08:00', close: '18:00' },
    { day: 6, open: '08:00', close: '18:00' },
  ],
  mapUrl: 'https://maps.google.com/?q=4701+Boulevard+Saint-Jean,+Dollard-des-Ormeaux,+QC+H9H+2A7',
  social: [{ label: 'Instagram', url: 'https://www.instagram.com/' }, { label: 'Facebook', url: 'https://www.facebook.com/' }],
};
