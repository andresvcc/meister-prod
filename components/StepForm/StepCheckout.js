import React, { useState, useEffect } from 'react';
import { Div, hookDeviceInfo } from 'component';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@/components/CustomButtons/Button';

const AddProductStep = React.memo((props) => {
  const {
    language, submit, children = [], title, formDataMaster, ...rest
  } = props;

  const [stepIndex, setIndexStep] = useState(0);
  const { width } = hookDeviceInfo();
  const [formData, setData] = formDataMaster;

  const step = [...children].filter((val) => val !== null);

  return (
    <Div width="100%" vertical="top">
      <Div width={['calc(100% - 20px)', '100%', '100%', '100%', '100%']} height={['auto', '100%', '100%', '100%', '100%']}>
        <Div width="calc(100% - 20px)">
          <Div height="60px" width="calc(100% - 20px)" row horizontal="at">
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
                  {{
                    ...val,
                    props: {
                      ...rest,
                      ...val.props,
                      submit,
                      language,
                      formDataMaster,
                      buttonChild: <Div />
                    }
                  }}
                </Div>
              ))
            }
          <Div height="100px" width={['calc(80%)', '580px', '580px', '580px', '580px']} row horizontal="at" dev>
            <Div />
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
