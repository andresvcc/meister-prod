// React and modules
import React, {
  useState
} from 'react';

// react components for routing our app without refresh
import Link from 'next/link';
// @material-ui/core components
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles, makeStyles } from '@material-ui/core/styles';

// core components
import { Div, hookDeviceInfo, redux } from 'components';
import Footer from '@/components/Footer/Footer';
import Body from '@/components/Body/Body';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/layouts/default';
import Logo from '@/components/layouts/headerDescktop/logo';
import currency from '@/assets/JsonDBU/currencies';

// import VideoIntro from '@/elementsClient/VideoIntro/VideoIntro';

// css style

const useStyles = makeStyles(styles);

// Arrays

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 5,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: 'white',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: 'black',
  },
}))(LinearProgress);

export default function Components(props) {
  const { width } = hookDeviceInfo();
  const classes = useStyles();
  const { children, parallax = null, ...rest } = props;
  const [openSearch, setOpenSearch] = useState(false);

  const LinkTo = (props) => {
    const { link, children } = props;
    const [hover, setHover] = useState(false);
    return (
      <span
        type="link2"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: 'pointer', fontWeight: hover ? 'bold' : null,
        }}
      >
        <Link href={link} passHref>
          <span>
            {children}
          </span>
        </Link>
      </span>
    );
  };

  const [{ profilInfo }, dispatch] = redux();

  React.useEffect(() => {
    const lg = profilInfo.language || `${navigator.language.split('-')[0].toUpperCase()}`;
    const current = profilInfo.currency || currency[lg];
    dispatch({ state: 'curentLanguage', value: lg });
    dispatch({ state: 'localCurrency', value: current });
    dispatch({ state: 'navigationInit', value: 'true' });
  }, [profilInfo.currency]);

  if (profilInfo.init === true) {
    return (
      <main>
        <div style={{
          display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', width: '100vw', height: '100vh'
        }}
        >
          <div style={{ width: '160px', height: '130px' }}>
            <Logo />
          </div>
          <div style={{ width: '160px', color: 'black', textAlign: 'center' }}>
            <div style={{
              display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', width: '160px'
            }}
            >
            &nbsp;&nbsp;&nbsp;Loading...
            </div>
            <BorderLinearProgress />
          </div>

        </div>
      </main>
    );
  }

  return (
    <>
      <main style={{ minHeight: '65vh', background: '#FaFaFa' }}>
        <Body>
          <Div
            width="100%"
            style={{
              position: 'absolute', top: 140, left: 0, background: '#d8d8d8', color: '#6d6c6c', fontSize: '0.55em', height: '40px', textAlign: 'center'
            }}
          >
            {width > 600 ? (
              <Div width="100%">

                <Div width="100%" row>
                  NEED ASSISTANCE ? CALL ON
                  {' '}
                  <Div width={3} />
                  <LinkTo link="tel:+41 (0)79 336 61 29"> +41 (0)79 336 61 29</LinkTo>
                  <Div width={3} />
                  OR EMAIL
                  <Div width={3} />
                  <LinkTo link="mailto: moto@meister-engineering.com">MOTO@MEISTER-ENGINEERING.COM</LinkTo>
                </Div>

              </Div>
            ) : (
              <Div width="100%">
                <Div width="100%" row>
                  NEED ASSISTANCE ? CALL ON
                  <Div width={3} />
                  <LinkTo link="tel:+41 (0)79 336 61 29"> +41 (0)79 336 61 29</LinkTo>
                </Div>
                <Div width="100%" row>
                  <Div width={3} />
                  OR EMAIL
                  <Div width={3} />
                  <LinkTo link="mailto: moto@meister-engineering.com"> MOTO@MEISTER-ENGINEERING.COM</LinkTo>
                </Div>
              </Div>
            )}

          </Div>

          <Div height="180px" vertical="top" />
          {children}
          <Div height="50px" />
        </Body>
      </main>

      <footer>
        <Footer />
      </footer>

    </>
  );
}

/*
  NEED ASSISTANCE ? CALL ON MOTO@MEISTER-ENGINEERING.COM
            <LinkTo link="tel:+41 (0)79 336 61 29"> +41 (0)79 336 61 29</LinkTo>
            OR EMAIL
            <LinkTo link="mailto: moto@meister-engineering.com">MOTO@MEISTER-ENGINEERING.COM</LinkTo>
             */
