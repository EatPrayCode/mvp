import React, { useState, useEffect } from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import * as api from '../Utils/api';
import { getSystemSettings } from '../Utils/index';

import config from '../Utils/config';
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';

const LanguageSelect = ({}) => {
  const [languageValue, setLanguageValue] = useState(``);
  const [languages, setLanguages] = useState([]);
  const [sysConfig, setSysConfig] = useState(``);
  const { i18n } = useTranslation();
  const languageChange = (data: any) => {
    setLanguageValue(data.language);
    selectUserLanguage(data);
  };

  const selectUserLanguage = (data: any) => {
    localStorage.setItem(`language`, JSON.stringify(data));
    setLanguageValue(data.language);
    i18n.changeLanguage(data.code);
  };

  const getUserSelectedLanguage = () => {
    let user_selected_lang = localStorage.getItem(`language`);
    if (user_selected_lang && user_selected_lang !== undefined) {
      user_selected_lang = JSON.parse(user_selected_lang);
    }
    return user_selected_lang;
  };

  //api render

  useEffect(() => {
    setSysConfig(getSystemSettings());

    api.getLanguages().then((response: any) => {
      if (!response.error) {
        setLanguages(response.data);
        const user_selected_lang = getUserSelectedLanguage();
        if (user_selected_lang) {
          selectUserLanguage(user_selected_lang);
        } else {
          const index = response.data.filter((data: any) => {
            return data.code === config.defaultLanguage;
          });
          selectUserLanguage(index[0]);
        }
      }
    });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" size="small" onClick={handleClick}>
        {languageValue ? languageValue : `Select Language`}
      </Button>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: `visible`,
            filter: `drop-shadow(0px 2px 8px rgba(0,0,0,0.32))`,
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: `""`,
              display: `block`,
              position: `absolute`,
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: `background.paper`,
              transform: `translateY(-50%) rotate(45deg)`,
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: `right`, vertical: `top` }}
        anchorOrigin={{ horizontal: `right`, vertical: `bottom` }}
      >
        {languages &&
          languages.map((data: any, key: any) => {
            return (
              <MenuItem key={key} onClick={() => languageChange(data)}>
                <Avatar /> {data.language}
              </MenuItem>
              // <Dropdown.Item
              //   onClick={() => languageChange(data)}
              //   value={languageValue}
              //   id={data.id}
              //   active={languageValue === data.language}
              //   key={data.language}
              // >
              //   {data.language}
              // </Dropdown.Item>
            );
          })}
        {/* <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> */}
      </Menu>
    </>
  );
};

export default withTranslation()(LanguageSelect);
