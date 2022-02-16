/* eslint-disable camelcase */
import React, { useEffect, useState, useCallback } from 'react';
import { withIronSession } from 'next-iron-session';

// layout for this page
// core components
import { makeStyles } from '@material-ui/core/styles';
import { redux, Div, axios } from 'components';
import useSocket from 'useSocketAdmin';
import { useRouter } from 'next/router';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import ImageIcon from '@material-ui/icons/Image';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import SaveIcon from '@material-ui/icons/Save';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CodeIcon from '@material-ui/icons/Code';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import dynamic from 'next/dynamic';
import LoadingIcon from '@/components/progress/circularWithLabel';
import Layout from '@/layouts/simple';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/authNavbarStyle';
import Button from '@/components/CustomButtons/Button';
import { simpleShadow } from '@/assets/jss/nextjs-material-dashboard-pro';
import useKeys from '@/components/Hooks/useKeys';
import Admin from '@/layouts/Admin';

const SectionProduitPhoto = dynamic(
  () => import('@/elementAdmin/section/productVue/produitUnique'),
  { loading: () => <Div width="100%" height="50vh">...Loading</Div>, ssr: false }
);

const SectionProduitPhotoMotorcycle = dynamic(
  () => import('@/elementAdmin/section/productVue/produitUniqueMoto'),
  { loading: () => <Div width="100%" height="50vh">...Loading</Div>, ssr: false }
);

const AddProducStep = dynamic(
  () => import('@/elementAdmin/Steps/addProducStep'),
  { loading: () => <Div width="100%" height="50vh">...Loading step</Div>, ssr: false }
);

const useStyles = makeStyles(styles);

const productExample = {
  id: 0,
  visibility: false,
  hidden: false,
  colors: [],
  categorie: '',
  subcategorie: '',
  genre: '',
  brand: '',
  family: '',
  styleTextes: {
    EN: {
      text1: '',
      text2: '',
      text3: '',
    }
  },
  languages: {
    EN: {
      nameProduct: '', description: '', details: [], characteristics: [], greatDescription: '', specialCare: '', content: []
    },
    FR: {
      nameProduct: '', description: '', details: [], characteristics: [], greatDescription: '', specialCare: '', content: []
    },
    IT: {
      nameProduct: '', description: '', details: [], characteristics: [], greatDescription: '', specialCare: '', content: []
    },
    DE: {
      nameProduct: '', description: '', details: [], characteristics: [], greatDescription: '', specialCare: '', content: []
    }
  },
  video: '',
  gallery: [],
  characteristics: '',
  selectableOptions1: '',
  selectableOptions2: '',
  selectableOptions3: '',
  price: 0,
  currency: 'CHF',
  delivery: [],
  packageSize: 'void',
  Homologation: [],
  Provider: [],
  index: 0,
  product: '',
  tableData: { id: 0 },
  sizesType: '',
  clasificationColor: false,
};

const SuccesFab = () => (
  <Fab
    aria-label="save"
    color="primary"
    size="small"
    style={{ background: 'green', boxShadow: 'none' }}
  >
    <CheckIcon />
  </Fab>
);

const GetFileBlobUsingURLP = (url) => new Promise((resolve) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.addEventListener('load', () => {
    resolve(xhr.response);
  });
  xhr.send();
});

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

