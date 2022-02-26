import React, {
  memo, useState, useMemo, useEffect
} from 'react';
import { useRouter } from 'next/router';
// components
import {
  redux, Div, FlexDiv, hookDeviceInfo,
} from 'components';
import Button from '@/components/CustomButtons/Button';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import ProductCard2 from '@/elementsClient/Cards/PilotProductCard';
import style from '../../../elementAdmin/Forms/chatacteristicsFiles/styles';

const MotorcycleSectionCard = memo(({ productPilot = [], filter }) => {
  const { width } = hookDeviceInfo();
  const [{ profilInfo }, dispatch] = redux();
  const { cartItems } = profilInfo;
  const [hover, setHover] = useState(false);

  const handleHover = (newHover) => {
    setHover(newHover);
  };

  const maxWidth = 1600;
  const elementsParSize = [2, 2, 4, 3, 3];

  const widthBox = useMemo(() => {
    if (width > maxWidth) return 450;
    if (width > 1280) return width / (elementsParSize[4] * 1.15);
    if (width > 960) return width / (elementsParSize[4] * 1.1);
    if (width > 600) return width / (elementsParSize[0]);
    if (width > 300) return width / (elementsParSize[1]);
    return width;
  }, [width]);

  const alReadyinToBag = (id, color, size, optionSelect1, optionSelect2, optionSelect3) => {
    const alReadyInBag = cartItems[`${id}¦${color}¦${size}${optionSelect1 !== '' ? `¦${optionSelect1}` : ''}${optionSelect2 !== '' ? `¦${optionSelect2}` : ''}${optionSelect3 !== '' ? `¦${optionSelect3}` : ''}`] === undefined;
    return alReadyInBag;
  };

  const addToBag = async (product, color, size) => {
    const selectableOptionsArr1 = [...new Set(product?.selectableOptions1?.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
    const selectableOptionsArr2 = [...new Set(product?.selectableOptions2?.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
    const selectableOptionsArr3 = [...new Set(product?.selectableOptions3?.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
    const optionSelect1 = selectableOptionsArr1[0] || '';
    const optionSelect2 = selectableOptionsArr2[0] || '';
    const optionSelect3 = selectableOptionsArr3[0] || '';
    const alReadyInBag = alReadyinToBag(product.id, color, size, optionSelect1, optionSelect2, optionSelect3);
    const sizes = product.sizesType !== 'custom' && product.sizesType.split(',')[size];

    if (alReadyInBag) {
      const temp = {
        id: product.id,
        color,
        size,
        qty: 1,
        photo: product.colors[color].photos[0],
        colorCode: product.colors[color].color,
        colorName: product.colors[color].colorName,
        sizeName: `${sizes} ${optionSelect1 !== '' ? `- ${optionSelect1}` : ''}${optionSelect2 !== '' ? `- ${optionSelect2}` : ''}${optionSelect3 !== '' ? `- ${optionSelect3}` : ''}`,
        opt1: selectableOptionsArr1.indexOf(optionSelect1),
        opt1Key1: optionSelect1,
        opt2: selectableOptionsArr2.indexOf(optionSelect2),
        opt1Key2: optionSelect2,
        opt3: selectableOptionsArr3.indexOf(optionSelect3),
        opt1Key3: optionSelect3,
        packageSize: product.packageSize,
        name: product.product,
        pathname: `/product/${product.product}`,
      };

      await dispatch({
        state: 'profilInfo',
        value: {
          cartItems: {
            ...cartItems,
            [`${product.id}¦${color}¦${size}${optionSelect1 !== '' ? `¦${optionSelect1}` : ''}${optionSelect2 !== '' ? `¦${optionSelect2}` : ''}${optionSelect3 !== '' ? `¦${optionSelect3}` : ''}`]: temp
          }
        }
      });

      await dispatch({
        state: 'dialogBag',
        value: 'true',
      });
    }
  };

  const [index, serIndex] = useState([0, 12]);
  const [indexGropup, serIndexGroup] = useState([0, 5]);
  const [groupSelector, setGroupSelector] = useState(1);
  const sliceProducPilot = useMemo(() => [...productPilot].slice(index[0], index[1]), [index, productPilot]);
  const groups = useMemo(() => Math.ceil(productPilot.length / 12), [index, productPilot]);

  const indexChange = (newIndex) => {
    window.scrollTo(0, 400);
    setGroupSelector(newIndex + 1);

    if (newIndex === 0) {
      return serIndex([0, 12]);
    }
    return serIndex([(12 * newIndex), (12 * newIndex) + 12]);
  };

  const backToInit = () => {
    window.scrollTo(0, 400);
    setGroupSelector(1);
    serIndexGroup([0, 5]);
    serIndex([0, 12]);
  };

  const backIndex = () => {
    window.scrollTo(0, 400);
    const groupSelectorTemp = groupSelector - 1;
    setGroupSelector(groupSelectorTemp);

    if (indexGropup[0] > 0) {
      serIndexGroup([indexGropup[0] - 1, indexGropup[1] - 1]);
    }

    if (groupSelectorTemp === 1) {
      return serIndex([0, 12]);
    }
    serIndex([index[0] - 12, index[1] - 12]);
  };

  const nextIndex = () => {
    window.scrollTo(0, 400);
    const groupSelectorTemp = groupSelector + 1;
    setGroupSelector(groupSelectorTemp);

    if (indexGropup[1] < groups && groupSelectorTemp > (indexGropup[1] / 2) + 1) serIndexGroup([indexGropup[0] + 1, indexGropup[1] + 1]);

    if (groupSelectorTemp === 1) {
      return serIndex([0, 12]);
    }
    serIndex([index[0] + 12, index[1] + 12]);
  };

  const nextToEnd = () => {
    window.scrollTo(0, 400);
    setGroupSelector(groups);
    serIndexGroup([groups - (groups >= 5 ? 5 : groups), groups]);
    serIndex([(12 * groups) - 11, (12 * groups) + 1]);
  };

  useEffect(() => {
    setGroupSelector(1);
    serIndexGroup([0, 5]);
    serIndex([0, 12]);
  }, [productPilot]);

  return (
    <Div width="calc(100% - 20px)" style={{ maxWidth: `${maxWidth - 20}px`, marginBottom: '10px', marginTop: '10px' }}>
      <GridContainer spacing={2}>
        {sliceProducPilot.map((val, i) => (
          <GridItem key={`${i + 1}`} num={elementsParSize.map((val) => 12 / val)}>
            <ProductCard2 product={val} filter={filter} addToBag={(color, size, optionSelect1, optionSelect2, optionSelect3) => addToBag(val, color, size, optionSelect1, optionSelect2, optionSelect3)} alReadyInBag={(color, size, optionSelect1, optionSelect2, optionSelect3) => alReadyinToBag(val.id, color, size, optionSelect1, optionSelect2, optionSelect3)} />
          </GridItem>
        ))}
        <GridItem num={[12, 12, 12, 12, 12]}>
          {
  groups > 1 ? (

    <Div width="100%" row style={{ padding: width < 600 ? '20px 0px 20px 0px' : '20px 20px 20px 20px', marginTop: '20px' }}>

      {width > 600
        ? (
          <Button color="white" justIcon disabled={index[0] === 0} onClick={backToInit}>
            {'<<'}
          </Button>
        )
        : <Div />}

      <Button color="white" justIcon disabled={index[0] === 0} onClick={backIndex}>
        {'<'}
      </Button>

      <Div row style={{ marginLeft: width < 600 ? '0px' : '20px', marginRight: width < 600 ? '0x' : '20px', padding: '20px 20px 20px 20px' }}>
        {
  [...new Array(groups)].map((val, i) => i).slice(indexGropup[0], indexGropup[1]).map((val) => (
    <Button color={(val + 1) === groupSelector ? 'primary' : 'white'} key={`${val + 1}`} style={{ marginLeft: '5px', marginRight: '5px' }} onClick={() => indexChange(val)}>
      {val + 1}
    </Button>
  ))
  }
      </Div>

      <Button color="white" justIcon onClick={nextIndex} disabled={groupSelector >= groups}>
        {'>'}
      </Button>

      {width > 600
        ? (
          <Button color="white" justIcon disabled={groupSelector >= groups} onClick={nextToEnd}>
            {'>>'}
          </Button>
        )
        : <Div />}
    </Div>

  ) : null
  }
        </GridItem>
      </GridContainer>
    </Div>
  );
});

export default MotorcycleSectionCard;
