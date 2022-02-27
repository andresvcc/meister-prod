import {
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  grayColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

import loginPageTypo from './TypographieType/loginPageTypo';

import typographieHome from './TypographieType/homePageTypo';
import defaultTypo from './TypographieType/defaultTypo';

const proportion1 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '15px',
    lineHeight: '1.5em'
  },
  [theme.breakpoints.only('sm')]: {
    fontSize: '18px',
    lineHeight: '25px'
  },

  [theme.breakpoints.only('xl')]: {
    fontSize: '18px',
    lineHeight: '30px'
  },
});

const proportion10 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
    lineHeight: '1.3em'
  },
  [theme.breakpoints.only('sm')]: {
    fontSize: '15px',
    lineHeight: '25px'
  },

  [theme.breakpoints.only('xl')]: {
    fontSize: '18px',
    lineHeight: '30px'
  },
});

const proportion2 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '12px',
  },
  [theme.breakpoints.only('sm')]: {
    lineHeight: '25px'
  },
  [theme.breakpoints.only('xl')]: {
    lineHeight: '25px'
  },
});

const proportion3 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '15px'
  },
});

const proportion32 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '18px'
  }
});

const proportion34 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '36px',
  },
  [theme.breakpoints.only('sm')]: {
    fontSize: '46px',
  },
  [theme.breakpoints.only('xl')]: {
    fontSize: '36px',
  },
});

const proportion4 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '24px',
  },
});

const proportion5 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',

  },
});
const proportion6 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '11px',
  },
});

const proportionConf = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '15px',
    lineHeight: '35px'
  },
  [theme.breakpoints.only('sm')]: {
    fontSize: '19px',
  },
  [theme.breakpoints.only('xl')]: {
    fontSize: '19px',
  },
});

// About us
const proportionAboutUs1 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '20px',
  },
});
const proportionAboutUs2 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '15px',
    lineHeight: '1.4em'
  },
});
  // uniformisation
const proportion7 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '22px',
    lineHeight: '28px'
  },
  [theme.breakpoints.only('sm')]: {
    fontSize: '22px',
    lineHeight: '25px'
  },

  [theme.breakpoints.only('xl')]: {
    fontSize: '24px',
    lineHeight: '30px'
  },
});

// Produit unique
const proportionSuggestion = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '17px',
  },
});

// Terms of service
const proportionTerms1 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
  },
});
const proportionTerms2 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '15px',
    lineHeight: '1.3em',
  },
});
const proportionTerms3 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '15px',
    lineHeight: '1.2em',
  },
});
// User Profile
const userProfile1 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '19px',
  },
});
const userProfile2 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
  },
});
// Checkout
const checkout1 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '15px',
  },
});

const proportionJournal = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '19px',
    lineHeight: '19px',

  },
  [theme.breakpoints.only('sm')]: {
    lineHeight: '25px',
    fontSize: '20px',
  },
  [theme.breakpoints.only('xl')]: {
    lineHeight: '25px',
  },
});

const proportionJournal2 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '19px',
    lineHeight: '20px',

  },
  [theme.breakpoints.only('sm')]: {
    lineHeight: '25px',
    fontSize: '25px',
  },
  [theme.breakpoints.only('xl')]: {
    lineHeight: '25px',
  },
});

const fontsize2 = '18px';
const nortStyle = 'GeorgiaBold';

