import React from 'react';
import Link from 'next/link';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbsUpIcon from '@mui/icons-material/ThumbUp';
import { bottomItems } from '../constants/navitems';
import { useRouter } from "next/router";

const BottomNavigationBar = () => {
  const [value, setValue] = React.useState(0);
  const items = bottomItems;
  const [activeLink, setActiveLink] = React.useState({ id: `` });
  const handleLinkClick = (link: any) => {
    setValue(link);
    setActiveLink(link);
  };
  const router = useRouter();

  const getIcon = (link: any) => {
    let icon;
    switch (link.iconName) {
      case `AccountCircleIcon`:
        icon = <AccountCircleIcon />;
        break;
      case `ThumbsUpIcon`:
        icon = <ThumbsUpIcon />;
        break;
      case `TimelineIcon`:
        icon = <TimelineIcon />;
        break;
      case `HomeIcon`:
        icon = <HomeIcon />;
        break;
      default:
        icon = <HomeIcon />;
        break;
    }
    return icon;
  };

  const onLink = (link: any) => {
    router.push(link.route);
  };

  return (
    <Paper
      sx={{
        position: `fixed`,
        bottom: 0,
        left: 0,
        right: 0,
        'z-index': 9999999,
      }}
      elevation={3}
    >
      <BottomNavigation
        sx={{
          flexGrow: 1,
          display: { xs: `flex`, sm: `flex`, md: `none`, lg: `none` },
        }}
        value={value}
        onChange={(event, newValue) => {
          handleLinkClick(newValue);
        }}
        showLabels
      >
        {/* <BottomNavigationAction component={Link} label="Home" to="/Home" icon={<HomeIcon />} />
        <BottomNavigationAction component={Link} label="News" to="/News" icon={<TimelineIcon />} />
        <BottomNavigationAction component={Link} label="TV" to="/TV" icon={<ThumbsUpIcon />} />
        <BottomNavigationAction component={Link} label="Account" to="/Profile/Home" icon={getIcon('')} /> */}
        {items &&
          items.map((link: any, key: any) => {
            return (
              <BottomNavigationAction
                key={key}
                className={link.id === activeLink.id ? `selected-nav-item` : ``}
                label={link.label}
                icon={getIcon(link)}
                onClick={() => onLink(link)}
              />
            );
          })}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
