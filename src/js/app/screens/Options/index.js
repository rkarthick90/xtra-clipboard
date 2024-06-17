import React, { useState, useEffect, useCallback } from 'react';
import CsvDownload from 'react-json-to-csv';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { omit } from 'lodash';
import '../../../../css/options.css';
import {
  MODES,
  CLIPBOARD_COUNT,
  TAB_CONFIG,
  FREE_FEATURES,
  PREMIUM_FEATURES,
} from '../../constants/constant';
import Select from '../../components/Select';
import Switch from '../../components/Switch';
import db from '../../../utils/db';
import { Fragment } from 'react';
import ReactGA from 'react-ga';
import logo from '../../../../images/clipboard-48.png';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';

const defaultMode = MODES[0];
const defaultCount = CLIPBOARD_COUNT[1];
const defaultTab = TAB_CONFIG[0];

export const showToaster = (message) => {
  toast.info(message, {
    position: 'top-center',
    autoClose: 2000,
    pauseOnHover: false,
    draggable: false,
  });
};

const list = [
  {
    id: 'timeline',
    label: 'Timeline',
  },
  {
    id: 'websites',
    label: 'Websites',
  },
  {
    id: 'codesnippets',
    label: 'Code Snippets',
  },
];
const trackingId = 'UA-180249192-1'; // Replace with your Google Analytics tracking ID

