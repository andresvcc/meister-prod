// React and modules
import React from 'react';
import { useRouter } from 'next/router';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

// @material-ui/icons
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

// fonctions
import getBgImage from '@/layouts/functions/getBgImage';

// core components
import Footer from '@/components/Footer/Footer';

// others
import styles from '@/assets/jss/nextjs-material-dashboard-pro/layouts/adminStyle';
import ItemBar from '@/components/Navbars/AuthFiles/ItemBar';

const itemsBar = [{
  href: '/auth/login-page',
  label: 'Login',
  Icon: FingerprintIcon,
}, {
  href: '/auth/register-page',
  label: 'Register',
  Icon: PersonAddIcon,
}, {
  href: '/auth/lock-screen-page',
  label: 'Recpvery password',
  Icon: VerifiedUserIcon,
},
];

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const { children, ...rest } = props;
  // used for checking current route
  const router = useRouter();
  // styles
  const classes = useStyles();

  const list = (
    <List className={classes.list}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ width: '100%' }}
      >
        {itemsBar.map((itemBar) => <ItemBar key={itemBar.label} {...itemBar} />)}
      </Grid>
    </List>
  );

  return (
    <div className={classes.wrapperAuth}>
      <div
        className={classes.fullPage}
        style={{ backgroundImage: `url(${getBgImage(router.route)})` }}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ width: '100%' }}
        >
          <div className={classes.childrenPlace}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              alignItems="center"
            >
              {children}
            </Grid>
          </div>
          <div className={classes.barMenu}>
            {list}
          </div>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
