import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

// core components
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import ImageGenerator from '@/elementsClient/ImageGenerator/ImageGenerator';

// components
import { Div, redux, hookDeviceInfo } from 'component';

const maxWidth = 1600;
const elementsParSize = [1, 2, 3, 3, 3];

const JournalMapSection = () => {
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
            articles.map((val, i) => (i === 0 ? (
              <GridItem key={`${i + 1}`} num={[12, 12, 12, 12, 12]}>
                <ImageGenerator data={val} />
              </GridItem>
            ) : (
              <GridItem key={`${i + 1}`} num={elementsParSize.map((val) => 12 / val)}>
                <Div width="100%" onClick={() => router.push(`/journal/${val.title}`)}>
                  <Div height={`${widthBox}px`} width="100%" pointer>
                    <img src={val.coverPhoto} alt="s " className="boxCardImage" />
                  </Div>

                  <Div height="30px" width="100%" horizontal="left" style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '15px' }}>
                    {val.category}
                  </Div>

                  <Div
                    width="100%"
                    horizontal="left"
                    style={{
                      textTransform: 'capitalize', fontWeight: '500', fontFamily: 'Gorgia', fontSize: '25px', lineHeight: '25px'
                    }}
                  >
                    {val.title}
                  </Div>
                  <Div height="40px" width="100%" horizontal="left" style={{ textTransform: 'uppercase', fontSize: '11px' }}>
                    {val.minutesRead}
                    Minutes Read
                  </Div>
                </Div>
              </GridItem>
            )))
        }
      </GridContainer>
    </Div>
  );
};

export default JournalMapSection;