function Options({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setmode] = useState(defaultMode);
  const [clipboardlimitCount, setclipboardlimitCount] = useState(defaultCount);
  const [activetab, setactivetab] = useState(defaultTab);
  const [exportData, setexportData] = useState([]);
  const [tabslist, setTabsList] = useState({});
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  ReactGA.initialize(trackingId);
  const ga = ReactGA.ga();
  ga('set', 'checkProtocolTask', null);

  const handleTabChange = (a) => {
    setactivetab(a);
    ReactGA.event({
      category: 'tracker',
      action: window.localStorage.getItem('appId'),
      label: 'settings tab changed',
    });
  };

  useEffect(() => {
    const tabPref = localStorage.getItem('tab-preference');
    const defaults = {
      timeline: true,
      websites: true,
      codesnippets: false,
    };
    if (tabPref) {
      setTabsList(JSON.parse(tabPref));
    } else {
      setTabsList(defaults);
      localStorage.setItem('tab-preference', JSON.stringify(defaults));
    }
  }, []);

  useEffect(() => {
    const currentTheme = window.localStorage.getItem('theme');
    if (currentTheme) setmode(MODES.find((m) => m.value === currentTheme));
    else window.localStorage.setItem('theme', mode.value);
  }, []);

  useEffect(() => {
    const currentCount = window.localStorage.getItem('clipboardlimitCount');
    if (currentCount)
      setclipboardlimitCount(
        CLIPBOARD_COUNT.find((m) => m.value == currentCount)
      );
    else
      window.localStorage.setItem(
        'clipboardlimitCount',
        clipboardlimitCount.value
      );
  }, []);

  useEffect(() => {
    const token = uuidv4();
    const currentAppID = window.localStorage.getItem('appId');
    if (!currentAppID) window.localStorage.setItem('appId', token);
    ReactGA.event({
      category: 'tracker',
      action: currentAppID || token,
      label: 'log',
    });
  }, []);

  useEffect(() => {
    // window.localStorage.setItem('theme', mode.value);
    db.table('clipboards')
      .toArray()
      .then((clipboards) => {
        setexportData(
          clipboards.map((d) =>
            omit(d, [
              'isFromCloudPro',
              'isFromSync',
              'isMerged',
              'isModified',
              'shortcText',
              'lastCopiedDate',
              'isFavourite',
              'tags',
            ])
          )
        );
      });
  }, []);

  // const saveChanges = () => {
  //   window.localStorage.setItem('theme', mode.value);
  //   window.localStorage.setItem('clipboardlimitCount', clipboardlimitCount.value);
  // };

  const clearData = async () => {
    await db.clipboards.clear();
    showToaster('Clipboards has been cleared successfully.');
  };

  const updateTabPreference = (item) => {
    const updated = { ...tabslist, [item]: !tabslist[item] };
    setTabsList(updated);
    localStorage.setItem('tab-preference', JSON.stringify(updated));
  };

  return (
    <div className="settings-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <div className="settings-aside">
        <img src={logo} alt="logo" width="50px" />
        <h1>Xtra Clipboard </h1>
        <div className="version"> v1.2.14 </div>
        <hr />
        <div className="tabs">
          {TAB_CONFIG.map((t, i) => (
            <div
              key={i}
              className={`tab ${activetab.value === t.value ? 'active' : ''}`}
              onClick={() => handleTabChange(t)}
            >
              {t.label}
            </div>
          ))}
        </div>
      </div>
      <div className="settings-content">
        {activetab.value === 'settings' ? (
          <div className="customize">
            <div className="fields">
              <div>
                <label> Application Theme </label>
                <div className="description">
                  Choose between light and dark theme
                </div>
              </div>
              <Select
                list={MODES}
                selectedItem={mode}
                onChange={(e) => {
                  setmode(e), window.localStorage.setItem('theme', e.value);
                  showToaster('Theme has been updated successfully.');
                }}
              />
            </div>
            <div className="fields">
              <div>
                <label> Clipboard Limit </label>
                <div className="description">
                  We recommend 250 as Default Limit, for better performance.
                </div>
              </div>
              <Select
                list={CLIPBOARD_COUNT}
                selectedItem={clipboardlimitCount}
                onChange={(a) => {
                  setclipboardlimitCount(a),
                    window.localStorage.setItem('clipboardlimitCount', a.value);
                  showToaster('Clipboard limit has been updated successfully.');
                }}
              />
            </div>
            <div className="fields">
              <div>
                <label> Customize Tabs </label>
                <div className="description">
                  Control tabs visibilty, You can enable only 3 for visible in
                  extension.
                </div>
              </div>
              <div className="chips">
                {tabslist &&
                  list.map((item) => (
                    <div
                      className={`chip ${tabslist[item.id] && 'active'} ${
                        item.id === 'timeline' && 'disabled'
                      }`}
                      key={item.id}
                      onClick={() =>
                        item.id !== 'timeline' && updateTabPreference(item.id)
                      }
                    >
                      {item.label}
                      <Switch
                        on={tabslist[item.id]}
                        handleChange={() =>
                          item.id !== 'timeline' && updateTabPreference(item.id)
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="fields">
              <div>
                <label> Export to Excel </label>
                <div className="description">
                  Export the whole clipboards into clipboards.csv.
                </div>
              </div>

              <CsvDownload
                data={exportData}
                filename="clipboards.csv"
                className="csv"
                style={{
                  background:
                    'linear-gradient(180deg, #0078FF 0%, #0063D2 100%)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: '#ffffff',
                  fontSize: '14px',
                  lineHeight: '17px',
                  fontWeight: '600',
                  padding: '10px 15px',
                  border: '0',
                }}
              >
                Export to Excel
              </CsvDownload>
            </div>
            <div className="fields">
              <div>
                <label> Clearing all Clipboards </label>
                <div className="description">
                  All content would be deleted permanantly and irreversible.
                </div>
              </div>
              <button
                style={{ float: 'none' }}
                className="deletebtn"
                onClick={openModal}
              >
                Clear Clipboards
              </button>
            </div>
          </div>
        ) : null}
        {activetab.value === 'pricing' ? <Plans /> : null}
        {activetab.value === 'support' ? <Support /> : null}
      </div>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal} width="small">
            <ModalHeader>
              <ModalTitle>Delete confirmation</ModalTitle>
            </ModalHeader>
            <ModalBody>Are you sure to delete your all clipboard</ModalBody>
            <ModalFooter>
              <button
                onClick={closeModal}
                style={{
                  border: 'none',
                  fontSize: '14px',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: '8px 12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  borderRadius: '4px',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  background: '#c82124',
                }}
                onClick={() => {
                  clearData();
                  closeModal();
                }}
              >
                Confirm
              </button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
}

export default Options;

const Plans = () => {
  ReactGA.initialize(trackingId);
  const ga = ReactGA.ga();
  ga('set', 'checkProtocolTask', null);

  const logEvent = () => {
    ReactGA.event({
      category: 'interest',
      action: window.localStorage.getItem('appId'),
      label: 'user gave interest for Pro plan',
    });
    showToaster('Thanks for showing interest.');
  };
  return (
    <div className="plans">
      <div className="plan">
        <div className="header">
          <h1> Free </h1>
          <h4> Forever </h4>
        </div>
        <div className="body">
          <ul>
            {FREE_FEATURES.map((f, i) => (
              <li key={i}> {f}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="plan">
        <div className="header">
          <h1> Pro </h1>
          <div className="comingsoon"> Coming soon </div>
        </div>
        <div className="body">
          <ul>
            {PREMIUM_FEATURES.map((g, i) => (
              <li key={i}> {g}</li>
            ))}
          </ul>
          <div className="action">
            <button onClick={logEvent}> Give interest </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Support = () => {
  return (
    <div className="support">
      <h1> Contact us </h1>
      <p>
        For any queries, concerns, or suggestions, Please do not hesitate to
        reach us out at smallproductsgroup@gmail.com
      </p>
      <br />
      <h1>Privacy</h1>
      <p>
        All the data in the Clipboard extensions is stored locally in your
        Chrome Browser. We advise not to store any important passwords or data
        in the extension.
      </p>
      <br />
      <h1>Feedback</h1>
      <p>
        You could share your Feedback via &nbsp;
        <a href="https://forms.gle/Yvoa6RaBWLMMfyGD9" target="blank">
          Feedback Form
        </a>
        . We would be more happy if you share you app experience and places we
        need to improvement as well.
      </p>
      &nbsp;
    </div>
  );
};
