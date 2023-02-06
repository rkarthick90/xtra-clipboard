import React, { useState } from 'react';
import Switch from 'react-switch';
import '../../../../css/popup.css';
import { CustomIcons } from '../../constants/icons';
import Logo from '../../../../images/clipboard-48.png';

function Header({
  currentAppState,
  toggleNew,
  toggleAppState,
  emptyBulkArr,
  handleSearch,
  isEnabled,
}) {
  const [on, seton] = useState(false);
  const handleChange = (value) => {
    seton(value);
    toggleAppState(value);
  };

  React.useEffect(() => {
    if (currentAppState !== null) seton(currentAppState);
  }, [currentAppState]);

  const navigateToOptions = () => {
    chrome.tabs.create({ url: '/options.html' });
  };
  const addnewClipboard = () => {
    toggleNew(true);
    emptyBulkArr();
  };

  return (
    <header className="bestow_header_wrapper">
      <h3>
        <img
          src={Logo}
          width="20px"
          height="20px"
          alt="logo"
          style={{ paddingRight: '10px' }}
        />
        Xtra Clipboard
      </h3>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '50px',
          justifyContent: 'flex-end',
        }}
      >
        {/* <div
          className="actions"
          onClick={() => addnewClipboard()}
          aria-label="Add new Clipboard"
          data-microtip-position="bottom-left"
          role="tooltip"
        >
          {CustomIcons('plus')}
        </div> */}
        <div>
          <input
            id="Search"
            type="text"
            className="search"
            onKeyUp={handleSearch}
            placeholder="Search"
            readOnly={isEnabled}
          />
        </div>
        <div
          className="actions"
          onClick={() => navigateToOptions()}
          aria-label="Settings"
          data-microtip-position="bottom-left"
          role="tooltip"
        >
          {CustomIcons('settings')}
        </div>
        {/* <div
          aria-label="Monitor on/off"
          data-microtip-position="bottom-left"
          role="tooltip"
        >
          <Switch
            onChange={handleChange}
            checked={on}
            onColor="#2E95FF"
            handleDiameter={15}
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={35}
          />
        </div> */}
      </div>
    </header>
  );
}

export default Header;
