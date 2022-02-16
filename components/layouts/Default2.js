/* eslint-disable object-curly-newline */
import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { hookDeviceInfo, redux } from 'component';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import {
  deviceType, browserName
} from 'react-device-detect';
import Footer from '@/components/Footer/Footer';
import VideoIntro from '@/elementsClient/VideoIntro/VideoIntro';
import VideoIntroMobile from '@/elementsClient/VideoIntro/VideoIntroMobile';
import HeaderMobile from '@/components/layouts/headerMobile/HeaderMobile';
import HeaderDescktop from '@/components/layouts/headerDescktop/HeaderDescktop';
import Logo from '@/components/layouts/headerDescktop/logo';

import CookieSection from '@/elementsClient/Sections/CookieSection/CookieComponent';

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

const useHideOnScrolled = (browserName) => {
  // Store the state
  const [scrollY, setScrollPos] = useState(0);

  // On Scroll
  const onScroll = React.useCallback(() => {
    const y = window.pageYOffset;
    if (y < 600 && browserName !== 'Safari') setScrollPos(Math.round(y / 10));
  });

  // Add and remove the window listener
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  if (browserName === 'Safari') return 0;

  if (typeof window === 'undefined') return 0;

  return scrollY;
};

const Mobile = ({ children, parallaxImage, parallaxVideo, useSocketHook }) => {
  const parallax = !!parallaxImage;
  const video = !!parallaxVideo;
  return (
    <>
      <header>
        <HeaderMobile useSocketHook={useSocketHook} />
      </header>
      <main>
        {video ? <VideoIntroMobile parallaxVideo={parallaxVideo} parallaxImage={parallaxImage} /> : (
          parallax ? <Image className="parallaxMobile" src={`${parallaxImage || '/static/images/bg7.jpg'}`} alt="topBarner" /> : null
        )}
        <div style={{ height: '20px' }} />
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

const Desktop = ({ children, parallaxImage, barnerImage, barnerComponent, parallaxVideo, useSocketHook }) => {
  const scrollYHook = useHideOnScrolled(browserName);
  const scrollYPos = React.useMemo(() => scrollYHook * 10, [scrollYHook]);
  const parallax = !!parallaxImage || !!parallaxVideo;
  const video = !!parallaxVideo;

  return (
    <>
      <header>
        <HeaderDescktop useSocketHook={useSocketHook} />
      </header>
      <main>
        {
          barnerImage !== undefined ? (
            <div className="bannerCover" style={{ backgroundImage: `url('${barnerImage || '/static/images/bg7.jpg'}')` }}>
              {
                barnerComponent !== undefined ? (
                  <div style={{ width: '100%', height: '30vw', paddingTop: '110px' }}>
                    {barnerComponent}
                  </div>
                ) : null
              }
            </div>
          ) : null
        }
        {
          parallax ? (
            <div className="parallax" style={{ backgroundImage: `url('${parallaxImage || '/static/images/bg7.jpg'}')`, width: '100%', maxHeight: '800px' }}>
              {
                  video ? (
                    <div
                      className="parallaxChildren"
                      style={{
                        width: '100%',
                        transform: `translate3d(0,${(scrollYPos / 3) + 10}px,0)`,
                        maxHeight: '800px',
                        maxWidth: '1920px'
                      }}
                    >
                      <VideoIntro parallaxVideo={parallaxVideo} />
                    </div>
                  ) : null
              }
            </div>
          ) : null
        }
        <div className="contenMain">
          <div className="containerMain">
            {children}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
        <CookieSection />
      </footer>
    </>
  );
};

const Default2 = ({ children, parallaxImage, barnerImage, parallaxVideo, barnerComponent, useSocketHook }) => {
  const [{ profilInfo, productList, globalSettings, faqJournal }] = redux();
  const { type = 'browser', width } = hookDeviceInfo();

  if (profilInfo.init === true || productList.none || globalSettings.none || faqJournal.none) {
    return (
      <main>
        <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', width: '100vw', height: '100vh' }}>
          <div style={{ width: '160px', height: '130px' }}>
            <Logo />
          </div>
          <div style={{ width: '160px', color: 'black', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', width: '160px' }}>
            &nbsp;&nbsp;&nbsp;Loading...
            </div>
            <BorderLinearProgress />
          </div>

        </div>
      </main>
    );
  }

  if (width === 0) return <></>;
  if ((type === 'mobile' || type === 'tablet') && (width < 850)) return <Mobile {...{ children, parallaxImage, barnerImage, parallaxVideo, useSocketHook }} />;
  return (
    <Desktop {...{ children, parallaxImage, barnerImage, parallaxVideo, barnerComponent, useSocketHook }} />
  );
};

Default2.propTypes = {
  children: <div />
};

Default2.propTypes = {
  children: PropTypes.node,
};

export default Default2;
