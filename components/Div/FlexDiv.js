import React, { useEffect, useState } from 'react';
import Div from '@/components/Div/Div';

function FlexDiv(props) {
  const { num = [1, 2, 3, 4, 5], height, children } = props;
  const [width, setWindowWidth] = useState(0);

  const resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  const responsiveSize = 'auto';

  const responsiveChildren = [
    `calc(${100 / num[0]}% - 2px)`,
    `calc(${100 / num[1]}% - 2px)`,
    `calc(${100 / num[2]}% - 2px)`,
    `calc(${100 / num[3]}% - 2px)`,
    `calc(${100 / num[4]}% - 2px)`,
  ];

  const responsiveCalc = () => {
    if (width < 600) return 0;
    if (width < 960) return 1;
    if (width < 1200) return 2;
    if (width < 1920) return 3;
    if (width >= 1920) return 4;
  };

  const responsiveCalcInverse = () => {
    if (width < 0) return width - 20;
    if (width < 1) return width * 0.95;
    if (width < 2) return width * 0.70;
    if (width < 6) return 1280;
    if (width >= 4) return 1280;
  };

  const arrFlexGenerator = (i) => {
    const responsive = responsiveCalc();
    const arrOptions = [
      num[0] === 1 ? 'center' : `${i % num[responsive] === 0 ? 'right' : (i - 1) % num[responsive] === 0 || i === 1 ? 'left' : 'center'}`,
      num[1] === 1 ? 'center' : `${i % num[responsive] === 0 ? 'right' : (i - 1) % num[responsive] === 0 || i === 1 ? 'left' : 'center'}`,
      num[2] === 1 ? 'center' : `${i % num[responsive] === 0 ? 'right' : (i - 1) % num[responsive] === 0 || i === 1 ? 'left' : 'center'}`,
      num[3] === 1 ? 'center' : `${i % num[responsive] === 0 ? 'right' : (i - 1) % num[responsive] === 0 || i === 1 ? 'left' : 'center'}`,
      num[4] === 1 ? 'center' : `${i % num[responsive] === 0 ? 'right' : (i - 1) % num[responsive] === 0 || i === 1 ? 'left' : 'center'}`,
    ];

    return arrOptions[responsive];
  };

  const widthAll = [99, 98, 96, 96, 96];
  const bodySize = responsiveCalcInverse();
  const currentNum = num[responsiveCalc()];
  const insideProportion = widthAll[responsiveCalc()];
  const elementSize = bodySize / currentNum;
  const heightProportion = (elementSize - ((elementSize / 100) * insideProportion));

  // dev ligne 69 & 86

  if (!Array.isArray(children)) {
    return (
      <Div width={responsiveSize} row horizontal="left" flex>
        <Div horizontal={arrFlexGenerator(1)} width={responsiveChildren} height={height}>
          {{
            ...children,
            props: {
              ...children.props,
              width: widthAll.map((val) => (currentNum === 1 ? '100%' : `${val}%`)),
              height: height.map((val) => (responsiveCalc() > 1 && currentNum === 2 ? val - (heightProportion * 1.5) : val - (heightProportion / 1.5)))
            }
          }}
        </Div>
      </Div>
    );
  }

  return (
    <Div width={responsiveSize} row horizontal="left" flex>
      {children.map((val, i) => (
        <Div key={`${i + 1}`} width={responsiveChildren} height={height}>
          {{
            ...val,
            props: {
              ...val.props,
              width: widthAll.map((val) => (currentNum === 1 ? '100%' : `${val}%`)),
              height: height.map((val) => (responsiveCalc() > 1 && currentNum === 2 ? val - (heightProportion * 1.5) : val - (heightProportion / 1.5)))
            }
          }}
        </Div>
      ))}
    </Div>
  );
}

export default FlexDiv;
