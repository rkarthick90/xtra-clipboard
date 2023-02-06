import React from 'react';
import moment from 'moment';
import Switch from 'react-switch';
import md5 from 'md5';
import copy from 'clipboard-copy';
import { CustomIcons } from '../../../../constants/icons';
import { showToaster } from '../../index';

const getCurrentTimeStamp = (copiedDate) =>
  moment(copiedDate).format('DD-MMM-YYYY, hh:mm:ss a');

function EditClipboard({ card, addClipHanlder, close }) {
  const {
    sourceUrl,
    copiedDate,
    originalText,
    isFavorite,
    isManual,
    isView,
  } = card;
  const textAreaRef = React.createRef();
  const handleSubmit = () => {
    const { value } = textAreaRef.current;
    addClipHanlder(value.trim());
  };

  const copyContent = () => {
    copy(originalText);
    showToaster('Clip content has been copied!');
  };

  return (
    <div className="add-clipboard">
      <div className="keyval">
        <div className="bold">
          <span>{CustomIcons('time')}</span>
          Current time
        </div>
        <div>{getCurrentTimeStamp(copiedDate)} </div>
      </div>
      <div className="keyval">
        <div className="bold">
          <span>{CustomIcons('source')}</span>
          Source
        </div>
        <div> {sourceUrl} </div>
      </div>
      <div className="keyval">
        <div className="bold">
          <span>{CustomIcons('type')}</span>
          Category
        </div>
        <div> {isManual}</div>
      </div>
      <div className="keyval">
        <div className="bold">
          <span>{CustomIcons('fav')}</span>
          Favourtie
        </div>
        <div>
          <Switch
            checked={isFavorite}
            onColor="#2E95FF"
            handleDiameter={15}
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={35}
          />
        </div>
      </div>
      <textarea
        ref={textAreaRef}
        autoFocus
        id="manualClipboard"
        className="clipboardContent"
        placeholder="Paste your copied clipboard content here..."
      >
        {originalText}
      </textarea>
      <div className="actions">
        <button className="default" onClick={() => copyContent()}>
          Copy
        </button>
        <button className="default" onClick={() => close()}>
          Back
        </button>
        <button className="primary" onClick={() => handleSubmit()}>
          Save
        </button>
      </div>
    </div>
  );
}

export const createClipboardPaylod = (clipboard) => {
  const timestamp = Date.now();
  const hashGen = md5(clipboard);
  return {
    copiedDate: timestamp, //Date.now()
    lastCopiedDate: timestamp, // copied from tool
    hash: hashGen, //md5, pgp, sha1
    isModified: false,
    isFavorite: false,
    isManual: true,
    isFromCloudPro: false,
    isFromSync: false,
    isMerged: false,
    sourceUrl: null,
    shortText: clipboard,
    originalText: clipboard,
  };
};

export default EditClipboard;
