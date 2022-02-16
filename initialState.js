import profilInfo from '@/assets/dataBase/DbProfil';
import adminProfilInfo from '@/assets/dataBase/DbadminProfil';
import JournalItems from '@/assets/dataBase/DbJournal';
import notifications from '@/assets/dataBase/DbNotification';
// marketing
import DbDashboard from '@/assets/dataBase/DbDashboard';
import DbSales from '@/assets/dataBase/DbSales';
import DbVisites from '@/assets/dataBase/DbVisites';

export default {
  profilInfo,
  adminProfilInfo,
  dsa: [
    DbDashboard,
    DbSales,
    DbVisites,
  ],
  JournalItems,
  currencyRates: {
    USD: 1, CHF: 0.92, EUR: 0.84, GBP: 0.72
  },
  localCurrency: 'USD',
  curentLanguage: 'EN',
  countryTVA: 'CH',
  tva: 0.077,
  productList: { none: true },
  globalSettings: { none: true },
  faqJournal: { none: true },
  articlesJournal: { none: true },
  providers: { none: true },
  dialogBag: 'false',
  notifications,
  sessions: {
    taps: [], age: null, ageUpdate: null
  },
  flexForm: { id: '', errors: [] }
};
