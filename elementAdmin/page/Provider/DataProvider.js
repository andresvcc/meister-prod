import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Div } from 'component';
import Span from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

const DataProvider = memo(({ provider }) => (
  <Div width="100%">
    <GridContainer spacing={1}>
      <GridItem num={[5, 5, 12, 12, 12]}>
        <Div width="100%" horizontal="left" style={{ padding: '10px' }}>
          {Object.entries({
            nif: provider.nif,
            manager: provider.manager,
            telephone: provider.telephone,
            address: `${provider.address} ${provider.zip}`,
            date: `Since ${(new Date((provider.date || new Date()))).toLocaleDateString('en-US')}`,
          }).map(([key, value]) => (
            <Div key={key} horizontal="left" style={{ marginBottom: '2px' }}>
              <Span type="produitUniqueTitle" style={{ color: '#352d2d', fontSize: '17px' }}>
                <span style={{ userSelect: 'all', WebkitUserSelect: 'all', MozUserSelect: 'all' }}>{`${value}`}</span>
              </Span>
            </Div>
          ))}
        </Div>
      </GridItem>
      <GridItem num={[7, 7, 12, 12, 12]}>
        <Div width="100%" height={['140px', '140px', '140px', 'auto', 'auto']} style={{ padding: '15px' }} vertical="bottom">
          {Object.entries({
            iban: provider.iban,
            bic: provider.bic,
          }).map(([key, value]) => (
            <Div key={key} width="100%" horizontal="left">
              <Span type="produitUniqueTitle" style={{ color: '#352d2d' }}>
                <span style={{ fontWeight: 'bolder', fontSize: '15px' }}>{`${key} :`.toUpperCase()}</span>
              </Span>
              <Span
                type="produitUniqueTitle"
                style={{
                  color: '#352d2d', userSelect: 'all', fontSize: '15px', WebkitUserSelect: 'all', MozUserSelect: 'all'
                }}
              >
                {` ${value}`}
              </Span>
              <div />
              <div />
            </Div>
          ))}
        </Div>
      </GridItem>
    </GridContainer>
  </Div>
));

DataProvider.propTypes = {};

export default DataProvider;
