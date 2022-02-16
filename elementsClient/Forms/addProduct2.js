/* eslint-disable object-curly-newline */
import React, { useEffect, useState, useRef } from 'react';
import { Div } from 'component';

import PropTypes, { element } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@/components/Typography/Spam';
import { grayColor, primaryColor } from '@/assets/jss/nextjs-material-dashboard-pro';
import FlexForm from '@/components/FlexForm/FlexForm';
import languagesCodes from '@/assets/dataBase/BDLanguagesCodes';
import types from './otherTypes/addProductTypes';

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
    style: { fontSize: '14px', color: primaryColor[0] }
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
  form: {
    width: '100%',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

const titleForm = {
  EN: 'Languages',
  FR: 'Langues'
};

export default function LoginForm(props) {
  const { formDataMaster, language, submit } = props;
  const [formData, setData] = formDataMaster;
  const elements = ['English', 'France', 'Italiano', 'Deutsch'];
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onChange = ({ data, code }) => {
    if (formData.languages === undefined || formData.languages[code] === undefined || formData.languages[code][data.id] !== data.value) {
      const newFormData = { ...formData, languages: { ...formData.languages, [code]: { ...(formData.languages && formData.languages[code]), [data.id]: data.value } } };
      setData(newFormData);
    }
  };

  return (
    <Div devwidth="calC(100% - 20px)" vertical="top">
      <Div height={10} />
      <Div width={['100%', '495px', '595px', '595px', '595px']} height={[500, 440, 440, 440, 440]} vertical="top">
        <AppBar position="static" color="default" style={{ background: 'white', boxShadow: 'none' }}>
          <Tabs
            classes={{ root: classes.tabs, scroller: classes.scroller }}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            TabIndicatorProps={{ style: { background: primaryColor[0], width: '20%', left: `calc((25% * ${value}) + 2.5%)` } }}
            textColor="primary"
            variant="fullWidth"
            scrollButtons="off"
            aria-label="scrollable auto tabs example"
            centered
          >
            {
                elements.map((val, i) => (
                  <Tab key={`${val}${i + 1}`} label={val} {...a11yProps(i)} style={{ minWidth: '55px !important', color: primaryColor[0] }} />
                ))
              }
          </Tabs>
        </AppBar>
        <Div width={['100%', '495px', '590px', '595px', '595px']} horizontal="left" vertical="top" className="row">
          <Div height={10} />
          {
                elements.map((val, i) => (
                  <Div key={val} height={i === value ? 'auto' : 0}>
                    <FlexForm
                      buttonWidth="100%"
                      width={['100%', '490px', '590px', '590px', '590px']}
                      title=""
                      language={language}
                      variant="outlined"
                      submitLabelLanguages={{ EN: 'Next', FR: 'Continuer' }}
                      types={types(formData)}
                      elements={['nameProduct', 'description', 'details', 'greatDescription']}
                      submit={(data) => console.log(data)}
                      masterChange={(data) => onChange({ data, code: languagesCodes[val] })}
                      buttonChild={props.buttonChild}
                    />
                  </Div>
                ))
              }
        </Div>
      </Div>
    </Div>
  );
}
