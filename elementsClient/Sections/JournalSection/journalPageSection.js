import React, { useEffect, useState, memo } from 'react';
import { Div, redux } from 'components';
import JournalMapSection from '@/elementsClient/Sections/JournalSection/JournalMapSection';

const Page = memo(() => (
  <Div width="100%" style={{ minHeight: '90vh', marginTop: '120px' }} vertical="top">
    <JournalMapSection />
  </Div>
));

export default Page;