// MISE A JOUR DES FONTS
const typographyStyle = (theme) => ({
  ...(typographieHome(theme)),
  ...(defaultTypo(theme)),
  ...(loginPageTypo(theme)),
  defaultFontStyle: {
    // ...defaultFont,
    fontSize: '14px',
  },

  subtitle4: {
    fontSize: '14px',
    fontWeight: '500',
    ...proportion6(theme),
  },
  subtitle4Green: {
    fontSize: '18px',
    fontWeight: '500',
    color: 'green',
    ...proportion6(theme),
  },

  subtitle4Greens: {
    fontFamily: 'Gorgia',
    fontSize: '18px',

    ...proportionConf(theme),
  },
  // Email verification
  white: {
    color: 'white'
  },
  // Home page - homepub
  testTypo: {
    fontFamily: 'NovaLight, sans serif',
    fontSize: '17px',
    lineHeight: '1.5em',
    ...proportion1(theme)
  },
  testTypo2: {
    fontFamily: 'NovaLight, sans serif',
    fontSize: '17px',
    lineHeight: '1.5em',
    textAlign: 'center',
    ...proportion1(theme)
  },

  warning: {
    color: warningColor[0]
  },
  danger: {
    color: dangerColor[0]
  },
  h2: {
    fontSize: '28px'
  },
  h3: {
    fontSize: '22px'
  },
  h6: {
    fontSize: '14px',
    fontWeight: 'semi-bold'
  },
  subtitle1: {
    fontSize: fontsize2
  },
  subtitle2: {
    fontSize: '16px'
  },
  subtitle3: {
    fontSize: '14px',
  },

  subtitle5: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  // checkout add address
  subtitle5_2: {
    fontSize: '15px',
    fontWeight: 'bold'
  },
  paragraph2: {
    fontSize: '14px'
  // Liens
  },
  link1: {
    fontSize: fontsize2,
    color: '#026eb1',
    textDecoration: 'underline',
  },
  // dans register
  link2: {
    fontSize: '16px',
    color: '#026eb1',
    textDecoration: 'underline',
  },
  link3: {
    fontSize: '14px',
    color: '#026eb1',
    textDecoration: 'underline',
  },
  // Ordinateur
  serifTitle: {
    fontFamily: 'GeorgiaLight', fontSize: '19px'
  },
  serifTitleBold: {
    fontFamily: nortStyle,
    fontSize: '22px',
    fontWeight: 'bold'
  },
  serifDescription: {
    fontFamily: 'NovaLight, sans serif',
    fontSize: '18px',
  },

  serifDescriptionBoldBold: {
    fontFamily: 'NovaLight, sans serif',
    fontSize: '20px',
    fontWeight: 'bold',
    ...proportion32(theme),
  },
  serifDescriptionBold: {
    fontFamily: 'NovaLight, sans serif',
    fontSize: '18px',
    ...proportion3(theme),
  },

  // tablette
  serifTitle2: {
    fontFamily: nortStyle,
    fontSize: '19px',
  },
  serifDescription2: {
    fontFamily: nortStyle,
    fontSize: '15px',
  },
  serifTitle3: {
    fontFamily: 'Taviraj, serif',
    fontSize: '19px',

  },

  // about US
  aboutTitle1: {
    fontFamily: 'Taviraj, serif',
    fontSize: '30px',
    fontWeight: 400,
    color: 'white'
  },
  aboutTitle1Xs: {
    fontFamily: 'Taviraj, serif',
    fontSize: '15px',
    fontWeight: 400,
    color: 'white'
  },
  aboutSmallTitle1: {
    fontFamily: 'GorgiaLight',
    fontSize: '20px',
    fontWeight: 400,
    color: 'white'
  },
  aboutSmallTitle2: {
    fontFamily: 'Taviraj, serif',
    fontSize: '20px',
    fontWeight: 400,
    color: 'black'
  },

  aboutSmallDescription2: {
    fontFamily: 'Taviraj, serif',
    fontSize: '15px',
    color: 'black'
  },
  aboutDescription2: {
    fontFamily: 'Taviraj, serif',
    fontSize: '20px',
    color: 'black'
  },
  // produit Unique
  produitUniqueFournisseur: {
    fontFamily: 'NovaLight, sans serif',
    fontSize: '15px',
    fontWeight: 500,
    color: '#68686890',
  },
  produitUniqueFournisseur2: {
    fontFamily: 'NovaLight, sans serif',
    fontSize: '13px',
    fontWeight: 500,
    color: '#660000',
  },
  produitUniqueTitle: {
    fontFamily: 'Gorgialight',
    fontSize: '20px',
    fontWeight: '400',
    color: 'black',
  },

  //  a supprimer
  produitUniqueSmall: {
    fontFamily: 'Taviraj, serif',
    fontSize: '15px',
    color: 'white'
  },
  // imputDate
  TitleInputDate: {
    textTransform: 'none',
    lineHeight: '1.25',
    fontSize: '1em',
    fontWeight: 500,
    fontFamily: 'Georgia',
    margin: '0 auto 12px',
    textAlign: 'center',
    fontSmoothing: 'antialiased',
    '-webkit-font-smoothing': 'antialiased',
    color: '#cdcdcd9c'
  },
  InputDate: {
    textTransform: 'none',
    lineHeight: '1.25',
    fontSize: '1.3em',
    fontWeight: 500,
    fontFamily: 'Georgia',
    margin: '0 auto 12px',
    textAlign: 'center',
    fontSmoothing: 'antialiased',
    '-webkit-font-smoothing': 'antialiased',
    color: '#b8c8cd'
  },

  // journal
  JournalTitleDocument: {
    textTransform: 'none',
    lineHeight: '1.25',
    fontSize: '1.5em',
    fontWeight: 500,
    fontFamily: 'Georgia',
    margin: '0 auto 12px',
    textAlign: 'center',
    fontSmoothing: 'antialiased',
    '-webkit-font-smoothing': 'antialiased',
  },
  JournalAuthorDocument: {
    textTransform: 'none',
    lineHeight: '1.28',
    fontSize: '0.9em',
    fontWeight: 500,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    margin: '0 auto 12px',
    textAlign: 'center',
    fontSmoothing: 'antialiased',
    '-webkit-font-smoothing': 'antialiased',
  },
  JournalDateDocument: {
    color: 'rgba(101,101,101,1)',
    textTransform: 'none',
    lineHeight: '1.28',
    fontSize: '0.8em',
    fontWeight: 500,
    fontFamily: 'Georgia, MSung PRC Medium',
    fontStyle: 'italic',
    margin: '0 auto 12px',
    textAlign: 'center',
    fontSmoothing: 'antialiased',
    '-webkit-font-smoothing': 'antialiased',
  },
  JournalDescription1: {
    fontFamily: 'Taviraj, serif',
    fontSize: fontsize2,
    fontWeight: '500',
    color: '#0000080'
  },
  JournalDescription2: {
    fontFamily: 'Taviraj, serif',
    fontSize: fontsize2,
    fontWeight: '500',
    color: 'white'
  },
  // JournalCard
  JournalCardTitle: {
    fontFamily: 'Taviraj, serif',
    fontSize: '14px',

  },
  JournalCardDescription: {
    fontFamily: 'Taviraj, serif',
    fontSize: '12px',
    color: 'grey',
  },
  // userProfile
  userProfile: {
    fontFamily: 'PT Serif Caption, serif',
    fontSize: '17px',
    color: 'black'
  },
  // Add address
  addAddress: {
    fontFamily: 'PT Serif Caption, serif',
    fontSize: '15px',
    color: 'black'
  },
  // profile
  profile: {
    fontFamily: 'PT Serif Caption, serif',
    fontSize: '15px',
    textTransform: 'capitalize',
    color: 'black'
  },
  // index
  titleHover: {
    fontFamily: 'Taviraj, serif',
    fontSize: '30px',
    fontWeight: 400,
    color: 'white'
  },
  // categories images
  buttonShopNow1: {
    fontFamily: 'GorgiaBold',
    fontSize: fontsize2,
    fontWeight: 400,
    color: 'white'
  },
  buttonShopNow2: {
    fontFamily: 'GorgiaBold',
    fontSize: '15px',
    fontWeight: 400,
    color: 'white'
  },

  journalMainTitle: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '50px',
    fontWeight: 400,
    color: 'white',
    textTransform: 'uppercase'
  },
  journalMainTitle1: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '30px',
    fontWeight: 400,
    color: 'white',
    textTransform: 'uppercase'
  },
  journalMainDescription: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '25px',
    fontWeight: 400,
    color: 'white'
  },
  journalMainDescription1: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '15px',
    fontWeight: 400,
    color: 'white'
  },
  // journal Card
  readMore: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '17px',
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase'
  },
  // txt journal
  txtJournal1: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    textTransform: 'capitalize'
  },
  txtJournal2: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '15px',
    textTransform: 'capitalize'
  },
  // Txt journal ititle
  txtJournalTitle: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  // drawer

  txtJournalTitle2: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '17px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  txtJournalTitle3: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '17px',
    fontWeight: 'bold',
    color: 'grey',
    textTransform: 'uppercase'
  },
  TxtLogin: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase'
  },

  // success payment
  successPayment: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '26px',
    color: '#008f39',
    textTransform: 'capitalize'
  },
  successPayment2: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '15px',
    color: '#006400',
    textTransform: 'uppercase'
  },
  successPayment3: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '17px',
    ...proportion5(theme),
    color: 'black',
  },

  categorieFont: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '16px',
    color: 'black',
  },
  categorieFontBold: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '16px',
    color: 'black',
    fontWeight: 'bold'
  },

  testTypoTitle: {
    fontFamily: 'NovaBold, sans serif',
    fontSize: '20px',
  },
  testTypo2: {
    fontFamily: 'GorgiaBold',
    fontSize: '20px',
  },
  testTypo3: {
    fontFamily: 'NovaLight, sans serif',
    fontSize: '18px',
    lineHeight: '1.3em',
    ...proportion1(theme)
  },
  testTypo3Btn: {
    fontFamily: 'NovaLight, sans serif',
    fontSize: '18px',
    lineHeight: '1.3em',
    ...proportion10(theme)
  },
  testTypo2White: {
    fontFamily: 'GeorgiaLight',
    fontSize: '23px',
    color: 'white',
    ...proportion2(theme)
  },

  testTypo3White: {
    fontFamily: 'NovaLight, sans serif',
    fontSize: '17px',
    color: 'white',
    ...proportion2(theme)
  },

  // Uniformisation des typographies

  shopNow: {
    fontFamily: 'GeorgiaLight',
    fontSize: '20px',
    color: 'white',
    textTransform: 'capitalize',
    ...proportion3(theme)
  },
  shopNowBlack: {
    fontFamily: 'GeorgiaLight',
    fontSize: '20px',
    color: 'black',
    textTransform: 'capitalize',
    ...proportion3(theme)
  },

  // Title des scrolls
  scrollTitle: {
    fontFamily: 'GeorgiaLight',
    fontSize: '25px',
    ...proportion4(theme)
  },
  cardProduct: {
    fontFamily: 'Georgia',
    fontWeight: '50',
    fontSize: '15px',
    color: 'black',
    textTransform: 'capitalize'
  },
  cardProductWhite: {
    fontFamily: 'Georgia',
    fontWeight: '50',
    fontSize: '15px',
    color: 'white',
    textTransform: 'capitalize'
  },

  // Login title

  shipPay: {
    fontFamily: 'GorgiaBold',
    fontSize: '20px',
    color: 'black',
    textTransform: 'capitalize'
  },
  shipPayInfo: {
    fontFamily: 'GorgiaBold',
    fontSize: '15px',
    color: 'black',
    textTransform: 'capitalize'
  },
  shipPayInfo_2: {
    fontFamily: 'GorgiaBold',
    fontSize: '14px',
    color: 'black',
    textTransform: 'capitalize'
  },
  BillingNum: {
    fontFamily: 'NovaLight',
    fontSize: '20px',
    ...proportion3(theme),
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  BillingNumInfo: {
    fontFamily: 'NovaLight',
    fontSize: '17px',
    ...proportion3(theme),
    color: 'black',
    textTransform: 'capitalize'
  },

  // Vrai uniformisation -------

  // Produit unique
  h2GreyBold: {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '13px',
    textAlign: 'center',
    color: '#888888',
    letterSpacing: '0.13em !important',
    textTransform: 'uppercase'
  },
  h1TitleBold: {
    fontFamily: 'GeorgiaLight',
    fontSize: '25px',
    ...proportion7(theme),
    fontWeight: '400',
    color: 'black',
  },
  produitUniqueDescription: {
    fontFamily: 'GeorgiaLight',
    fontSize: '17px',
    color: 'black',
    wordSpacing: '0px',
    lineHeight: '20px',
    fontWeight: '500',
  },
  produitUniqueSizes: {
    fontFamily: 'NovaLight',
    fontSize: '14px'
  },
  produitUniqueDownTitle: {
    fontFamily: 'NovaLight',
    fontSize: '14px',
    fontWeight: 600,
  },

  produitUniqueDownDescription: {
    fontFamily: 'GeorgiaLight',
    lineHeight: '1.3em',
    fontSize: '16px',
  },

  suggestionFont: {
    fontFamily: 'GeorgiaLight',
    fontSize: '20px',
    ...proportionSuggestion(theme)
  },
  // About us: 4 typographies
  TitleBlack: {
    fontFamily: 'NovaLight',
    fontSize: '20px',
    ...proportionAboutUs1(theme),
    fontWeight: 400,
    color: 'black'
  },
  DescriptionBlack: {
    fontFamily: 'GeorgiaLight',
    fontSize: '20px',
    ...proportionAboutUs2(theme),
    lineHeight: '1.4em',
    fontWeight: 400,
    color: 'black'
  },
  TitleWhite: {
    fontFamily: 'NovaLight',
    fontSize: '20px',
    ...proportionAboutUs1(theme),
    fontWeight: 400,
    color: 'white'
  },
  DescriptionWhite: {
    fontFamily: 'GeorgiaLight',
    fontSize: '20px',
    ...proportionAboutUs2(theme),
    lineHeight: '1.4em',
    fontWeight: 400,
    color: 'white'
  },

  // Drawer menu mobile:
  drawerNavTitles: {
    fontFamily: 'GeorgiaLight',
    fontSize: '17px',
  },
  // terms and service

  termsTitle: {
    fontFamily: 'GorgiaBold',
    fontSize: '19px',
    ...proportionTerms1(theme),
  },
  termsDescription: {
    fontFamily: 'GeorgiaLight',
    fontSize: '17px',
    lineHeight: '1.3em',
    ...proportionTerms2(theme)
  },
  termsBigTitle: {
    fontFamily: 'GorgiaBold',
    fontSize: '25px',
    fontWeight: 'bold',
    ...proportionTerms3(theme),
  },
  // userProfile
  titleOrders: {
    fontFamily: 'GeorgiaLight',
    fontSize: '30px',
    ...userProfile1(theme),
    color: 'black'
  },
  seeOrder: {
    fontFamily: 'GorgiaBold',
    fontSize: '16px',
    ...userProfile2(theme),
    color: 'white'
  },
  checkOut: {
    fontFamily: 'NovaLight',
    fontSize: '16px',
    ...checkout1(theme),
    color: 'black'
  },
  // Journal Typo
  journalTitleFont1: {
    textTransform: 'capitalize',
    fontWeight: '500',
    fontFamily: 'Gorgia',
    fontSize: '23px',
    lineHeight: '25px',
    ...proportionJournal(theme)
  },

  journalTitleFont2: {
    textTransform: 'capitalize',
    fontWeight: '500',
    fontFamily: 'Gorgia',
    fontSize: '28px',
    lineHeight: '35px',
    ...proportionJournal2(theme)
  },

  titleYellow: {
    fontFamily: 'Gorgialight',
    fontSize: '20px',
    fontWeight: '800',
    color: '#ffc107',
  },

  motorcycleTitle: {
    fontFamily: 'PT Serif Caption, serif',
    fontSize: '20px',
    fontWeight: 500,
    color: 'white',
  },

  motorCycleDetail: {
    fontFamily: 'GeorgiaLight',
    fontSize: '40px',
    fontWeight: 800,
    lineHeight: '1.3em',
    ...proportionTerms2(theme)
  },
});

export default typographyStyle;
