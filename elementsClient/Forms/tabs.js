/* eslint-disable object-curly-newline */
import React, { useEffect, useState, useRef } from 'react';
import { Div } from 'component';

import PropTypes, { element } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@/components/Typography/Spam';
import FlexForm from '@/components/FlexForm/FlexForm';
import { grayColor } from '@/assets/jss/nextjs-material-dashboard-pro';

import types from './otherTypes/addProductTypes';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography type="paragraph1">
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
    style: { fontSize: '14px' }
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderLeft: `solid 1px ${grayColor[5]}`,
    borderRight: `solid 1px ${grayColor[5]}`,
    borderBottom: `solid 1px ${grayColor[5]}`,
    borderRadius: '10px',
    height: '300px'
  },
  scroller: {
    flexGrow: 1
  },
  tabs: {
    justifyContent: 'center'
  },
}));

const titleForm = {
  EN: 'product features',
  FR: 'Caractéristiques du produit'
};

export default function LoginForm(props) {
  const { formDataMaster, language, submit } = props;
  const [formData, setData] = formDataMaster;
  const baseElements = ['English'];
  const [elements, setElements] = useState([...baseElements]);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onChange = (data) => {
    const newFormData = { ...formData, [data.id]: data.value };
    setData(newFormData);
  };

  useEffect(() => {
    if (formData.language !== elements) setElements([...baseElements, ...(formData.language || [])]);
  }, [formData]);

  return (
    <Div width="calC(100% - 20px)">
      <Div width="calc(100% - 20px)" vertical="top" horizontal="left" height="50px">
        <Typography type="h2">{titleForm[language]}</Typography>
      </Div>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            classes={{ root: classes.tabs, scroller: classes.scroller }}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
            aria-label="scrollable auto tabs example"
          >
            {elements.map((val, i) => (
              <Tab key={val} label={val} {...a11yProps(i)} />
            ))}
          </Tabs>
        </AppBar>
        {elements.map((val, i) => (
          <TabPanel key={val} value={value} index={i}>
            {val}
          </TabPanel>
        ))}
      </div>
    </Div>
  );
}
