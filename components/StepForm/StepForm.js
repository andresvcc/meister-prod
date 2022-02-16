import React, { useState } from 'react';
import { Div, hookDeviceInfo } from 'component';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@/components/CustomButtons/Button';
import Typography from '@/components/Typography/Spam';

const AddProductStep = React.memo((props) => {
  const {
    language, submit, children = [], title, formDataMaster, globalSettings, providers
  } = props;

  const [stepIndex, setIndexStep] = useState(0);
  const { width } = hookDeviceInfo();
  const [formData, setData] = formDataMaster;

  const step = children;

  return (
    <Div width="100%" height="calc(100% - 20px)" vertical="top">
      <Div width="100%" height="100%">
        <Typography type="h2">{title}</Typography>
        <Div width="100%" vertical="top">
          <Div height="60px" width="100%" row horizontal="at">
            <Button simple round justIcon disabled={stepIndex === 0} color="primary" onClick={() => (stepIndex > 0 ? setIndexStep(stepIndex - 1) : undefined)}><ArrowBackIosIcon /></Button>
            {
                width > 600 && step.length > 2
                  ? (
                    <Div width="50%" row horizontal="at" height="45px">
                      {[...new Array(step.length)].map((val, i) => (
                        <Button
                          key={`${i + 1}`}
                          color="primary"
                          round
                          justIcon
                          size="sm"
                          simple={stepIndex !== i}
                          onClick={() => setIndexStep(i)}
                        >
                          <span style={{ fontSize: '14px' }}>{i + 1}</span>
                        </Button>
                      ))}
                    </Div>
                  ) : null
              }
            <Button simple round justIcon disabled={!(stepIndex + 1 < step.length)} color="primary" onClick={() => (stepIndex + 1 < step.length ? setIndexStep(stepIndex + 1) : undefined)}><ArrowForwardIosIcon /></Button>
          </Div>
          {
            step.map((val, i) => (
              <Div key={`${i + 1}`} vertical="top" width="100%" height={stepIndex === i ? 'auto' : 0} style={{ minHeight: stepIndex === i ? '450px' : 0 }}>
                <div style={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
                  {{
                    ...val,
                    props: {
                      submit,
                      language,
                      formDataMaster,
                      globalSettings,
                      providers,
                      buttonChild: <div />
                    }
                  }}
                </div>
              </Div>
            ))
          }
          <Div height="50px" width="calc(100% - 35px)" row horizontal="right">
            {stepIndex + 1 < step.length ? (
              <Button color="primary" onClick={() => (stepIndex + 1 < step.length ? setIndexStep(stepIndex + 1) : undefined)}>Next</Button>
            ) : (
              <Button color="primary" onClick={() => submit(formData)}>submit</Button>
            )}
          </Div>
        </Div>
      </Div>
    </Div>
  );
});

export default AddProductStep;
