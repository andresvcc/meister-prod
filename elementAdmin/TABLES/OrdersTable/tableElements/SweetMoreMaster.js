import React, { useEffect, useState } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import SweetAlert from 'react-bootstrap-sweetalert';
import Button from '@/components/CustomButtons/Button';

// react component used to create sweet alerts
// material-ui components

import styles2 from '@/assets/jss/nextjs-material-dashboard-pro/views/sweetAlertStyle';

const useStyles2 = makeStyles(styles2);

const sweetAlertStyle = { display: 'block', marginTop: '-100px' };

function SweetCheckFinal(props) {
  const {
    children, color, className, product
  } = props;

  const [state, setState] = useState('meister');
  const classes = useStyles2();
  const [alert, setAlert] = React.useState(false);

  const hideAlert = () => {
    setAlert(false);
  };

  const successAlert = () => {
    setAlert(true);
  };

  return (
    <>
      <SweetAlert
        style={sweetAlertStyle}
        show={alert}
        success
        title="Uses render props"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={
        `${classes.button} ${classes.success}`
        }
        dependencies={[state]}
      >
        {(renderProps) => (
          <Div width="calc(100% - 20px)">
            <form style={{ width: 'calc(100% - 20px)' }}>
              Your name is:
              {state}
              <hr />
              <input
                type="text"
                ref={renderProps.setAutoFocusInputRef}
                className="form-control"
                value={state}
                onKeyDown={renderProps.onEnterKeyDownConfirm}
                onChange={(e) => setState(e.target.value)}
                placeholder="First name"
              />
              <hr />
            </form>
          </Div>
        )}
      </SweetAlert>
      <Button color={color} onClick={successAlert} className={className}>
        {children}
      </Button>
    </>
  );
}

export default SweetCheckFinal;
