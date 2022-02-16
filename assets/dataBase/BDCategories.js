const categories = {
  Pilot: {
    Jackets: {
      'Bomber Jackets': {},
      'Biker Jacket': {},
      'Denim Jackets': {},
      'Trucker Jacket': {}
    },
    Helmets: {
      'Full face': {},
      Modular: {},
      'Off.Road': {},
      Half: {},
      'Open Face': {},
      'Dual-Sport': {},
    },
    Gloves: {
      'Fingerless Gloves': {},
      'Moto-cross Gloves': {},
      'Gauntlet Gloves': {},
      'Off-road Gloves': {},
      'Street Gloves': {},
      'Cruising Gloves': {},
      'Winter Gloves': {},
      'Touring Gloves': {}
    },
    Visors: {
      'Completely transparent visor': {},
      'Helmet with integrated glasses': {},
      'Smoked visors': {},
      'Iridium visors': {}
    },
    All: {
      'Pilot accessory': {},
      All: {},
    }
  },
  Motorcycle: {
    'Modified by Meister': {
      Standard: {},
      Cruiser: {},
      'Sport bike': {},
      'Café Racer': {},
      Scrambler: {},
      Touring: {},
      'Dual-sport': {},
      'Off-road': {},
      'Scooters, underbones and mopeds': {},
      Utility: {},
      Tricycles: {},
      All: {}
    },
    'Restored by Meister': {
      Standard: {},
      Cruiser: {},
      'Sport bike': {},
      'Café Racer': {},
      Scrambler: {},
      Touring: {},
      'Dual-sport': {},
      'Off-road': {},
      'Scooters, underbones and mopeds': {},
      Utility: {},
      Tricycles: {},
      All: {}
    },
    'Modified by third party': {
      Standard: {},
      Cruiser: {},
      'Sport bike': {},
      'Café Racer': {},
      Scrambler: {},
      Touring: {},
      'Dual-sport': {},
      'Off-road': {},
      'Scooters, underbones and mopeds': {},
      Utility: {},
      Tricycles: {},
      All: {}
    },
    'Restored by third party': {
      Standard: {},
      Cruiser: {},
      'Sport bike': {},
      'Café Racer': {},
      Scrambler: {},
      Touring: {},
      'Dual-sport': {},
      'Off-road': {},
      'Scooters, underbones and mopeds': {},
      Utility: {},
      Tricycles: {},
      All: {}
    },
    'by default': {
      Standard: {},
      Cruiser: {},
      'Sport bike': {},
      'Café Racer': {},
      Scrambler: {},
      Touring: {},
      'Dual-sport': {},
      'Off-road': {},
      'Scooters, underbones and mopeds': {},
      Utility: {},
      Tricycles: {},
      All: {}
    }
  },
  Parts: {
    Chassis: {
      'Single cradle frame': {},
      'Double cradle frame': {},
      'Perimeter frame': {},
      'Trellis frame': {},
      'Monocoque frame': {},
    },
    Electrics: {
      Batteries: {},
      Horns: {},
      Ignition: {},
      Regulators: {},
      'Spark Plugs': {},
      Stators: {},
      Alternators: {},
      'Auxiliary Accessories': {},
      'Solenoids, Relays': {},
      'Speed Sensors': {},
      Starters: {},
      Switches: {},
      'Wire Sets': {},
      Wiring: {},
      Lighting: {},
      'Turn Signals': {},
      'Voltage Regulators & Rectifiers': {},
      Sensors: {},
      'CDI box': {},
      All: {}
    },
    Engine: {
      '20Kw': {},
      '35Kw': {},
      '45Kw': {},
      '50Kw': {}
    },
    'luggage & Bags': {
      'Hard Bags': {},
      'Soft Bags': {},
      Backpacks: {},
      'Sacs à dos': {},
    },
    All: {
      All: {}
    }
  },
  Lifestyle: {
    'T-short': {
      Standard: {},
      Sport: {},
    },
    Pantalon: {
      Standard: {},
      Sport: {},
    },
    Bag: {
      Standard: {},
      Sport: {},
    },
    All: {
      Standard: {},
      Sport: {},
    }
  }
};

const brands = {
  Meister: ['BMW S 1000 XR', 'BMW R100 M-E 72', 'BMW R100 M-E 73', 'BMW R80 M-E 91', 'BMW R100GS M-E 90'],
  BMW: ['BMW S 1000 XR', 'BMW R100 M-E 72', 'BMW R100 M-E 73', 'BMW R80 M-E 91', 'BMW R100GS M-E 90'],
  Triumph: ['T20J Junior Cub', 'TR20 Trials'],
  Ducati: [],
  Motogadget: [],
  Atto: [],
  Gazzini: [],
  Kawasaki: [],
  Suzuki: [],
  Yamaha: [],
  Honda: [],
  // 'Moto Guzzi': [], manque logo
  Universal: [],
};

const typeDelivery = {
  void: {
    pt: 0,
    countries: {
      Switzerland: '0 CHF'
    }
  },
  parcel_100x60x60_500g: {
    pt: 0.256,
    countries: {
      Switzerland: '7 CHF'
    }
  },
  parcel_100x60x60_1kg: {
    pt: 0.5,
    countries: {
      Switzerland: '7 CHF'
    }
  },
  parcel_100x60x60_2kg: {
    pt: 1,
    countries: {
      Switzerland: '7 CHF'
    }
  },
  parcel_100x60x60_4kg: {
    pt: 2,
    countries: {
      Switzerland: '9.7 CHF'
    }
  },
  parcel_100x60x60_8kg: {
    pt: 4,
    countries: {
      Switzerland: '9.7 CHF'
    }
  },
  parcel_100x60x60_10kg: {
    pt: 5,
    countries: {
      Switzerland: '9.7 CHF'
    }
  },
  parcel_100x60x60_20kg: {
    pt: 10,
    countries: {
      Switzerland: '20.5 CHF'
    }
  },
  parcel_100x60x60_30kg: {
    pt: 15,
    countries: {
      Switzerland: '20.5 CHF'
    }
  },
  cumbersome_upTo_4kg: {
    pt: 2,
    countries: {
      Switzerland: '29 CHF'
    }
  },
  cumbersome_upTo_10kg: {
    pt: 5,
    countries: {
      Switzerland: '29 CHF'
    }
  },
  cumbersome_upTo_20kg: {
    pt: 10,
    countries: {
      Switzerland: '29 CHF'
    }
  },
  cumbersome_upTo_30kg: {
    pt: 15,
    countries: {
      Switzerland: '29 CHF'
    }
  },
  cumbersome_upTo_maxkg: {
    pt: 15,
    countries: {
      Switzerland: '58 CHF'
    }
  },
};

const providers = ['provider1', 'provider2', 'provider3'];

const sizes = {
  'XS, S, M, L, XL, XXL': 'XS, S, M, L, XL, XXL',
  'S, M, L': 'S, M, L',
  custom: 'custom',
  none: '',
};

export {
  categories, brands, providers, sizes, typeDelivery
};
