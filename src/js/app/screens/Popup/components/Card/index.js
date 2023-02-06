import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import { CustomIcons } from '../../../../constants/icons';

function Card({ data, cardHanlder, setbulkArr, selectedArr, category }) {
  const { hash, shortText, copiedDate, isFavorite, sourceUrl } = data;
  const [showCheckbox, setshowCheckbox] = useState(false);
  const [checked, setchecked] = useState(false);
  const timeFromnow = moment(copiedDate).fromNow();

  const makeChecked = (e) => {
    const { checked } = e.target;
    setchecked(checked);
    if (checked) setbulkArr([...selectedArr, hash]);
    else setbulkArr([...selectedArr.filter((s) => s !== hash)]);
  };

  useEffect(() => {
    setchecked(selectedArr && selectedArr.indexOf(hash) > -1);
    setshowCheckbox(selectedArr && selectedArr.indexOf(hash) > -1);
  }, [selectedArr]);

  return (
    <div className={`card ${checked ? 'filled' : ''}`} key={hash}>
      {category.value !== 'source' ? (
        <Fragment>
          <div className="check">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="cards"
                checked={checked}
                onChange={(e) => makeChecked(e)}
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <div
            className="card_content"
            onClick={() => cardHanlder('edit', hash)}
          >
            <div className="cliptext">{shortText.slice(0, 120)}</div>
            <div className="timestamp"> {timeFromnow} </div>
          </div>
          <div className="card_actions">
            <span aria-label="Copy" onClick={() => cardHanlder('copy', hash)}>
              {CustomIcons('copy')}
              <span style={{ fontSize: '10px', fontWeight: '600' }}> Copy</span>
            </span>
            <span
              aria-label="Favourite"
              onClick={() => cardHanlder('fav', hash)}
            >
              {CustomIcons(isFavorite ? 'favfill' : 'fav')}
              <span style={{ fontSize: '10px', fontWeight: '600' }}>
                Favourite
              </span>
            </span>
            <span
              aria-label="Delete"
              onClick={() => cardHanlder('delete', hash)}
            >
              {CustomIcons('delete')}
              <span style={{ fontSize: '10px', fontWeight: '600' }}>
                {' '}
                Delete{' '}
              </span>
            </span>
          </div>
        </Fragment>
      ) : (
        <div
          className="card_content"
          onClick={() => window.open(sourceUrl, '_blank')}
        >
          <div className="cliptext">{sourceUrl}</div>
          <div className="timestamp"> {timeFromnow} </div>
        </div>
      )}
    </div>
  );
}

export default Card;
