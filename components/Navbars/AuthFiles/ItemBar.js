import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Link from 'next/link';
import cx from 'classnames';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/authNavbarStyle';

const useStyles = makeStyles(styles);

const ItemBar = ({ href, label, Icon }) => {
  const classes = useStyles();
  const router = useRouter();
  const activeRoute = (routeName) => (router.route.indexOf(routeName) > -1);

  if (!href) {
    return (
      <span
        className={classes.navLink}
        style={{ zIndex: 4 }}
      >
        {Icon ? <Icon className={classes.listItemIcon} /> : null}
        <ListItemText
          primary={label}
          disableTypography
          className={classes.listItemText}
        />
      </span>
    );
  }

  return (
    <div>
      <ListItem className={classes.listItem}>
        <Link href={href}>
          <a
            href={href}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: activeRoute(href),
            })}
          >
            {Icon ? <Icon className={classes.listItemIcon} /> : null}
            <ListItemText
              primary={label}
              disableTypography
              className={classes.listItemText}
            />
          </a>
        </Link>
      </ListItem>
    </div>
  );
};

export default ItemBar;
