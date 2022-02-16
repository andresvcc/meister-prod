import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

// core components
import { Div, redux, hookDeviceInfo } from 'component';
import Image from 'next/image';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import ImageGenerator from '@/elementsClient/ImageGenerator/ImageGenerator';
import Spam from '@/components/Typography/Spam';

// components

const maxWidth = 1600;
const elementsParSize = [1, 2, 3, 3, 3];

const JournalMapUnique = () => {
// fonction pour importer des images
  const { width } = hookDeviceInfo();
  const router = useRouter();
  const [{ articlesJournal = {} }, dispatch] = redux();
  const { list = {}, order = [] } = articlesJournal;

  const widthBox = useMemo(() => {
    if (width > maxWidth) return 250;
    if (width > 1280) return width / (elementsParSize[2] * 2);
    if (width > 960) return width / (elementsParSize[2] * 2);
    if (width > 600) return width / (elementsParSize[1] * 2);
    if (width < 600) return width / (elementsParSize[1]);

    return width;
  }, [width]);

  const articles = useMemo(() => order.map((val, i) => {
    const {
      index = i, id = i + 1, title = 'title', subtitle = 'subtitle', description = 'description', category = 'Morotcycles', time = '8', photo = '/static/images/about_meister_1.jpg', content,
    } = list[val];

    // const firstPhoto = content.filter((a) => a.component === 'Full Image');

    return {
      index,
      id,
      title,
      subtitle,
      description,
      category,
      minutesRead: time,
      coverPhoto: photo, // : firstPhoto.length > 0 ? firstPhoto : coverPhoto
    };
  }), [list]);

  return (
    <Div width={['90%', '90%', '100%', '100%', '100%']} style={{ maxWidth: `${maxWidth}px`, marginBottom: '10px', marginTop: '10px' }}>
      <GridContainer spacing={5}>
        {
            articles.slice(0, 3).map((val, i) => (
              <GridItem key={`${i + 1}`} num={elementsParSize.map((val) => 12 / val)}>
                <Div width="100%" onClick={() => router.push(`/journal/${val.title}`)}>
                  <Div width="100%" height={`${widthBox}px`} pointer>
                    <Div height={`${widthBox + 10}px`} width="110%" style={{ position: 'relative' }} pointer>
                      <Image
                        src={val.coverPhoto}
                        alt="s "
                        layout="fill"
                        quality={100}
                        objectFit="cover"
                        objectPosition="center top"
                        priority
                        placeholder={() => <div style={{ width: '100%', height: '250px', background: 'grey' }}>Loading...</div>}
                      />
                    </Div>
                  </Div>

                  <Div height="30px" width="100%" horizontal="left" style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '15px' }} pointer>

                    {val.category}
                  </Div>

                  <Div
                    width="100%"
                    horizontal="left"
                    pointer
                  >
                    <Spam type="journalTitleFont1">
                      {val.title}
                    </Spam>
                  </Div>

                  <Div height="40px" width="100%" horizontal="left" style={{ textTransform: 'uppercase', fontSize: '11px' }}>
                    {`${val.minutesRead} Minutes Read`}
                  </Div>
                </Div>
              </GridItem>
            ))
        }
      </GridContainer>
    </Div>
  );
};

export default JournalMapUnique;
