import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { Button, Div } from 'component';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import GavelIcon from '@material-ui/icons/Gavel';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextEditorReturn from './textEditorReturn';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;

  const icons = {
    1: <MonetizationOnIcon />,
    2: <GavelIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
}

function getSteps() {
  return ['Confirm return', 'writing email'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Confirm user information';
    case 1:
      return 'Confirm the return';
    default:
      return 'Unknown step';
  }
}

export default function HorizontalLinearStepper({ submit, product, order }) {
  const classes = useStyles();
  const [dataRefound, setDataRefound] = React.useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    submit({ dataRefound, product });
  };

  return (
    <Div width="100%">
      <Div width="100%" dev>
        {
          activeStep !== steps.length ? (
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} style={{ width: '100%' }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : null
        }
      </Div>
      <Div width="100%">
        {activeStep === steps.length ? (
          <Div width="100%">
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button color="primary" onClick={handleSubmit} className={classes.button}>
              Close
            </Button>
          </Div>
        ) : (
          <Div width="calc(90% - 50px)" horizontal="left">
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>

            <Div width="100%" height="350px">
              {
                activeStep === 0 ? (
                  <Div width="100%" height="100%">
                    <Div width="80%" height="80%" horizontal="left" vertical="top">
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={dataRefound.check4}
                            onChange={() => setDataRefound({ ...dataRefound, check4: !dataRefound.check4 })}
                            name="checked4"
                          />
                        )}
                        label={`I confirm that the reimbursement of ${product.currency} ${product.price * (1 + order.TVA)}`}
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={dataRefound.check5}
                            onChange={() => setDataRefound({ ...dataRefound, check5: !dataRefound.check5 })}
                            name="checked5"
                          />
                        )}
                        label="I confirm that the reimbursement has been made"
                      />
                    </Div>
                  </Div>
                ) : null
              }
              {
                activeStep === 1 ? (
                  <Div>
                    <TextEditorReturn contain={{ product, order }} setEditingContain={(data) => setDataRefound({ ...dataRefound, mail: data })} />
                  </Div>
                ) : null
              }
            </Div>

            <Div width="100%" horizontal="left" row>
              <Button color="transparent" disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {
                (activeStep === 0 && dataRefound.check4 && dataRefound.check5)
                || (activeStep === 1 && dataRefound.mail) ? (
                  <Button
                    variant="contained"
                    color={activeStep === steps.length - 1 ? 'success' : 'primary'}
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                  ) : null
              }
            </Div>
          </Div>
        )}
      </Div>
    </Div>
  );
}
