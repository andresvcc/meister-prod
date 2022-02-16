import React, { memo } from 'react';
import { useRouter } from 'next/router';
// components
import {
  redux, Div, FlexDiv, hookDeviceInfo,
} from 'components';

import ProductCard2 from '@/elementsClient/Cards/ProductCardProducts';
import JournalCard from '@/elementsClient/Cards/JournalCard';

const MotorcycleSectionCard = memo(({ productPilot }) => {
  const { width } = hookDeviceInfo();
  const [{ profilInfo }, dispatch] = redux();
  const { cartItems } = profilInfo;

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

  return (
    <Div>
      <div className="flexBoxcontainer">
        {productPilot.map((val, i) => (
          <div key={`${i + 1}`} className="flex-itemBxJournal">
            <JournalCard journal={val} />
          </div>
        ))}
      </div>
    </Div>
  );
});

export default MotorcycleSectionCard;
