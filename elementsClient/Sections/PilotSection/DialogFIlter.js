import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { Div } from 'component';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router';
import Button from '@/components/CustomButtons/Button';

const useStyles = makeStyles({
  root: {

  },
});

const config1 = {
  style: {
    width: '45%',
    height: '45px',
    border: 'solid 2px #18374C'
  }
};

const config2 = {
  style: {
    width: '45%',
    height: '45px',
    background: '#18374C',
    color: 'white',
  }
};

export default function SimpleDialogDemo({
  open, setOpen, children, style, full, ...rest
}) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Dialog
      className={classes.root}
      onClose={() => setOpen(false)}
      open={open}
      BackdropProps={{
        style: {
          background: full || 'transparent',
          opacity: 1,
        }
      }}
      PaperProps={{ style }}
      {...rest}
    >
      <Div width="100%" height="100%" vertical="at">
        <Div width="100%">
          <Div
            row
            width="calc(100% - 20px)"
            height="60px"
            horizontal="at"
            style={{
              marginBottom: '10px', borderBottom: '1px solid #18374C', fontFamily: 'GorgiaLight', fontSize: '20px'
            }}
          >
            <span>Filters</span>
            <CloseIcon onClick={() => setOpen(false)} />
          </Div>
        </Div>
        <Div width="100%" height="100%" vertical="top">
          {children}
        </Div>
        <Div width="100%" row horizontal="around" style={{ paddingBottom: '5px', paddingTop: '5px' }}>
          <Button
            color="transparent"
            {...config1}
            onClick={() => router.push({
              // pathname: router.pathname,
              query: { filter: 'none' },
            }, undefined, { scroll: false })}
          >
            Clear filters
          </Button>
          <Button color="primary" {...config2} onClick={() => setOpen(false)}>
            Apply
          </Button>
        </Div>
      </Div>
    </Dialog>
  );
}
