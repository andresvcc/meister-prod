import React, { useState } from 'react';
// components
import { Div } from 'components';
import Spam from '@/components/Typography/Spam';

export default function ImageGenerator(props) {
  const {
    title, description, image, size, username
  } = props;
  const [hover, setHover] = useState(false);

  return (
    <Div
      onHover={(hover) => setHover(hover)}
      width="100%"
      height={size}
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '4px',
      }}
    >

      <Div
        width="100%"
        height={size}
        style={{ background: '#00000050' }}
      >
        <Div
          width="80%"
          horizontal="left"
        >
          <Spam type="aboutTitle1">
            {title}
            {' '}
            {username}
          </Spam>

          <Div height="40px">

            {hover
              ? (
                <Div>
                  <Spam type="aboutTitle1">{description}</Spam>
                </Div>
              )
              : <div />}
          </Div>

        </Div>
      </Div>
    </Div>

  );
}
