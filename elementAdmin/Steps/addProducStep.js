import React, {
  useEffect, useState, useCallback
} from 'react';
// import AddProductForm from '@/elementAdmin/Forms/addProduct';
// import AddProductForm2 from '@/elementAdmin/Forms/addProduct2';
// import AddProductForm3 from '@/elementAdmin/Forms/addProduct3';
// import AddProductForm4 from '@/elementAdmin/Forms/addProduct4';
import { Div } from 'component';
// import StepForm from '@/components/StepForm/StepForm';
import dynamic from 'next/dynamic';

const AddProductForm5 = dynamic(
  () => import('@/elementAdmin/Forms/addProduct5'),
  { loading: () => <Div width="100%" height="50vh"><p>...Loading AddProductForm4</p></Div>, ssr: false }
);

const AddProductForm4 = dynamic(
  () => import('@/elementAdmin/Forms/addProduct4'),
  { loading: () => <Div width="100%" height="50vh"><p>...Loading AddProductForm4</p></Div>, ssr: false }
);

const AddProductForm3 = dynamic(
  () => import('@/elementAdmin/Forms/addProduct3'),
  { loading: () => <Div width="100%" height="50vh"><p>...Loading AddProductForm3</p></Div>, ssr: false }
);

const AddProductForm2 = dynamic(
  () => import('@/elementAdmin/Forms/addProduct2'),
  { loading: () => <Div width="100%" height="50vh"><p>...Loading AddProductForm2</p></Div>, ssr: false }
);

const AddProductForm = dynamic(
  () => import('@/elementAdmin/Forms/addProduct'),
  { loading: () => <Div width="100%" height="50vh"><p>...Loading AddProductForm</p></Div>, ssr: false }
);

const StepForm = dynamic(
  () => import('@/components/StepForm/StepForm'),
  { loading: () => <Div width="100%" height="50vh"><p>...Loading</p></Div>, ssr: false }
);

export default function AddProductStep(props) {
  const formDataMaster = useState({});
  const [formData, setData] = formDataMaster;

  const {
    setProduct, product, saveProduct, globalSettings, providers
  } = props;

  const submit = (data) => {
    saveProduct();
  };

  const update = useCallback((data) => {
    setProduct({ ...product, ...data });
  });

  return (
    <StepForm language="EN" submit={submit} title="Product Data" formDataMaster={[product, update]} globalSettings={globalSettings} providers={providers}>
      <AddProductForm />
      <AddProductForm3 />
      <AddProductForm2 />
      <AddProductForm4 />
    </StepForm>
  );
}
