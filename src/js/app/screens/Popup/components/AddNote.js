import React, { useState } from 'react';
import moment from 'moment';
import Switch from 'react-switch';
import md5 from 'md5';
import { useAppDispatch } from '../../../app-context';
import { UPDATE_CLIPBOARD } from '../../../constants/actions';
import db from '../../../../utils/db';

const getCurrentTimeStamp = (a) => moment(a).format('DD-MMM-YYYY, hh:mm a');

function AddNote(props) {
  const dispatch = useAppDispatch();
  const { card, addClipHanlder } = props;
  const [clip, setclip] = useState('');
  const currentTime = getCurrentTimeStamp(Date.now());

  const textAreaRef = React.createRef();

  const handleSubmit = () => {
    const textVal = clip.trim();
    const timestamp = Date.now();
    const hashGen = md5(textVal);
    if (textVal.length) {
      const payload = {
        copiedDate: timestamp,
        lastCopiedDate: timestamp,
        hash: hashGen,
        isModified: false,
        isFavorite: false,
        isManual: true,
        sourceUrl: null,
        shortText: textVal,
        originalText: textVal,
        isFromCloudPro: false,
        isFromSync: false,
        isMerged: false,
      };
      addClipHanlder(payload);
      setclip('');
    }
  };

  const handleClipChange = (e) => {
    const { value } = e.target;
    setclip(value);
  };

  return (
    <div className="addnote">
      <textarea
        ref={textAreaRef}
        placeholder="Add new note.."
        defaultValue={clip}
        onChange={(e) => handleClipChange(e)}
      ></textarea>
      {clip.length ? (
        <button
          type="button"
          className="primary addnotebtn"
          onClick={() => handleSubmit()}
          disabled={!clip.length}
        >
          Save
        </button>
      ) : null}
    </div>
  );
}

export default AddNote;
