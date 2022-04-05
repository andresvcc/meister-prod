/* eslint-disable no-underscore-dangle */
// Header - profil - Desktop
import React, { useState, useEffect, useRef } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import useMouseLeave from 'use-mouse-leave';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
// components
import { redux, Div } from 'components';
import LoginForm from 'elementsClient/Forms/loginClient';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import SocialLogin from 'react-social-login';
import Button from '@/components/CustomButtons/Button';
import GridContainer from '@/components/Grid/GridContainer';
import Spam from '@/components/Typography/Spam';
import GridItem from '@/components/Grid/GridItem';
// elements
// assets
import googleIcon from '@/assets/img/google.png';
import facebookIcon from '@/assets/img/facebook.png';
// material ui
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/headerLinksStyle';
import { grayColor } from '@/assets/jss/nextjs-material-dashboard-pro';

const useStyles2 = makeStyles(styles);

// Styles
const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    right: -20,
    top: 55,
    zIndex: 9,
    width: '500px',
    background: 'white',

  },
  dialogMobile: {
    position: 'absolute',
    right: 'auto',
    top: 60,
    width: '100%'
  },
  number: {
    fontSize: '1.1em',
    marginTop: '10px',
    fontFamily: 'GorgiaLight'
  },
  total: {
    textAlign: 'right',
    minWidth: '80px',
    fontWeight: '300',
    color: grayColor[2]
  },
  btCheckout: {
    width: '90%',
    height: '40px',
    marginBottom: '20px',
    fontSize: '0.9em',
    fontFamily: 'GorgiaLight'
  }
});

const LinkTo = (props) => {
  const { link, children } = props;
  const [hover, setHover] = useState(false);
  return (
    <span
      type="link2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer', textDecoration: 'underline', color: hover ? 'black' : 'grey',
      }}
    >
      <Link href={link} passHref>
        {children}
      </Link>
    </span>
  );
};

const LinkTo2 = (props) => {
  const { link, children } = props;
  const [hover, setHover] = useState(false);
  return (
    <span
      type="link2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer', textDecoration: hover ? 'underline' : 'none', color: hover ? 'black' : 'grey',
      }}
    >
      <Link href={link} passHref>
        {children}
      </Link>
    </span>
  );
};

// Divider line pour le OR entre formulaire et SocialButton
const DividerLine = () => (
  <Div width="100%" height="20px" horizontal="left">
    <Spam type="subtitle3"><LinkTo2 link="/login?option=recovery"><span>Forgotten Password ?</span></LinkTo2></Spam>
  </Div>
);

const SocialButton = (props) => {
  const {
    title, image, disabled, ...rest
  } = props;

  return (
    <Button disabled={disabled} color="white" style={{ width: '100%', border: '1px solid #00000050', boxShadow: 'none' }} {...rest}>
      <Div width="100%" height="90%" row horizontal="around">
        <Div>
          <Image src={image} alt="..." height="30px" width="30px" className="iconRound" />
        </Div>
        <Div>
          <Spam type="subtitle3">{title}</Spam>
        </Div>
      </Div>
    </Button>
  );
};

// eslint-disable-next-line no-return-assign
function useIsMountedRef() { const isMountedRef = useRef(null); useEffect(() => { isMountedRef.current = true; return () => isMountedRef.current = false; }); return isMountedRef; }

const SocialButtonGoogle = ({ children, triggerLogin, ...props }) => {
  const isMountedRef = useIsMountedRef();

  const click = (a) => {
    if (isMountedRef.current) {
      triggerLogin(a);
    }
  };

  return (
    <SocialButton onClick={click} {...isMountedRef.current ? { ...props } : {}} title="Continue with Google" image={googleIcon} />
  );
};

// const GoogleSocialLogin = SocialLogin(SocialButtonGoogle);

const ErrorMsg = ({ message, i }) => (message !== '' ? <Spam type="subtitle4" color="danger">{message}</Spam> : null);

const notificationsKeys = ['profile', 'logout'];

