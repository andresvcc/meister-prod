import React, { useEffect } from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Div } from 'components';
import Spam from '@/components/Typography/Spam';

// core components
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/errorPageStyles';
import Layout from '@/layouts/simple';

const useStyles = makeStyles(styles);

function Home(props) {
  const classes = useStyles();

  const a = ['a', 'b', 'c'];
  a[100] = 'd';

  return (
    <Div width="90%">
      {JSON.stringify({ a: a.length })}
    </Div>
  );
}

export default Home;
