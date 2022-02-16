import React from 'react';
import {
  MTableToolbar,
  MTableHeader
} from 'material-table';

import Button from '@/components/CustomButtons/Button';

const componentsSet = (onAddRow) => ({
  Toolbar: (props) => (
    <div>
      <MTableToolbar {...props} />
      {onAddRow ? (
        <div style={{ padding: '0px 10px' }}>
          <Button
            round
            justIcon
            color="google"
            style={{ position: 'absolute', bottom: 5, zIndex: 9 }}
            onClick={() => onAddRow(props)}
          >
            +
          </Button>
        </div>
      ) : undefined}

    </div>
  ),
  Header: (props) => <MTableHeader {...props} />
});

export default componentsSet;