export default function BagCardDialog(props) {
  const { useSocketHook, socialLogin, setSocialLogin } = props;
  const [emit, socket] = useSocketHook;
  const [open, setOpen] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const [hover, sethover] = useState(false);
  const [errorsApi, setErrorApi] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const classes2 = useStyles2();
  const [{ profilInfo }, dispatch] = redux();
  const {
    countryTVA, language, currency, tva
  } = profilInfo;
  const [mouseLeft, ref] = useMouseLeave();

  const router = useRouter();

  const handleClose = async () => {
    document.body.style.overflow = 'initial';
    setOpen(false);
  };

  const login = (data) => {
    if (data.email && data.password) {
      setLoading(true);
      emit('login', data);
      setErrorApi([]);
    } else {
      const missingErrMsg = ['Missing fields in the form'];
      if (JSON.stringify(missingErrMsg) !== JSON.stringify(errorsApi)) setErrorApi(missingErrMsg);
    }
  };

  const loginSocial = (data) => {
    if (data.email && data.userID) {
      setLoading(true);
      emit('loginSocial', data);
    }
  };

  const goingTo = (params) => {
    if (params === 'logout') {
      if (socialLogin?.provider === 'facebook') {
        window.FB.logout();
      }
      if (socialLogin?.provider === 'google') {
        console.log('logout google');
      }
      emit('logout', {
        countryTVA, language, currency, tva
      });
      setSocialLogin(null);
      handleClose();
      router.push({
        pathname: router.pathname,
        query: { ...(router.query || {}) },
      });
    } else if (params === 'profile') {
      router.push({
        pathname: '/userProfil',
      });
    } else {
      router.push({
        pathname: '/login',
        query: { option: params },
      });
    }
  };

  const handleClick = (event) => {
    setOpen(true);
    setOpenActive(true);
  };

  const allClose = () => {
    setOpen(false);
    setOpenActive(false);
    sethover(false);
  };

  const overAction = (event) => {
    setOpen(true);
  };

  const handleCloseNotification = () => {
    setOpen(false);
  };

  const loginFacebook = () => {
    window.FB.getLoginStatus((response) => {
      if (response?.status === 'unknown') {
        window.FB.login((responseLogin) => {
          if (responseLogin.status === 'connected') {
            window.FB.api(
              `/${responseLogin.authResponse.userID}?fields=name,email&access_token=${responseLogin.authResponse.accessToken}/`,
              (res) => {
                if (res && !res.error) {
                  setSocialLogin({
                    ...res, ...responseLogin.authResponse, status: responseLogin.status, provider: 'facebook'
                  });
                }
              }
            );
          }
        });
      }
    });
  };

  const loginGoogle = (googleUser) => {
    console.log('googleUser', googleUser);

    const user = {
      accessToken: googleUser.accessToken,
      data_access_expiration_time: googleUser.tokenObj.expires_at,
      email: googleUser.profileObj.email,
      expiresIn: googleUser.tokenObj.expires_in,
      graphDomain: googleUser.tokenObj.scope,
      id: googleUser.googleId,
      name: googleUser.profileObj.name,
      provider: 'google',
      signedRequest: googleUser.tokenObj.id_token,
      status: 'connected',
      userID: googleUser.profileObj.googleId,
    };

    setSocialLogin(user);
  };

  useEffect(() => {
    sethover(!mouseLeft);
  }, [mouseLeft]);

  const dropdownItem = classNames(classes2.dropdownItem, classes2.primaryHover);

  useEffect(() => {
    if (socialLogin?.status === 'connected') {
      const { name } = socialLogin;
      const [fname, ...lname] = `${name}`.split(' ');
      loginSocial({
        email: socialLogin.email, userID: socialLogin.userID, provider: socialLogin.provider, fname, lname: `${lname.join(' ')}`
      });
    }
  }, [socialLogin]);

  useEffect(() => {
    if (socket) {
      socket.on('loginRes', (a) => {
        // console.clear();
      });
    }
  }, [socket]);

  if (profilInfo.registered) {
    return (
      <Div width="100%" onHover={(a) => { if (a === false) handleCloseNotification(); }}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notifications"
          aria-owns="notification-menu-list"
          aria-haspopup="true"
          className={classes2.buttonLink}
          style={{
            padding: 0, margin: 0, fontSize: '14px', position: 'absolute', top: 0
          }}
          onClick={handleClick}
          onMouseEnter={overAction}
        >
          <PersonIcon style={{ width: '25px', height: '25px' }} />
        </Button>
        {
          open || hover || openActive ? (
            <Div
              width="130px"
              style={{
                background: 'transparent',
                position: 'absolute',
                top: 35,
                right: '10px',
                paddingBottom: '5px'
              }}
            >
              <div className="dialogContaineProfileLogin">
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    {
                      notificationsKeys.map((val) => (
                        <MenuItem
                          onClick={() => goingTo(val)}
                          className={dropdownItem}
                          key={val}
                        >
                          <Div
                            horizontal="left"
                            style={{ fontFamily: 'NovaLight, sans serif', fontSize: '15px', textTransform: 'capitalize' }}
                          >
                            {val}
                          </Div>
                        </MenuItem>
                      ))
                    }
                  </MenuList>
                </ClickAwayListener>
              </div>
            </Div>
          ) : null
        }
      </Div>
    );
  }

  return (
    <Div width="100%" onHover={(a) => setOpen(a)}>
      <Button
        color="transparent"
        justIcon
        aria-label="Notifications"
        aria-owns="notification-menu-list"
        aria-haspopup="true"
        className={classes2.buttonLink}
        style={{
          padding: 0, margin: 0, fontSize: '14px', position: 'absolute', top: 0
        }}
        onClick={handleClick}
        onMouseEnter={overAction}
      >
        <PersonIcon style={{ width: '25px', height: '25px' }} />
      </Button>

      <Div
        style={{
          background: 'transparent',
          position: 'absolute',
          top: 35,
          right: 'calc(-50% + 58px)',
          paddingBottom: '5px',
          visibility: open || hover || openActive ? 'visible' : 'hidden'
        }}
      >
        <div className="dialogContaineProfile" ref={ref}>
          <GridContainer spacing={2}>

            <GridItem num={[12, 12, 12, 12, 12]}>
              <Div width="90%" horizontal="left" style={{ fontFamily: 'GorgiaLight' }}>
                <Div width="100%" horizontal="at" row>
                  <Div>
                    My Account
                  </Div>
                  <Div onClick={allClose} style={{ color: 'grey', fontFamily: 'NovaLight', fontSize: '17px' }}>
                    Close
                  </Div>
                </Div>
                <div
                  style={{
                    borderBottom: 'solid 1px grey', width: '100%', height: '2px'
                  }}
                />
              </Div>
            </GridItem>

            {
                  errorsApi.length > 0 ? (
                    <GridItem num={[12, 12, 12, 12, 12]}>
                      <GridContainer spacing={2}>
                        <GridItem num={[12, 12, 12, 12, 12]}>
                          {errorsApi.map((val, i) => <ErrorMsg message={val} i={i} key={`${i + 1}`} />)}
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  ) : null
                }

            <GridItem num={[12, 12, 12, 12, 12]}>
              <Div width="100%" onClick={() => setOpenActive(true)}>
                <LoginForm submit={login} language="EN" />
              </Div>
            </GridItem>

            <GridItem num={[12, 12, 12, 12, 12]}>
              <Div vertical="top" width="90%" height="100%" style={{ paddingTop: '3px' }}>
                <DividerLine />
                <div style={{
                  borderBottom: 'solid 1px grey', width: '100%', height: '2px', marginBottom: '10px', marginTop: '10px'
                }}
                />
                <Div width="100%" horizontal="left" row>
                  <Spam type="subtitle3">{`${"Don't have un account?"}`}</Spam>
                      &nbsp;&nbsp;
                  <Spam type="subtitle3"><LinkTo link="/login?option=register"><span>Register now</span></LinkTo></Spam>
                </Div>
                <Spam type="subtitle3">OR</Spam>

                <SocialButton title="Continue with Facebook" image={facebookIcon} onClick={loginFacebook} />

                <GoogleLogin
                  clientId="134611809717-cnvv6nvp4flf8rg5i5sl1irjees9vud0.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={loginGoogle}
                  onFailure={(a) => console.log('GOOGLE ERROR', a)}
                  cookiePolicy="single_host_origin"
                  render={(renderProps) => (
                    <SocialButton disabled={renderProps.disabled} title="Continue with Google" image={googleIcon} onClick={renderProps.onClick} />
                  )}
                />

                {/*
                  <GoogleSocialLogin
                    provider="google"
                    appId="134611809717-cnvv6nvp4flf8rg5i5sl1irjees9vud0.apps.googleusercontent.com"
                    onLoginSuccess={loginGoogle}
                    onLoginFailure={(a) => console.log('asd', a)}
                  />
                */}

                <div
                  style={{
                    height: '12px'
                  }}
                />
              </Div>
            </GridItem>

          </GridContainer>
        </div>
      </Div>
    </Div>
  );
}
