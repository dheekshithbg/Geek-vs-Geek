import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { LANGUAGE_VERSIONS } from '../constants';

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (lang) => {
    setSelectedLanguage(lang);
    onSelect(lang);
    handleClose();
  };

  return (
    <div className="ml-2 mb-4">
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        className="border-blue-500 text-blue-500"
      >
        {selectedLanguage}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        classes={{ paper: 'bg-gray-900' }}
      >
        {languages.map(([lang, version]) => (
          <MenuItem
            key={lang}
            selected={lang === selectedLanguage}
            onClick={() => handleMenuItemClick(lang)}
            className={`${
              lang === selectedLanguage ? 'text-blue-500' : 'text-white'
            } hover:bg-gray-700`}
          >
            {lang}
            <span className="text-gray-400 text-sm ml-2">({version})</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelector;
