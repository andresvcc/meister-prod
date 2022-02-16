// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import RedeemIcon from '@material-ui/icons/Redeem';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import TuneIcon from '@material-ui/icons/Tune';
import CreateIcon from '@material-ui/icons/Create';
import DescriptionIcon from '@material-ui/icons/Description';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ReorderIcon from '@material-ui/icons/Reorder';
import SeoIcon from '@material-ui/icons/Fingerprint';

const dashRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    layout: '/admin',
  },
  {
    icon: MonetizationOnIcon,
    path: '/billing',
    name: 'Billings',
    mini: '\xa0\xa0',
    layout: '/admin',
  },
  {
    collapse: true,
    icon: ReorderIcon,
    name: 'Orders',
    mini: '\xa0\xa0',
    layout: '/admin',
    state: 'OrdersCollapse',
    views: [
      {
        path: '/reception',
        name: '1 - Reception',
        mini: '\xa0\xa0',
        layout: '/admin',
      },
      {
        path: '/treatment',
        name: '2 - Treatment',
        mini: '\xa0\xa0',
        layout: '/admin',
      },
      {
        path: '/send',
        name: '3 - Send',
        mini: '\xa0\xa0',
        layout: '/admin',
      },
      {
        path: '/completed',
        name: '4 - Completed',
        mini: '\xa0\xa0',
        layout: '/admin',
      },
    ],
  },
  {
    collapse: true,
    name: 'Products',
    icon: RedeemIcon,
    state: 'ProductsCollapse',
    views: [
      {
        path: '/listproducts',
        name: 'List Products',
        mini: '\xa0\xa0',
        layout: '/admin',
      },
      {
        path: '/parameters',
        name: 'Parameters',
        mini: '\xa0\xa0',
        layout: '/admin',
      },
    ],
  },
  {
    path: '/providers',
    name: 'Providers',
    mini: '\xa0\xa0',
    layout: '/admin',
    icon: ContactPhoneIcon,
  },
  // {
  //   path: '/marketing',
  //   name: 'Marketing',
  //   icon: EqualizerIcon,
  //   layout: '/admin',
  // },
  // {
  //   path: '/logistic',
  //   name: 'Logistics',
  //   icon: AirportShuttleIcon,
  //   layout: '/admin',
  // },
  //
  //  path: '/media',
  //  name: 'Media',
  //  icon: CameraAltIcon,
  //  layout: '/admin',
  // ,
  {
    path: '/faq',
    name: 'FAQ',
    icon: LiveHelpIcon,
    layout: '/admin',
  },
  {
    path: '/journal',
    name: 'Journal',
    icon: DescriptionIcon,
    layout: '/admin',
  },
  {
    path: '/seo',
    name: 'Seo',
    icon: SeoIcon,
    layout: '/admin',
  },
  // {
  //   path: '/motorcycles',
  //   name: 'Motorcycles',
  //   icon: DescriptionIcon,
  //   layout: '/admin',
  // },
];
export default dashRoutes;
