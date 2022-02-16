import React, { memo } from 'react';
import { Div, redux } from 'components';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useRouter } from 'next/router';
import Typography from '@/components/Typography/Spam';
import { grayColor } from '@/assets/jss/nextjs-material-dashboard-pro';

const BreadCrumbsElement = () => {
  const router = useRouter();

  const toHome = () => {
    router.push({
      pathname: '/',
      query: { ...(router.query || {}) },
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
      <Div onClick={toHome}>
        <Typography type="subtitle2">
          Home
        </Typography>
      </Div>
      <Typography type="subtitle2">
        Pilot.
      </Typography>
    </Breadcrumbs>
  );
};

const Categorie = memo(({ categories, setFilter, filter }) => {
  const hanldeClick = (option) => {
    setFilter({ ...filter, subcategorie: option });
  };

  return (
    <Div width="100%" height={[130, 'auto', 'auto', 'auto', 'auto']}>
      <Div height="50px" width="100%" horizontal="left">
        <BreadCrumbsElement />
      </Div>
      <Div width={['100%', '80%', '70%', '600px', '700px']} horizontal="at" row>
        {Object.keys(categories).map((val) => (
          <Div
            key={val}
            onClick={() => hanldeClick(val)}
            width={[100, 100, 100, 100, 100]}
            style={{
              borderBottom: filter.subcategorie === val ? `solid 1px ${grayColor[4]}` : 'none'
            }}
          >
            <Typography type={filter.subcategorie === val ? 'categorieFontBold' : 'categorieFont'}>
              {val}
            </Typography>
          </Div>
        ))}
      </Div>
      <Div height="5px" />
      <Div height="10px" width="100%" style={{ borderTop: `solid 1px ${grayColor[4]}` }} />
    </Div>
  );
});

export default Categorie;
