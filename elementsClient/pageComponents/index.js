import React from 'react';
import dynamic from 'next/dynamic';
// components
import { Div } from 'components';

// Home section
import HomePub from '@/elementsClient/Sections/HomeSection/HomePub';
import PhotoSection from '@/elementsClient/Sections/HomeSection/PhotoSection';
import CategoriesImages from '@/elementsClient/Sections/HomeSection/CategoriesImages';
import JournalHoraires from '../Sections/HomeSection/JournalHoraires';

// Images
const image2 = '/static/images/journal_background_1-min.png';
const image1 = '/static/images/journalImage.png';

const Scroll = dynamic(
  () => import('@/elementsClient/Scroll/Scroll'),
  { loading: () => <div /> }
);

// espacement entre les éléments
const Divider = () => (
  <Div width="50%" height={['20px', '20px', '80px', '80px', '80px']} />
);

const Page = React.memo(({ productListPilot, productListParts }) => (
  <Div width="100%" vertical="top">

    <Divider />
    <HomePub />
    <Divider />
    <CategoriesImages />
    <Divider />

    <Scroll products={productListPilot} />
    <Divider />

    <JournalHoraires image={image2} title="Store & Showroom" />
    <Divider />

    <Scroll products={productListParts} />
    <Divider />

    <PhotoSection image={image1} title="The Journal" titleArticle="BMW K-series, New Lay-down Shock Conversion" buttonTitle="Read more" link="/journal/La%20vie%20est%20Belle" />
    <Divider />
  </Div>
));

export default Page;
