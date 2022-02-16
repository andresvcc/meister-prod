const countries = [
  {
    value: 'AD',
    title: 'Andorre'
  },
  {
    value: 'AE',
    title: 'Emirats Arabes Unis'
  },
  {
    value: 'AF',
    title: 'Afghanistan'
  },
  {
    value: 'AG',
    title: 'Antigua-et-Barbuda'
  },
  {
    value: 'AI',
    title: 'Anguilla'
  },
  {
    value: 'AL',
    title: 'Albanie'
  },
  {
    value: 'AM',
    title: 'Arménie'
  },
  {
    value: 'AO',
    title: 'Angola'
  },
  {
    value: 'AQ',
    title: 'Antarctique'
  },
  {
    value: 'AR',
    title: 'Argentine'
  },
  {
    value: 'AS',
    title: 'Samoa américaines'
  },
  {
    value: 'AT',
    title: 'Autriche'
  },
  {
    value: 'AU',
    title: 'Australie'
  },
  {
    value: 'AW',
    title: 'Aruba'
  },
  {
    value: 'AX',
    title: 'Alland Islands'
  },
  {
    value: 'AZ',
    title: 'Azerbaïdjan'
  },
  {
    value: 'BA',
    title: 'Bosnie-Herzégovine'
  },
  {
    value: 'BB',
    title: 'Barbade'
  },
  {
    value: 'BD',
    title: 'Bangladesh'
  },
  {
    value: 'BE',
    title: 'Belgique'
  },
  {
    value: 'BF',
    title: 'Burkina Faso'
  },
  {
    value: 'BG',
    title: 'Bulgarie'
  },
  {
    value: 'BH',
    title: 'Bahreïn'
  },
  {
    value: 'BI',
    title: 'Burundi'
  },
  {
    value: 'BJ',
    title: 'Bénin'
  },
  {
    value: 'BL',
    title: 'Saint Barthelemy'
  },
  {
    value: 'BM',
    title: 'Bermuda'
  },
  {
    value: 'BN',
    title: 'Brunei Darussalam'
  },
  {
    value: 'BO',
    title: 'Bolivie'
  },
  {
    value: 'BR',
    title: 'Brésil'
  },
  {
    value: 'BS',
    title: 'Bahamas'
  },
  {
    value: 'BT',
    title: 'Bhoutan'
  },
  {
    value: 'BV',
    title: 'Île Bouvet'
  },
  {
    value: 'BW',
    title: 'Botswana'
  },
  {
    value: 'BY',
    title: 'Biélorussie'
  },
  {
    value: 'BZ',
    title: 'Belize'
  },
  {
    value: 'CA',
    title: 'Canada'
  },
  {
    value: 'CC',
    title: 'Îles Cocos (Keeling)'
  },
  {
    value: 'CD',
    title: 'Congo, République démocratique du'
  },
  {
    value: 'CF',
    title: 'République centrafricaine'
  },
  {
    value: 'CG',
    title: 'Congo, République du'
  },
  {
    value: 'CH',
    title: 'Suisse'
  },
  {
    value: 'CI',
    title: "Côte d'Ivoire"
  },
  {
    value: 'CK',
    title: 'Îles Cook'
  },
  {
    value: 'CL',
    title: 'Chili'
  },
  {
    value: 'CM',
    title: 'Cameroun'
  },
  {
    value: 'CN',
    title: 'Chine'
  },
  {
    value: 'CO',
    title: 'Colombie'
  },
  {
    value: 'CR',
    title: 'Costa Rica'
  },
  {
    value: 'CU',
    title: 'Cuba'
  },
  {
    value: 'CV',
    title: 'Cap-Vert'
  },
  {
    value: 'CW',
    title: 'Curaçao'
  },
  {
    value: 'CX',
    title: 'Christmas Island'
  },
  {
    value: 'CY',
    title: 'Chypre'
  },
  {
    value: 'CZ',
    title: 'République tchèque'
  },
  {
    value: 'DE',
    title: 'Allemagne'
  },
  {
    value: 'DJ',
    title: 'Djibouti'
  },
  {
    value: 'DK',
    title: 'Danemark'
  },
  {
    value: 'DM',
    title: 'Dominique'
  },
  {
    value: 'DO',
    title: 'République dominicaine'
  },
  {
    value: 'DZ',
    title: 'Algérie'
  },
  {
    value: 'EC',
    title: 'Equateur'
  },
  {
    value: 'EE',
    title: 'Estonie'
  },
  {
    value: 'EG',
    title: 'Egypte'
  },
  {
    value: 'EH',
    title: 'Sahara occidental'
  },
  {
    value: 'ER',
    title: 'Erythrée'
  },
  {
    value: 'ES',
    title: 'Espagne'
  },
  {
    value: 'ET',
    title: 'Ethiopie'
  },
  {
    value: 'FI',
    title: 'Finlande'
  },
  {
    value: 'FJ',
    title: 'Fidji'
  },
  {
    value: 'FK',
    title: 'Iles Falkland (Malvinas)'
  },
  {
    value: 'FM',
    title: 'Micronésie, États fédérés de'
  },
  {
    value: 'FO',
    title: 'Iles Féroé'
  },
  {
    value: 'FR',
    title: 'France'
  },
  {
    value: 'GA',
    title: 'Gabon'
  },
  {
    value: 'GB',
    title: 'Royaume-Uni'
  },
  {
    value: 'GD',
    title: 'Grenade'
  },
  {
    value: 'GE',
    title: 'Géorgie'
  },
  {
    value: 'GF',
    title: 'Guyane française'
  },
  {
    value: 'GG',
    title: 'Guernesey'
  },
  {
    value: 'GH',
    title: 'Ghana'
  },
  {
    value: 'GI',
    title: 'Gibraltar'
  },
  {
    value: 'GL',
    title: 'Groenland'
  },
  {
    value: 'GM',
    title: 'Gambie'
  },
  {
    value: 'GN',
    title: 'Guinée'
  },
  {
    value: 'GP',
    title: 'Guadeloupe'
  },
  {
    value: 'GQ',
    title: 'Guinée équatoriale'
  },
  {
    value: 'GR',
    title: 'Grèce'
  },
  {
    value: 'GS',
    title: 'Géorgie du Sud et îles Sandwich du Sud'
  },
  {
    value: 'GT',
    title: 'Guatemala'
  },
  {
    value: 'GU',
    title: 'Guam'
  },
  {
    value: 'GW',
    title: 'Guinée-Bissau'
  },
  {
    value: 'GY',
    title: 'Guyane'
  },
  {
    value: 'HK',
    title: 'Hong Kong'
  },
  {
    value: 'HM',
    title: 'Heard Island'
  },
  {
    value: 'HN',
    title: 'Honduras'
  },
  {
    value: 'HR',
    title: 'Croatie'
  },
  {
    value: 'HT',
    title: 'Haïti'
  },
  {
    value: 'HU',
    title: 'Hongrie'
  },
  {
    value: 'ID',
    title: 'Indonésie'
  },
  {
    value: 'IE',
    title: 'Irlande'
  },
  {
    value: 'IL',
    title: 'Israël'
  },
  {
    value: 'IM',
    title: 'Ile de Man'
  },
  {
    value: 'IN',
    title: 'Inde'
  },
  {
    value: 'IO',
    title: "Territoire britannique de l'océan Indien"
  },
  {
    value: 'IQ',
    title: 'Irak'
  },
  {
    value: 'IR',
    title: "Iran, République islamique d '"
  },
  {
    value: 'IS',
    title: 'Islande'
  },
  {
    value: 'IT',
    title: 'Italie'
  },
  {
    value: 'JE',
    title: 'Jersey'
  },
  {
    value: 'JM',
    title: 'Jamaïque'
  },
  {
    value: 'JO',
    title: 'Jordan'
  },
  {
    value: 'JP',
    title: 'Japon'
  },
  {
    value: 'KE',
    title: 'Kenya'
  },
  {
    value: 'KG',
    title: 'Kirghizistan'
  },
  {
    value: 'KH',
    title: 'Cambodge'
  },
  {
    value: 'KI',
    title: 'Kiribati'
  },
  {
    value: 'KM',
    title: 'Comores'
  },
  {
    value: 'KN',
    title: 'Saint Kitts et Nevis'
  },
  {
    value: 'KP',
    title: 'Corée, République populaire démocratique de'
  },
  {
    value: 'KR',
    title: 'Corée, République de'
  },
  {
    value: 'KW',
    title: 'Koweït'
  },
  {
    value: 'KY',
    title: 'Îles Caïmans'
  },
  {
    value: 'KZ',
    title: 'Kazakhstan'
  },
  {
    value: 'LA',
    title: 'République démocratique populaire lao'
  },
  {
    value: 'LB',
    title: 'Liban'
  },
  {
    value: 'LC',
    title: 'Sainte Lucie'
  },
  {
    value: 'LI',
    title: 'Liechtenstein'
  },
  {
    value: 'LK',
    title: 'Sri Lanka'
  },
  {
    value: 'LR',
    title: 'Liberia'
  },
  {
    value: 'LS',
    title: 'Lesotho'
  },
  {
    value: 'LT',
    title: 'Lituanie'
  },
  {
    value: 'LU',
    title: 'Luxembourg'
  },
  {
    value: 'LV',
    title: 'Lettonie'
  },
  {
    value: 'LY',
    title: 'Libye'
  },
  {
    value: 'MA',
    title: 'Maroc'
  },
  {
    value: 'MC',
    title: 'Monaco'
  },
  {
    value: 'MD',
    title: 'Moldavie, République de'
  },
  {
    value: 'ME',
    title: 'Monténégro'
  },
  {
    value: 'MF',
    title: 'Saint Martin (partie française)'
  },
  {
    value: 'MG',
    title: 'Madagascar'
  },
  {
    value: 'MH',
    title: 'Îles Marshall'
  },
  {
    value: 'MK',
    title: 'Macédoine, ancienne République yougoslave de'
  },
  {
    value: 'ML',
    title: 'Mali'
  },
  {
    value: 'MM',
    title: 'Myanmar'
  },
  {
    value: 'MN',
    title: 'Mongolie'
  },
  {
    value: 'MO',
    title: 'Macao'
  },
  {
    value: 'MP',
    title: 'Îles Mariannes du Nord'
  },
  {
    value: 'MQ',
    title: 'Martinique'
  },
  {
    value: 'MR',
    title: 'Mauritanie'
  },
  {
    value: 'MS',
    title: 'Montserrat'
  },
  {
    value: 'MT',
    title: 'Malte'
  },
  {
    value: 'MU',
    title: 'Maurice'
  },
  {
    value: 'MV',
    title: 'Maldives'
  },
  {
    value: 'MW',
    title: 'Malawi'
  },
  {
    value: 'MX',
    title: 'Mexique'
  },
  {
    value: 'MY',
    title: 'Malaisie'
  },
  {
    value: 'MZ',
    title: 'Mozambique'
  },
  {
    value: 'NA',
    title: 'Namibie'
  },
  {
    value: 'NC',
    title: 'Nouvelle Calédonie'
  },
  {
    value: 'NE',
    title: 'Niger'
  },
  {
    value: 'NF',
    title: 'Norfolk Island'
  },
  {
    value: 'NG',
    title: 'Nigeria'
  },
  {
    value: 'NI',
    title: 'Nicaragua'
  },
  {
    value: 'NL',
    title: 'Pays-Bas'
  },
  {
    value: 'NON',
    title: 'Norvège'
  },
  {
    value: 'NP',
    title: 'Népal'
  },
  {
    value: 'NR',
    title: 'Nauru'
  },
  {
    value: 'NU',
    title: 'Niue'
  },
  {
    value: 'NZ',
    title: 'Nouvelle-Zélande'
  },
  {
    value: 'OM',
    title: 'Oman'
  },
  {
    value: 'PA',
    title: 'Panama'
  },
  {
    value: 'PE',
    title: 'Pérou'
  },
  {
    value: 'PF',
    title: 'Polynésie française'
  },
  {
    value: 'PG',
    title: 'Papouasie-Nouvelle-Guinée'
  },
  {
    value: 'PH',
    title: 'Philippines'
  },
  {
    value: 'PK',
    title: 'Pakistan'
  },
  {
    value: 'PL',
    title: 'Pologne'
  },
  {
    value: 'PM',
    title: 'Saint Pierre et Miquelon'
  },
  {
    value: 'PN',
    title: 'Pitcairn'
  },
  {
    value: 'PR',
    title: 'Puerto Rico'
  },
  {
    value: 'PS',
    title: 'Palestine, État de'
  },
  {
    value: 'PT',
    title: 'Portugal'
  },
  {
    value: 'PW',
    title: 'Palau'
  },
  {
    value: 'PY',
    title: 'Paraguay'
  },
  {
    value: 'QA',
    title: 'Qatar'
  },
  {
    value: 'RE',
    title: 'Réunion'
  },
  {
    value: 'RO',
    title: 'Roumanie'
  },
  {
    value: 'RS',
    title: 'Serbie'
  },
  {
    value: 'RU',
    title: 'Fédération de Russie'
  },
  {
    value: 'RW',
    title: 'Rwanda'
  },
  {
    value: 'SA',
    title: 'Arabie saoudite'
  },
  {
    value: 'SB',
    title: 'Îles Salomon'
  },
  {
    value: 'SC',
    title: 'Seychelles'
  },
  {
    value: 'SD',
    title: 'Soudan'
  },
  {
    value: 'SE',
    title: 'Suède'
  },
  {
    value: 'SG',
    title: 'Singapour'
  },
  {
    value: 'SH',
    title: 'Sainte-Hélène'
  },
  {
    value: 'SI',
    title: 'Slovénie'
  },
  {
    value: 'SJ',
    title: 'Svalbard et Jan Mayen'
  },
  {
    value: 'SK',
    title: 'Slovaquie'
  },
  {
    value: 'SL',
    title: 'Sierra Leone'
  },
  {
    value: 'SM',
    title: 'Saint-Marin'
  },
  {
    value: 'SN',
    title: 'Sénégal'
  },
  {
    value: 'SO',
    title: 'Somalie'
  },
  {
    value: 'SR',
    title: 'Suriname'
  },
  {
    value: 'SS',
    title: 'Soudan du Sud'
  },
  {
    value: 'ST',
    title: 'Sao Tomé-et-Principe'
  },
  {
    value: 'SV',
    title: 'El Salvador'
  },
  {
    value: 'SX',
    title: 'Sint Maarten (partie néerlandaise)'
  },
  {
    value: 'SY',
    title: 'République arabe syrienne'
  },
  {
    value: 'SZ',
    title: 'Swaziland'
  },
  {
    value: 'TC',
    title: 'Iles Turques et Caïques'
  },
  {
    value: 'TD',
    title: 'Tchad'
  },
  {
    value: 'TF',
    title: 'Terres australes françaises'
  },
  {
    value: 'TG',
    title: 'Togo'
  },
  {
    value: 'TH',
    title: 'Thaïlande'
  },
  {
    value: 'TJ',
    title: 'Tadjikistan'
  },
  {
    value: 'TK',
    title: 'Tokelau'
  },
  {
    value: 'TL',
    title: 'Timor-Leste'
  },
  {
    value: 'TM',
    title: 'Turkménistan'
  },
  {
    value: 'TN',
    title: 'Tunisie'
  },
  {
    value: 'TO',
    title: 'Tonga'
  },
  {
    value: 'TR',
    title: 'Turquie'
  },
  {
    value: 'TT',
    title: 'Trinité-et-Tobago'
  },
  {
    value: 'TV',
    title: 'Tuvalu'
  },
  {
    value: 'TW',
    title: 'Taiwan, Province de Chine'
  },
  {
    value: 'TZ',
    title: 'République-Unie de Tanzanie'
  },
  {
    value: 'UA',
    title: 'Ukraine'
  },
  {
    value: 'UG',
    title: 'Ouganda'
  },
  {
    value: 'US',
    title: 'États-Unis'
  },
  {
    value: 'UY',
    title: 'Uruguay'
  },
  {
    value: 'UZ',
    title: 'Ouzbékistan'
  },
  {
    value: 'VA',
    title: 'Saint-Siège (État de la Cité du Vatican)'
  },
  {
    value: 'VC',
    title: 'Saint Vincent et les Grenadines'
  },
  {
    value: 'VE',
    title: 'Venezuela'
  },
  {
    value: 'VG',
    title: 'Îles Vierges britanniques'
  },
  {
    value: 'VI',
    title: 'Îles Vierges américaines'
  },
  {
    value: 'VN',
    title: 'Vietnam'
  },
  {
    value: 'VU',
    title: 'Vanuatu'
  },
  {
    value: 'WF',
    title: 'Wallis et Futuna'
  },
  {
    value: 'WS',
    title: 'Samoa'
  },
  {
    value: 'XK',
    title: 'Kosovo'
  },
  {
    value: 'OUI',
    title: 'Yémen'
  },
  {
    value: 'YT',
    title: 'Mayotte'
  },
  {
    value: 'ZA',
    title: 'Afrique du Sud'
  },
  {
    value: 'ZM',
    title: 'Zambie'
  },
  {
    value: 'ZW',
    title: 'Zimbabwe'
  }
];

export default countries;
