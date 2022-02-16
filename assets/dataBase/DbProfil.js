const profilInfo = {
  registered: false,
  init: true,
  cartItems: {},
  favorite: {},
  viewed: {},
  marketing: {},
  addresses: {},
  orders: {},
  currency: 'USD',
  language: 'EN',
  countryTVA: 'CH',
  tva: 0.077,
};

export default profilInfo;

/**
 *
 *
  const profilInfo = {
    id: 0, // ID user
    email: 'AntoineMeister@gmail.com', // Email
    fname: 'Antoine', // First name
    lname: 'Meister', // Last name
    fnamelname: 'Antoine Meister', // First name and Last name
    selectedDelivery: 0,
    selectedBilling: 1,
    cartItems: [],
    favorite: [],
    viewed: [],
    marketing: [],
    addresses: [ // Different address of user (Biling / Delivery)
      {
        id: 0,
        address: 'Avenue 11', // Address
        number: '34A', // Number of appartment
        postal: '1200', // Postal code
        city: 'Genève', // City
        country: 'Switzerland', // Country
        fnamelname: 'Antoine Meister',
        statut: 'Delivery Address'
      },
      {
        id: 1,
        address: 'Avenue 12', // Address
        number: '34A', // Number of appartment
        postal: '1200', // Postal code
        city: 'Genève', // City
        country: 'Switzerland', // Country
        fnamelname: 'Antoine Meister',
        statut: 'Billing Address'
      }
    ],
  };

 *
 */
