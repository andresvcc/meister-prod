/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector, useDispatch } from 'react-redux';

const redux = () => {
  const stateGlobal = useSelector((state) => state);

  const dispatch = useDispatch();

  const dispatch2 = ({ state, value }) => {
    if (stateGlobal && JSON.stringify(stateGlobal[state]) !== JSON.stringify(value)) {
      /*

      ici your log event to Google analytiques

      */

      if (state === 'profilInfo' || state === 'adminProfilInfo') {
        dispatch({ type: 'profileTemps', state: 'profileTemps', value });
      } else {
        dispatch({ type: state, state, value });
      }
    }
  };

  const dispatchsocket = ({ state, value }) => {
    if (stateGlobal && `${JSON.stringify(stateGlobal[state])}` !== `${JSON.stringify(value)}`) {
      /*

      ici your log event to Google analytiques

      */
      if (state === 'globalSettings') {
        if (stateGlobal.globalSettings.none) {
          dispatch({ type: state, state, value });
        }
      } else if (state === 'faqJournal') {
        if (stateGlobal.faqJournal.none) {
          dispatch({ type: state, state, value });
        }
      } else if (state === 'articlesJournal') {
        if (stateGlobal.articlesJournal.none) {
          dispatch({ type: state, state, value });
        }
      } else {
        dispatch({ type: state, state, value });
      }
    }
  };

  return [stateGlobal, dispatch2, dispatchsocket];
};

export default redux;
