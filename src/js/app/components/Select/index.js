import React from 'react';
import Downshift from 'downshift';
import { CustomIcons } from '../../constants/icons';

const itemToString = (item) => (item === null ? '' : String(item));

const Dropdown = ({ list, selectedItem, onChange, totalCount = null }) => (
  <div className="dropdown_container">
    <Downshift itemToString={itemToString} onChange={onChange}>
      {({ getItemProps, isOpen, toggleMenu }) => (
        <div className="btn-group">
          <div className="badge badge-icon" onClick={toggleMenu}>
            <span>
              {selectedItem.label} {totalCount ? `(${totalCount})` : ''}
            </span>
            {CustomIcons(
              'downarrow',
              window.localStorage.getItem('theme') === 'dark'
                ? 'white'
                : 'black'
            )}
          </div>
          {isOpen ? (
            <div
              className={`profile-dropdown droplist-menu ${
                isOpen && 'dropdown-menu--open'
              }`}
            >
              {list.map((item, index) => (
                <div
                  {...getItemProps({
                    key: item.value,
                    index,
                    item,
                  })}
                >
                  {item.label}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </Downshift>
  </div>
);

export default Dropdown;
