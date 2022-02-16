import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Div, redux, hookDeviceInfo, Button
} from 'components';
import { useRouter } from 'next/router';
// @material-ui/icons
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio'; // temporaire pour le lab
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Spam from '@/components/Typography/Spam';
import FlexForm from '@/components/FlexForm/FlexForm';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import styles from './cardStyle';
import Evaluate from './Evaluate';

const useStyles = makeStyles(styles);

const solveMessages = {
  refund: 'We have made a refund, it will appear in your bank account within 1 to 3 weeks.',
  return: 'we have initiated a return process, we will contact you shortly.'
};

export default function CardProfile(props) {
  const {
    userIsue, product, radio, evaluate, setBillingData, billingsData, billingData, TVA, i, setEvaluationProduct = () => true, order
  } = props;
  const { width } = hookDeviceInfo();

  const maxWidth = 1600;
  const elementsParSize = [2, 2, 4, 3, 3];
  const router = useRouter();
  const [{
    profilInfo, currencyRates, productList, localCurrency, curentLanguage, dialogBag = 'false', tva
  }, dispatch] = redux();

  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);
  const widthBox = useMemo(() => {
    if (width > maxWidth) return 450;
    if (width > 1280) return width / (elementsParSize[1]);
    if (width > 960) return width / (elementsParSize[1]);
    if (width > 600) return width / (elementsParSize[1]);
    if (width > 300) return width / (elementsParSize[1]);
    return width;
  }, [width]);

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const types = {
    reason: {
      size: [12, 12, 12, 8, 8],
      type: 'option',
      required: true,
      options: {
        EN: ['Broken product', 'Box was broken', 'Incorrect size'].map((val) => ({ value: val, title: val })),
        FR: ['Produit cassé', 'Boite était cassée', 'Mauvaise taille'].map((val) => ({ value: val, title: val }))
      },
      justify: 'center',
      pathData: { 0: 'reason' },
      languages: {
        EN: {
          label: 'Reason',
        },
        FR: {
          label: 'Reason',
        }
      },
    },
    reasonrefund: {
      size: [12, 12, 12, 8, 8],
      type: 'option',
      required: true,
      options: {
        EN: ['Broken product', 'Never arrived', 'Box was broken', 'Has faults'].map((val) => ({ value: val, title: val })),
        FR: ['Produit cassé', 'Jamais arrivé', 'Boite était cassée', 'A des défauts'].map((val) => ({ value: val, title: val }))
      },
      justify: 'center',
      pathData: { 0: 'reason' },
      languages: {
        EN: {
          label: 'Reason',
        },
        FR: {
          label: 'Reason',
        }
      },
    },
    qty: {
      size: [12, 12, 12, 4, 4],
      type: 'option',
      required: true,
      options: {
        EN: [...Object.keys([...new Array(parseInt(`${product.qty}`, 10))]).map((a, i) => i + 1)].map((val) => ({ value: val, title: val })),
        FR: [...Object.keys([...new Array(parseInt(`${product.qty}`, 10))]).map((a, i) => i + 1)].map((val) => ({ value: val, title: val })),
      },
      justify: 'center',
      pathData: { 0: 'qty' },
      languages: {
        EN: {
          label: 'Quantity',
        },
        FR: {
          label: 'Quantity',
        }
      },
    },
  };

  return (
    <>
      <Div width="100%" style={product.report ? { background: product.solve ? '#00000003' : '#00000009', border: product.solve ? 'solid 2px green' : 'solid 2px #7f1f1f' } : {}}>
        <GridContainer spacing={1}>

          <GridItem num={[4, 2, 2, 2, 2]}>
            <Div height="150px" width="225px" style={{ background: '#00000010', position: 'relative' }}>
              <Image src={`${product.photo}`} alt="..." className="boxCardImage" layout="fill" />
            </Div>
          </GridItem>

          <GridItem num={[1, 2, 2, 2, 2]}>
            { width > 900

              ? (
                <Div horizontal="left" vertical="top" width="100%">
                  <Spam type="BillingNumInfo">
                    {product.name}
                  </Spam>
                  <Spam type="BillingNumInfo">
                    {product.sizeName === ' '
                      ? <Div /> : (
                        <Div>
                          {' '}
                          Options:
                          {' '}
                          {product.sizeName}
                        </Div>
                      )}
                  </Spam>

                  <Spam type="BillingNumInfo">
                    Quantity:
                    {' '}
                    {product.qty}
                  </Spam>

                  {radio && clicked ? (
                    <Div width="100%" vertical="top" horizontal="left">
                      <Button color="google" onClick={handleClick}>Cancel Return</Button>
                    </Div>
                  ) : (<Div />)}
                </Div>
              ) : <Div />}
          </GridItem>

          <GridItem num={[4, 4, 4, 5, 5]}>
            {
            radio && clicked ? (
              <Div width="100%" horizontal="left" vertical="top">
                <FlexForm
                  width="100%"
                  title=""
                  language="EN"
                  variant="outlined"
                  submitLabelLanguages={{ EN: 'Log in', FR: 'Log in' }}
                  types={types}
                  elements={userIsue === 'refund' ? ['reasonrefund', 'qty'] : ['reason', 'qty']}
                  buttonChild={<div />}
                  masterChange={(obj) => {
                    setBillingData({
                      ...billingData,
                      [i]: {
                        ...billingData[i],
                        ...(obj.id === 'reason' ? { reason: obj.value } : {}),
                        ...(obj.id === 'qty' ? { qty: obj.value } : {}),
                        product,
                      }
                    });
                  }}
                />
              </Div>
            ) : (<Div />)
          }

            {
            radio ? (
              !clicked ? (
                product.solve ? (
                  <Div width="100%" height="100px" vertical="center">
                    it is not possible to make a return of this product
                  </Div>
                ) : (
                  <Div width="100%" height="100px" vertical="center">
                    <Button color={clicked ? 'google' : 'primary'} onClick={handleClick}>{clicked ? 'Cancel' : 'Return'}</Button>
                  </Div>
                )
              ) : null
            ) : product.report ? (
              <Div width="100%" height="140px">
                <Div width="100%" style={{ fontSize: '16px' }}>
                  {
                    product.solve ? (
                      <p>{solveMessages[product.solve.status]}</p>
                    ) : (
                      <p>Our after sales service will contact you soon</p>
                    )
                  }
                </Div>
              </Div>
            ) : product.evaluation ? (
              <Div width="100%" height="100px" vertical="center">
                <span>Evaluation:</span>
                <Rating
                  name="rating"
                  readOnly
                  value={product.evaluation.ratting}
                  emptyIcon={<StarBorderIcon fontSize="inherit" style={{ width: '25px', height: '25px' }} />}
                  icon={<StarIcon fontSize="inherit" style={{ width: '25px', height: '25px', color: '#ffaf00' }} />}
                />
              </Div>
            ) : (
              evaluate ? (
                <Evaluate
                  product={product}
                  billingsData={billingsData}
                  submitEvaluation={setEvaluationProduct}
                />
              ) : (<Div />)
            )
          }
          </GridItem>
          <GridItem num={[3, 3, 3, 2, 2]}>
            {
              width > 900
                ? (
                  <Div horizontal="right" width="100%" style={{ position: 'relative', zIndex: -1 }}>
                    <Div>
                      {`TVA : ${product?.currency} ${((product?.price * TVA) * product?.qty).toFixed(2)}`}
                    </Div>
                    <Div>
                      {`Price/u : ${product?.currency} ${(product?.price).toFixed(2)}`}
                    </Div>
                    <Div>
                      {`Subtotal : ${product?.currency} ${(product?.price * product?.qty).toFixed(2)}`}
                    </Div>
                    <Div style={{ fontWeight: 'bolder' }}>
                      {`Total : ${product?.currency} ${((product?.price * (1 + TVA)) * product?.qty).toFixed(2)}`}
                    </Div>
                    {
                                   product.report ? (
                                     product.solve ? (
                                       <Div width="100%" height="160px" horizontal="right" style={{ position: 'absolute' }}>
                                         <Div
                                           style={{
                                             position: 'absolute',
                                             border: 'solid 3px #199507',
                                             padding: '0px 15px',
                                             borderRadius: '5px',
                                             transform: 'rotate(-0.07turn) translate(-20px, 0px)',
                                             fontSize: '12px',
                                             color: '#0e5104',
                                             background: '#ffffff99',
                                             fontWeight: 600
                                           }}
                                         >
                                           <p>Solve Report:</p>
                                           <p>{`${product.report.qty} ${product.solve.status}`}</p>
                                         </Div>
                                       </Div>
                                     ) : (
                                       <Div width="100%" height="160px" horizontal="right" style={{ position: 'absolute' }}>
                                         <Div
                                           style={{
                                             position: 'absolute',
                                             border: 'solid 3px #7f1f1f',
                                             padding: '0px 15px',
                                             borderRadius: '5px',
                                             transform: 'rotate(-0.07turn) translate(-20px, 0px)',
                                             fontSize: '13px',
                                             color: '#7f1f1f',
                                             background: '#ffffff95',
                                             fontWeight: 600
                                           }}
                                         >
                                           <p>Report:</p>
                                           <p>{`${product.report.qty} ${product.report.reason}`}</p>
                                         </Div>
                                       </Div>
                                     )
                                   ) : null
                    }
                  </Div>
                ) : <Div />
            }
          </GridItem>
        </GridContainer>
        <GridItem num={[12, 12, 12, 12, 12]}>
          { width < 900
            ? (
              <Div horizontal="left" vertical="top" width="100%">
                <Spam type="BillingNumInfo">
                  {product.name}
                </Spam>
                <Spam type="BillingNumInfo">
                  {product.size === 0
                    ? <Div /> : (
                      <Div>
                        Size:
                        {product.size}
                      </Div>
                    )}
                </Spam>
                <Spam type="BillingNumInfo">
                  Quantity
                  {product.qty}
                </Spam>
                <Spam type="BillingNumInfo">
                  {product?.currency}
                  {product?.price}
                </Spam>
              </Div>
            ) : <Div />}
        </GridItem>
      </Div>
      <Div height="30px" />
    </>
  );
}
