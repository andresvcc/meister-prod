import React, { memo, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// components
import { Div, redux, hookDeviceInfo } from 'components';
// elements
import ProductCardScroll from 'elementsClient/Cards/ProductCardScroll';

const ScrollContainer = dynamic(() => import('react-indiana-drag-scroll'), { loading: () => <div style={{ width: '90vw', height: '400px' }}>...</div>, ssr: false });

const Scroll = memo(({ products }) => {
  const divScrollGrid = useRef(null);
  const router = useRouter();
  const { width } = hookDeviceInfo();
  const [{ profilInfo, tva }, dispatch] = redux();
  const { cartItems } = profilInfo;

  const smallSize = width > 600;
  const lenght = products.length;
  const sizeBox = smallSize ? 300 : width * 0.999;
  const ws = `${(lenght * sizeBox) + 4}px`;

  const magneticSystem = async (e) => {
    const sectionScroll = Math.round(e / sizeBox);
    divScrollGrid.current.scrollTo({
      top: 0,
      left: (sectionScroll * sizeBox) + (sectionScroll < 0 ? 4 : 0),
      behavior: 'smooth',
    });
  };

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
    <Div width="100%">
      <ScrollContainer
        innerRef={divScrollGrid}
        style={{ background: 'transparent', width: '100%' }}
        className="divScrollGrid"
        vertical={false}
        onEndScroll={!smallSize ? magneticSystem : null}
        horizontal
        hideScrollbars={false}
        // nativeMobileScroll
      >
        <Div row width={ws} horizontal="left">
          {products.map((val, i) => (
            <Div key={`${i + 1}`} style={{ minWidth: sizeBox, maxWidth: sizeBox }}>
              <div style={{ width: 'calc(100% - 10px)' }}>
                <ProductCardScroll product={val} tva={tva} addToBag={(color, size, optionSelect1, optionSelect2, optionSelect3) => addToBag(val, color, size, optionSelect1, optionSelect2, optionSelect3)} alReadyInBag={(color, size, optionSelect1, optionSelect2, optionSelect3) => alReadyinToBag(val.id, color, size, optionSelect1, optionSelect2, optionSelect3)} />
              </div>
            </Div>
          ))}
        </Div>
      </ScrollContainer>
    </Div>
  );
});
export default Scroll;
