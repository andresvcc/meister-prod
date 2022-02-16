/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import cx from 'classnames';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

// core components
import AdminNavbarLinks from '@/components/Navbars/AdminNavbarLinks';
import sidebarStyle from '@/assets/jss/nextjs-material-dashboard-pro/components/sidebarStyle';
import SidebarWrapper from '@/components/Sidebar/SideBarWrapper';

import {Div, axios, redux} from 'component'
import AccountBoxIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';

const LogoutBt =({classes, collapseItemText})=>{

  const router = useRouter()
  const [{ adminProfilInfo }, dispatch] = redux();

  return(
    <Div
      className={
        `${classes.itemLink } ${ classes.userCollapseLinks}`
      }
      onClick={async ()=>{

        const keycode = await axios.post({
          url: '/api/admin/logout',
        });       
        
        if(keycode && keycode.ok) {
          router.push('/admin/login')
        }
      }}
    >
      <span className={classes.collapseItemMini}>
        <ExitToAppIcon />
      </span>
      <ListItemText
        primary="Logout"
        disableTypography
        className={collapseItemText}
      />
    </Div>
  )
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      miniActive: true,
      ...this.getCollapseStates(props.routes),
    };
  }

  mainPanel = React.createRef();

  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };

  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } if (this.props.router.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute = (routeName) => (this.props.router.pathname.indexOf(routeName) > -1 ? 'active' : '');

  openCollapse(collapse) {
    const st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }

  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = (routes) => {
    const { classes, color } = this.props;
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        const st = {};
        st[prop.state] = !this.state[prop.state];
        const navLinkClasses = `${classes.itemLink
          } ${
          cx({
            [` ${ classes.collapseActive}`]: this.getCollapseInitialState(
              prop.views
            ),
          })}`;
        const itemText = `${classes.itemText
          } ${
          cx({
            [classes.itemTextMini]:
              this.props.miniActive && this.state.miniActive,
          })}`;
        const collapseItemText = `${classes.collapseItemText
          } ${
          cx({
            [classes.collapseItemTextMini]:
              this.props.miniActive && this.state.miniActive,
          })}`;

        return (
          <ListItem
            key={key}
            className={cx(
              { [classes.item]: prop.icon !== undefined },
              { [classes.collapseItem]: prop.icon === undefined }
            )}
          >
            <a
              href="#"
              className={navLinkClasses}
              onClick={(e) => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              {prop.icon !== undefined ? (
                typeof prop.icon === 'string' ? (
                  <Icon className={classes.itemIcon}>{prop.icon}</Icon>
                ) : (
                  <prop.icon className={classes.itemIcon} />
                )
              ) : (
                <span className={classes.collapseItemMini}>
                  {prop.mini}
                </span>
              )}
              <ListItemText
                primary={prop.name}
                secondary={(
                  <b
                    className={
                      `${classes.caret
                      } ${
                      this.state[prop.state] ? classes.caretActive : ''}`
                    }
                  />
                )}
                disableTypography
                className={cx(
                  { [itemText]: prop.icon !== undefined },
                  { [collapseItemText]: prop.icon === undefined }
                )}
              />
            </a>
            <Collapse in={this.state[prop.state]} unmountOnExit>
              <List className={`${classes.list } ${ classes.collapseList}`}>
                {this.createLinks(prop.views)}
              </List>
            </Collapse>
          </ListItem>
        );
      }

      const innerNavLinkClasses = `${classes.collapseItemLink
        } ${
        cx({
          [` ${ classes[color]}`]: this.activeRoute(prop.path),
        })}`;

      const navLinkClasses = `${classes.itemLink
        } ${
        cx({
          [` ${ classes[color]}`]: this.activeRoute(prop.path),
        })}`;

      const itemText = `${classes.itemText
        } ${
        cx({
          [classes.itemTextMini]:
            this.props.miniActive && this.state.miniActive,
        })}`;

      const collapseItemText = `${classes.collapseItemText
        } ${
        cx({
          [classes.collapseItemTextMini]:
            this.props.miniActive && this.state.miniActive,
        })}`;

      return (
        <ListItem
          key={key}
          className={cx(
            { [classes.item]: prop.icon !== undefined },
            { [classes.collapseItem]: prop.icon === undefined }
          )}
        >
          <Link href={prop.layout + prop.path}>
            <a
              className={cx(
                { [navLinkClasses]: prop.icon !== undefined },
                { [innerNavLinkClasses]: prop.icon === undefined }
              )}
            >
              {prop.icon !== undefined ? (
                typeof prop.icon === 'string' ? (
                  <Icon className={classes.itemIcon}>{prop.icon}</Icon>
                ) : (
                  <prop.icon className={classes.itemIcon} />
                )
              ) : (
                <span className={classes.collapseItemMini}>
                  {prop.mini}
                </span>
              )}
              <ListItemText
                primary={prop.name}
                disableTypography
                className={cx(
                  { [itemText]: prop.icon !== undefined },
                  { [collapseItemText]: prop.icon === undefined }
                )}
              />
            </a>
          </Link>
        </ListItem>
      );
    });
  };

  render() {
    const {
      classes,
      logo,
      image,
      routes,
      bgColor,
      session,
    } = this.props;

    const itemText = `${classes.itemText
      } ${
      cx({
        [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
      })}`;

    const collapseItemText = `${classes.collapseItemText
      } ${
      cx({
        [classes.collapseItemTextMini]:
          this.props.miniActive && this.state.miniActive
      })}`;

    const userWrapperClass = `${classes.user
      } ${
      cx({
        [classes.whiteAfter]: bgColor === 'white',
      })}`;

    const user = (
      <div className={userWrapperClass}>
        <div className={classes.photo}>
         <AccountBoxIcon fontSize="large" />
        </div>
        <List className={classes.list}>
          <ListItem className={`${classes.item } ${ classes.userItem}`}>
            <a
              href="#"
              className={`${classes.itemLink } ${ classes.userCollapseButton}`}
              onClick={() => this.openCollapse('openAvatar')}
            >
              <ListItemText
                primary = {`${session.fname} ${session.lname}`}
                secondary={(
                  <b
                    className={
                      `${classes.caret
                      } ${
                      classes.userCaret
                      } ${
                      this.state.openAvatar ? classes.caretActive : ''}`
                    }
                  />
                )}
                disableTypography
                className={`${itemText } ${ classes.userItemText}`}
              />
            </a>
            <Collapse in={this.state.openAvatar} unmountOnExit>
              <List className={`${classes.list } ${ classes.collapseList}`}>
                <ListItem className={classes.collapseItem}>
                  <Link href="/admin/profil">
                    <a
                      href="#"
                      className={
                        `${classes.itemLink } ${ classes.userCollapseLinks}`
                      }
                    >
                      <span className={classes.collapseItemMini}>
                        <EditAttributesIcon />
                      </span>
                      <ListItemText
                        primary="Edit Profile"
                        disableTypography
                        className={collapseItemText}
                      />
                    </a>
                  </Link>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <Link href="/admin/settings">
                    <a
                      href="#"
                      className={
                        `${classes.itemLink } ${ classes.userCollapseLinks}`
                      }
                    >
                      <span className={classes.collapseItemMini}>
                        <SettingsIcon />
                      </span>
                      <ListItemText
                        primary="Settings"
                        disableTypography
                        className={collapseItemText}
                      />
                    </a>
                  </Link>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                    <LogoutBt classes={classes} collapseItemText={collapseItemText}/>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </div>
    );
    const links = (
      <List className={classes.list}>{this.createLinks(routes)}</List>
    );

    const logoClasses = `${classes.logo
      } ${
      cx({
        [classes.whiteAfter]: bgColor === 'white',
      })}`;

    const brand = (
      <Div className={logoClasses} width="100%" >
        <Div width="100%" >
          <p>MEISTER ENGINEERING</p>
        </Div>
      </Div>
    );

    const drawerPaper = `${classes.drawerPaper
      } ${
      cx({
        [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
      })}`;
    const sidebarWrapper = `${classes.sidebarWrapper
      } ${
       cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]: false,
        // navigator.platform.indexOf("Win") > -1,
      })}`;

    return (
      <div ref={this.mainPanel}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: `${drawerPaper } ${ classes[`${bgColor }Background`]}`,
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: `url(${ image })` }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: `${drawerPaper } ${ classes[`${bgColor }Background`]}`,
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: `url(${ image })` }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: 'blue',
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
  color: PropTypes.oneOf([
    'white',
    'red',
    'orange',
    'green',
    'blue',
    'purple',
    'rose',
  ]),
  logo: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  miniActive: PropTypes.bool,
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  session: PropTypes.object,
};

export default withStyles(sidebarStyle)(withRouter(Sidebar));