function AddProductPage({
  admin, loginStatus, session, productName
}) {
  const [{
    productList = {}, products, globalSettings, providers
  }, dispatch] = redux();
  const classes = useStyles();
  const router = useRouter();
  const [login, send] = useKeys(loginStatus);
  const [emit, socket] = useSocket(admin);

  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [option, setOption] = useState(0);
  const [product, setProductData] = useState();

  const [submitProcess, setSubmitProcess] = useState({
    colors: [0],
    'Product Data': 0
  });

  const setValueTask = (value, index) => {
    const tempSubmitProcess = { ...submitProcess };
    tempSubmitProcess.colors[index] += value;
    setSubmitProcess(tempSubmitProcess);
  };

  const saveProduct = async () => {
    setOpenDialog(true);
    setSubmitProcess({
      colors: product.colors.map(() => 0),
      'Product Data': 0
    });

    const productKey = `${product.product}`;

    const productTemp = { ...product };
    const productGalleryTemp = { ...product.gallery };
    // const colors = await all(productTemp);

    const galleryUpload = await Promise.all(product.gallery.map(async (file, iphoto) => {
      if (file === '') return '';
      if (file.indexOf('blob') !== -1) {
        const contents = await GetFileBlobUsingURLP(file);
        const uploadImage1 = await axios.upload({
          url: `/upload/${productKey}_GALLERY_${iphoto}`,
          file: contents
        });
        return `/static/products/${uploadImage1[0].filename}`;
      } return file;
    }));

    const tt2 = await Promise.all(productTemp.colors.map(async (color, icolor) => {
      const tt = await Promise.all(color.photos.map(async (file, iphoto) => {
        if (file.indexOf('blob') !== -1) {
          const contents = await GetFileBlobUsingURLP(file);
          const uploadImage1 = await axios.upload({
            url: `/upload/${productKey}_${icolor}_${iphoto}`,
            file: contents
          });

          return `/static/products/${uploadImage1[0].filename.replaceAll(' ', '20%')}`;
        } return file;
      }));
      setValueTask(100, icolor);
      return { color: color.color, colorName: color.colorName, photos: tt };
    }));

    const pr = {
      ...productTemp,
      colors: tt2,
      gallery: galleryUpload,
    };

    await emit('addProudct', {
      product: productKey,
      value: pr,
    });

    setSubmitProcess({ ...submitProcess, 'Product Data': 100 });

    // router.push('/admin/listproducts');
  };

  const closeDialogSave = () => {
    setSubmitProcess({
      colors: product.colors.map(() => 0),
      'Product Data': 0
    });

    setOpenDialog(false);
  };

  const closeDialogFinis = () => {
    router.push('/admin/listproducts');
  };

  useEffect(() => {
    const product = productList[productName];
    if (product) {
      setProductData({ ...productExample, ...product });
    }
  }, [productList]);

  return (
    <Layout>
      <Dialog
        open={openDialog}
        onClose={closeDialogSave}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Div width="100%">
          <Div width="calc(100% - 40px)">
            <Div height="20px" />
            <p>Product creation in process, please wait until the product is finished.</p>
            <Div height="20px" />
            <Div height="calc()" horizontal="left" width="100%">
              {
                submitProcess.colors.map((value, i) => (
                  <Div key={`${i + 1}`} row width={180} height="60px" horizontal="at">
                    <p>{`${product?.colors[i]?.colorName} photo ${i + 1}`}</p>
                    {value < 100 ? <LoadingIcon value={value} /> : <SuccesFab />}
                  </Div>
                ))
              }
            </Div>
            <Div height="20px" />
            <Div row width="100%" height="60px" horizontal="at">
              <Div row width="180px" height="60px" horizontal="at">
                <p>Product data</p>
                {submitProcess['Product Data'] < 100 ? <LoadingIcon value={submitProcess['Product Data']} /> : <SuccesFab />}
              </Div>
            </Div>
            <Div height="20px" />
            <Div row width="100%" height="60px" horizontal="at">
              <Div row width="180px" height="60px" horizontal="at">
                <p>Total</p>
                {`${((Object.values(submitProcess.colors).reduce((a, b) => a + (b || 100)) / product?.colors?.length) / 2) + (submitProcess['Product Data'] / 2)}%`}
              </Div>
            </Div>
            <Div height="20px" />
          </Div>

          <Div width="100%">
            {
              product?.colors && (((Object.values(submitProcess.colors).reduce((a, b) => a + (b || 100)) / product?.colors?.length) / 2) + (submitProcess['Product Data'] / 2) >= 100 || product.colors.length === 0) ? (
                <Div width="calc(100% - 5px)" row>
                  <Button color="primary" style={{ width: '45%', minWidth: '100px' }} onClick={closeDialogSave}>Continue</Button>
                  <Div width="5%" />
                  <Button color="google" style={{ width: '45%', minWidth: '100px' }} onClick={closeDialogFinis}>Submit</Button>
                </Div>
              ) : (
                <CircularProgress />
              )
            }
          </Div>
        </Div>
      </Dialog>

      <Div width="100%" row horizontal="left" vertical="top">
        <Div width={open ? 'calc(70% - 20px)' : 'calc(98% - 20px)'} style={{ transition: 'all ease 0.5s' }}>
          <Div height="20px" />
          <Div width="100%">
            <Div width="100%" style={{ minHeight: '100vh' }} vertical="top">
              <Div height="40px" width="100%" />
              {option === 0 && product?.categorie === 'Motorcycle' ? <SectionProduitPhotoMotorcycle product={product} setProductData={setProductData} /> : null}
              {option === 0 && product?.categorie !== 'Motorcycle' ? <SectionProduitPhoto product={product} setProductData={setProductData} /> : null}
              {option === 1 ? <Div>Cards</Div> : null}
              {option === 2 ? <Div>SEO</Div> : null}
              {option === 3 ? (
                <Div width="90%" horizontal="left">
                  <p>{productName}</p>
                  <pre>{JSON.stringify(product, null, 2)}</pre>
                </Div>
              ) : null}
              <Div height="40px" />
            </Div>
          </Div>
        </Div>
        <Div width="20px" style={{ transition: 'all ease 0.5s' }} />
        <Div
          width="30%"
          height="100%"
          vertical="top"
          style={{
            position: 'fixed', right: open ? 0 : '-28.3%', top: 0, background: '#EFEEE960', transition: 'all ease 0.5s'
          }}
        >
          <Div style={{ position: 'absolute', left: -5, background: '#2e5e80' }} height="100%" onClick={() => setOpen(!open)}>
            <ArrowRightIcon
              style={{
                color: 'white', fontSize: '35px', transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'all .5s'
              }}
            />
          </Div>
          <Div width="100%" height="100%" vertical="top" horizontal="right">
            <Div width="calc(100% - 32px)" vertical="top" horizontal="center">
              <div style={{ height: '20px' }} />
              {product ? <AddProducStep setProduct={setProductData} product={product} saveProduct={saveProduct} globalSettings={globalSettings} providers={providers} /> : null}
            </Div>
          </Div>
        </Div>

        <Div
          style={{
            position: 'fixed', left: 0, top: 0, zIndex: 9, background: 'white', transition: 'all ease 0.5s', ...simpleShadow
          }}
          width={open ? '70%' : '98%'}
          height="60px"
          row
          horizontal="at"
        >
          <Div row>
            <Div
              style={{
                borderBottom: 'solid 3px red', borderRadius: 0, position: 'absolute', bottom: '15px', left: 30 + (100 * option), transition: 'left 1s'
              }}
              width="80px"
            />
            <Div width="20px" />
            <Button
              className={classes.sidebarButton}
              color="primary"
              simple
              style={{ width: '100px' }}
              onClick={() => setOption(0)}
            >
              Page Vue
              &nbsp;
              <ArtTrackIcon />
            </Button>

            <Button
              className={classes.sidebarButton}
              color="primary"
              simple
              link
              style={{ width: '100px' }}
              onClick={() => setOption(1)}
            >
              Card
              &nbsp;
              <ImageIcon />
            </Button>

            <Button
              className={classes.sidebarButton}
              color="primary"
              simple
              style={{ width: '100px' }}
              onClick={() => setOption(2)}
            >
              Seo
              &nbsp;
              <MultilineChartIcon />
            </Button>

            <Button
              className={classes.sidebarButton}
              color="primary"
              simple
              style={{ width: '100px' }}
              onClick={() => setOption(3)}
            >
              Data
              &nbsp;
              <CodeIcon />
            </Button>
          </Div>

          <Div row width="200px" horizontal="at">
            <Div onClick={saveProduct}>
              <SaveIcon className={classes.button} />
            </Div>
            <Div onClick={() => router.push('/admin/listproducts')}>
              <CancelPresentationIcon className={classes.button} />
            </Div>
            <Div width="20px" />
          </Div>
        </Div>
      </Div>
    </Layout>
  );
}

export default AddProductPage;

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const login = await req.session.get('login');

    const loginStatus = !!login;
    const admin = req.cookies;
    const { productName } = req.query;

    if (loginStatus === false) {
      return {
        props: { loginStatus, ...(admin || {}) },
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    return {
      props: {
        loginStatus: false, session: login || {}, productName: productName || '', ...(admin || {})
      }
    };
  },
  {
    cookieName: 'adminMeister',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    },
    password: process.env.APPLICATION_SECRET
  }
);
