import React, { useState } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
// @material-ui/icons
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@/components/Typography/Spam';
import Card from '@/components/Card/Card';
import { useRouter } from 'next/router';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CardAvatar from '@/components/Card/CardAvatar';
import CardMedia from '@material-ui/core/CardMedia';
import styles from './JournalcardStyle';

const useStyles = makeStyles(styles);
const imagine1 = '/static/images/cardImg_article_1.png';

export default function CardProfile(props) {
  const {
    journal, ...rest
  } = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const { width } = hookDeviceInfo();

  const [{ JournalItems }, dispatch] = redux();
  
  const goingToPage = (journal) => {
    router.push({
      pathname: `/journal/${journal.id}`,
    });
  };

  return (

    <Card className={classes.cardMotorcycle} onClick={() => goingToPage(journal)}>

      <Div width="100%" dev>
        <Div width="100%" height={['150px', '150px', '150px', '150px', '100px']}>

          <Div width="100%" horizontal="left" style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'capitalize' }}>
            {journal.brand}
          </Div>

          <Div width="100%" horizontal="left" style={{ fontSize: '20px' }}>
            How We Create Our Designs To Find The Perfect Balance
          </Div>

          <Div height="10px" />

          <Div width="100%" horizontal="left">
            <Typography type="txtJournal2">5 Minutes Read</Typography>
          </Div>

        </Div>
      </Div>

    </Card>
  );
}
