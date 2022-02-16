import { useEffect, useState } from 'react';

// components
import { axios } from 'components';
import { generateKey, decrypt, encrypt } from '@/components/Hooks/crypto';

function parser(str) {
  try {
    return JSON.stringify(str);
  } catch (e) {
    return str;
  }
}

const useKeys = (loginInit) => {
  const [login, setLogin] = useState(loginInit);
  const [apiPublicKey, setPublicKey] = useState();

  const getPublicKey = async () => {
    // const { publicKey, privateKey } = await generateKey();
    const keycode = await axios.post({
      url: '/api/admin/getpk',
      // userPublicK: publicKey
    });
    setPublicKey(keycode.publicK);
  };

  const send = async (url, data) => {
    const encrypted = await encrypt(apiPublicKey, parser(data));
    const keycode = await axios.post({
      url,
      data: encrypted
    });

    if (keycode.login) {
      setLogin(!!keycode.login);
    }
    return keycode;
  };

  useEffect(() => {
    if (apiPublicKey === undefined) getPublicKey();
  }, []);

  // const connect = apiPublicKey !== undefined;

  return [login, send];
};

export default useKeys;
