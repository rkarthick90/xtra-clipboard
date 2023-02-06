import React, { Fragment } from 'react';
import '../../../../css/popup.css';
import { CustomIcons } from '../../constants/icons';
import { BULK_DELETE, BULK_FAVOURITE } from '../../constants/actions';
import db from '../../../utils/db';
import { showToaster } from '../../screens/Popup';
import { useAppDispatch } from '../../app-context';

function Footer({ selectedArr, cards, ...props }) {
  const dispatch = useAppDispatch();
  const navigateToOptions = () => {
    chrome.tabs.create({ url: '/options.html' });
  };

  const deleteAll = async () => {
    await db.clipboards.bulkDelete(selectedArr).then((data) => {
      dispatch({ type: BULK_DELETE, hashArr: selectedArr });
      showToaster('Selected clipboard(s) got deleted');
      props.emptySelectedArr();
    });
  };

  const bulkFavorite = async () => {
    const filteredData = cards.filter((card) => {
      if (selectedArr.indexOf(card.hash) > -1) {
        card.isFavorite = true;
        return card;
      }
    });

    await db.clipboards.bulkPut(filteredData).then((data) => {
      dispatch({ type: BULK_FAVOURITE, hashArr: selectedArr });
      showToaster('Selected clipboard(s) marked Favourite');
      props.emptySelectedArr();
    });
  };

  return (
    <Fragment>
      {selectedArr.length ? (
        <footer className="bestow_footer_wrapper">
          <button className="primary fav" onClick={() => bulkFavorite()}>
            Favourite
          </button>
          <button className="primary delete" onClick={() => deleteAll()}>
            Delete
          </button>

          {/* <button className="primary" onClick={() => deletecomplete()}>
            DeleteAll
          </button> */}
        </footer>
      ) : null}
    </Fragment>
  );
}

export default Footer;
