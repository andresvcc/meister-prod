import React, { useState } from 'react';
// components
import { Div } from 'components';
import Spam from '@/components/Typography/Spam';
import { useRouter } from 'next/router';

export default function ImageGenerator(props) {
  const { data, marginBottom } = props;
  const router = useRouter();
  return (
    <Div width="100%">
      <Div
        width="100%"
        height={['300px', '300px', '420px', '420px', '420px']}
        style={{
          backgroundImage: `url(${data.coverPhoto})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          marginBottom: marginBottom ? `${marginBottom}px` : '30px'
        }}
        onClick={() => router.push(`/journal/${data.title}`)}
      >
        <Div
          width={[0, 0, '90%', '90%', '90%']}
          horizontal="left"
          onClick={() => router.push(`/journal/${data.title}`)}
        >
          <Div
            width={[0, 0, '40%', '40%', '40%']}
            height="280px"
            style={{ background: 'white' }}
            onClick={() => router.push(`/journal/${data.title}`)}
          >
            <Div height="50px" width="90%" horizontal="left" style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '15px' }}>
              {data.category}
            </Div>

            <Div
              width="90%"
              horizontal="left"
              style={{
                textTransform: 'capitalize', fontWeight: '500', fontFamily: 'Gorgia', fontSize: '30px', lineHeight: '35px',
              }}
            >
              {data.title}
            </Div>
            <Div height="20px" width="90%" style={{ borderBottom: '1px solid black' }} />
            <Div height="20px" />
            <Div
              height="20px"
              width="90%"
              horizontal="left"
              style={{
                textTransform: 'capitalize', fontSize: '13px', fontStyle: 'italic', color: 'black'
              }}
            >
              {data.subtitle}
            </Div>

            <Div
              height="20px"
              width="90%"
              horizontal="left"
              style={{
                textTransform: 'capitalize', fontSize: '13px', fontStyle: 'italic', color: 'black'
              }}
            >
              {data.description}
            </Div>

            <Div height="10px" />

            <Div height="20px" width="90%" horizontal="left" style={{ textTransform: 'uppercase', fontSize: '13px' }}>
              {`${data.minutesRead} Minutes Read`}
            </Div>
            <Div height={[0, 0, '10px', '0px', '0px']} />
          </Div>
        </Div>

      </Div>

      <Div height={['190px', '270px', 0, 0, 0]} width="100%" onClick={() => router.push(`/journal/${data.title}`)}>

        <Div
          width={['95%', '95%', '90%', '90%', '90%']}
          horizontal="left"
          onClick={() => router.push(`/journal/${data.title}`)}
        >

          <Div
            width={['100%', '100%', '40%', '40%', '40%']}
            height="280px"
            style={{ background: 'white' }}
            onClick={() => router.push(`/journal/${data.title}`)}
          >
            <Div height="50px" width={['100%', '90%', '90%', '90%', '90%']} horizontal="left" style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '15px' }}>
              {data.category}
            </Div>

            <Div
              width={['100%', '90%', '90%', '90%', '90%']}
              horizontal="left"
            >
              <Spam type="journalTitleFont2">
                {data.title}
              </Spam>
            </Div>
            <Div height="20px" width={['100%', '90%', '90%', '90%', '90%']} style={{ borderBottom: '1px solid black' }} />
            <Div height={['15px', '20px', '20px', '20px', '20px']} />
            <Div
              height="20px"
              width={['100%', '90%', '90%', '90%', '90%']}
              horizontal="left"
              style={{
                textTransform: 'capitalize', fontSize: '13px', fontStyle: 'italic', color: 'black'
              }}
            >
              {data.subtitle}
            </Div>

            <Div
              height="20px"
              width={['100%', '90%', '90%', '90%', '90%']}
              horizontal="left"
              style={{
                textTransform: 'capitalize', fontSize: '13px', fontStyle: 'italic', color: 'black'
              }}
            >
              {data.description}
            </Div>

            <Div height={['0px', '10px', '10px', '10px', '10px']} />

            <Div height="20px" width={['100%', '90%', '90%', '90%', '90%']} horizontal="left" style={{ textTransform: 'uppercase', fontSize: '13px' }}>
              {`${data.minutesRead} Minutes Read`}
            </Div>
            <Div height={['40px', '10px', '10px', '0px', '0px']} />
          </Div>
        </Div>

      </Div>
    </Div>

  );
}
