/* eslint-disable object-curly-newline */
import React, { useDebugValue, useEffect, useState, useReducer, useCallback } from 'react';
import { Div, redux } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Button from '@/components/CustomButtons/Button';
import Typography from '@/components/Typography/Spam';
import { FormsTypes, propsInputGenerator } from '@/components/FlexForm/propsInput';
import ItemInput from '@/components/FlexForm/ItemInput';

const useStyles = makeStyles((theme) => ({
  '@global': {

  },
  root: {
    width: '95%',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

function FlexForm(props) {
  const { submitOnChange, elements, types, buttonChild, children, submit, title, submitLabelLanguages, variant, language, horizontal, width, buttonWidth, formDataMaster, masterChange, masterCurrentIDChange } = props;
  const [formData, setData] = formDataMaster;
  const currentIDChange = useState('');
  const classes = useStyles();

  const submitRegister = (evt) => {
    evt.preventDefault();
    submit(formData);
  };

  const onChange = (data) => {
    const newFormData = { ...formData, [data.id]: data.value };
    setData(newFormData);
    if (submitOnChange !== undefined) submitOnChange(newFormData);
    if (masterChange !== undefined) masterChange(data);
  };

  const generateProps = (id, i) => propsInputGenerator({ ...FormsTypes, ...types }, { id, variant, language, i, title, onChange, formData, currentIDChange: masterCurrentIDChange || currentIDChange });

  return (
    <Div width="100%" horizontal={horizontal}>
      {title === '' || !title ? null : (
        <Div width="calc(100% - 10px)" vertical="top" horizontal="left" height="50px">
          <Typography type="h2">{title}</Typography>
        </Div>
      )}
      <Div width={width}>
        <form className={classes.root} onSubmit={submitRegister} autoComplete="off">
          <GridContainer spacing={0} alignItems="flex-start">
            {children.map((val, i) => (<ItemInput key={`${val.props.id}${i + 1}`} {...(generateProps(val.props.id, i))} />))}
            <GridItem num={[12, 12, 12, 12, 12]}>
              {
                buttonChild || (
                  <Div width={buttonWidth} height="60px">
                    <Button color="primary" style={{ width: '96%', }} onClick={() => submit(formData)}>
                      <Typography type="cardProductWhite">
                        {submitLabelLanguages[language]}
                      </Typography>
                    </Button>
                  </Div>
                )
              }
            </GridItem>
          </GridContainer>
        </form>
      </Div>
    </Div>
  );
}

FlexForm.propTypes = {
  language: PropTypes.string,
  horizontal: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  width: PropTypes.any,
  submitLabelLanguages: PropTypes.object,
  title: PropTypes.string,
  submit: PropTypes.func,
  children: PropTypes.any,
  elements: PropTypes.array,
  types: PropTypes.object,
  masterChange: PropTypes.func,
  masterCurrentIDChange: PropTypes.any,
  buttonChild: PropTypes.node,
  submitOnChange: PropTypes.func
};

const Form = (props) => {
  const {
    elements = [],
    title,
    types,
    submitLabelLanguages,
    variant = 'outlined',
    language = 'EN',
    horizontal = 'center',
    buttonWidth = ['100%', '100%', '65%', '45%', '45%'],
    width = ['100%', '550px', '600px', '600px', '600px'],
    formDataMaster,
    masterChange,
    masterCurrentIDChange,
    buttonChild,
    submit,
    submitOnChange,
    initial
  } = props;

  const formData = useState({});

  return (
    <FlexForm
      title={title}
      language={language}
      variant={variant}
      horizontal={horizontal}
      width={width}
      submitLabelLanguages={submitLabelLanguages}
      submit={(data) => submit(data)}
      elements={elements}
      types={types}
      buttonWidth={buttonWidth}
      formDataMaster={formDataMaster || formData}
      masterChange={masterChange}
      masterCurrentIDChange={masterCurrentIDChange}
      buttonChild={buttonChild}
      submitOnChange={submitOnChange}
      initial={initial}
    >
      {elements.map((val) => (<Div key={val} id={val} />))}
    </FlexForm>
  );
};

export default Form;
