import React, { useState } from 'react';
import moment from 'moment';
import Switch from 'react-switch';
import ReactGA from 'react-ga';
import md5 from 'md5';
import copy from 'clipboard-copy';
// import { CustomIcons } from '../../../../constants/icons';
import { useAppDispatch } from '../../../../app-context';
import { UPDATE_CLIPBOARD } from '../../../../constants/actions';
import db from '../../../../../utils/db';
import { showToaster } from '../../index';

const getCurrentTimeStamp = (a) => moment(a).format('DD-MMM-YYYY, hh:mm a');

const AddNewClipboard = (props) => {
  const dispatch = useAppDispatch();
  const { isEdit, card, addClipHanlder, close } = props;
  const [isFavorite, setisFavorite] = useState(
    isEdit ? card.isFavorite : false
  );
  const [clip, setclip] = useState('');
  const currentTime = getCurrentTimeStamp(
    isEdit ? card.copiedDate : Date.now()
  );

  const trackingId = 'UA-180249192-1'; // Replace with your Google Analytics tracking ID
  ReactGA.initialize(trackingId);
  const ga = ReactGA.ga();
  ga('set', 'checkProtocolTask', null);

  const textAreaRef = React.createRef();

  const handleSubmit = () => {
    const textVal = clip.trim();
    const timestamp = Date.now();
    const hashGen = md5(textVal);
    if (textVal.length) {
      const payload = {
        copiedDate: isEdit ? card.copiedDate : timestamp,
        lastCopiedDate: isEdit ? card.lastCopiedDate : timestamp,
        hash: isEdit ? card.hash : hashGen,
        isModified: isEdit ? true : false,
        isFavorite: isFavorite,
        isManual: isEdit ? card.isManual : true,
        sourceUrl: isEdit ? card.isManual : null,
        shortText: textVal,
        originalText: textVal,
        isFromCloudPro: false,
        isFromSync: false,
        isMerged: false,
      };
      addClipHanlder(payload);
    }
  };

  const handleClipChange = (e) => {
    const { value } = e.target;
    setclip(value);
  };

  const makeItFavorite = async (clipData) => {
    await db.clipboards.put(clipData).then((data) => {
      dispatch({ type: UPDATE_CLIPBOARD, payload: clipData });
    });
  };

  const handleChange = () => {
    setisFavorite(!isFavorite);
    if (isEdit) {
      card.isFavorite = !isFavorite;
      makeItFavorite(card);
    }
  };

  const copyContent = () => {
    copy(card.originalText);
    showToaster('Clip content has been copied!');
  };

  React.useEffect(() => {
    ReactGA.event({
      category: 'tracker',
      action: window.localStorage.getItem('appId'),
      label: 'card click action',
    });
  }, [isEdit]);

  return (
    <div className="add-clipboard">
      {/* <div className="commonActions">
        <div className="keyval">
          <div className="title">Created at</div>
          <div className="data-value">{currentTime}</div>
        </div>
        <div className="keyval">
          <div className="title">Category</div>
          <div className="data-value"> Added by you </div>
        </div>
        <div className="keyval">
          <div className="title">Favourite</div>
          <div>
            <Switch
              onChange={handleChange}
              checked={isFavorite}
              onColor="#2E95FF"
              handleDiameter={10}
              height={14}
              width={26}
            />
          </div>
        </div>
      </div> */}
      {/* {isEdit ? (
        <div className="commonActions">
          <div className="keyval">
            <div className="title">Source</div>
            <a className="sourceurl" href={card.sourceUrl} target="_blank">
              {isEdit ? card.sourceUrl : '-'}
            </a>
          </div>
        </div>
      ) : null} */}

      <textarea
        ref={textAreaRef}
        autoFocus
        id="manualClipboard"
        className={isEdit && 'adjust'}
        placeholder="Enter your content here..."
        onChange={(e) => handleClipChange(e)}
      >
        {isEdit && card ? card.originalText : ''}
      </textarea>
      <div className="actions">
        <button className="default first" onClick={() => copyContent()}>
          Copy
        </button>
        <button className="secondary" onClick={() => close()}>
          Back
        </button>
        <button
          className="primary"
          onClick={() => handleSubmit()}
          disabled={!clip.length}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export const createClipboardPaylod = (
  clipboard,
  isManual = false,
  isFavorite = false,
  isModified = false
) => {
  const timestamp = Date.now();
  const hashGen = md5(clipboard);
  return {
    copiedDate: timestamp, //Date.now()
    lastCopiedDate: timestamp, // copied from tool
    hash: hashGen, //md5, pgp, sha1
    isModified: isModified,
    isFavorite: isFavorite,
    isManual: isManual,
    isFromCloudPro: false,
    isFromSync: false,
    isMerged: false,
    sourceUrl: null,
    shortText: clipboard,
    originalText: clipboard,
  };
};

export default AddNewClipboard;
