import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import matchSorter from 'match-sorter';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactGA from 'react-ga';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Select from '../../components/Select';
import CardList from './components/CardList';
import AddNewClipboard from './components/Manual';
import AddNote from './components/AddNote';
import { DROPMENU, ViewBy } from '../../constants/constant';
import {
  ADD_CLIPBOARD,
  SET_APP_STATE,
  UPDATE_CLIPBOARD,
} from '../../constants/actions';
import {
  useAppState,
  useAppDispatch,
  getAllClipboard,
} from '../../app-context';
import db from '../../../utils/db';
import whiteEmpty from '../../../../images/No-Clipboard-white.png';
import blackEmpty from '../../../../images/No-Clipboard-black.png';

const trackingId = 'UA-180249192-1'; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);

const defaultCategory = {
  label: 'All',
  value: 'all',
};

export const showToaster = (message) => {
  toast.info(message, {
    position: 'top-center',
    autoClose: 2000,
    pauseOnHover: false,
    draggable: false,
  });
};

export const errToaster = (message) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    pauseOnHover: false,
    draggable: false,
  });
};

const sortData = (array) => {
  array.sort(function (a, b) {
    return new Date(b.copiedDate) - new Date(a.copiedDate);
  });
};

function Popup(props) {
  const { clipboards } = useAppState();
  const dispatch = useAppDispatch();
  const [category, setcategory] = useState(defaultCategory);
  const [clipboardslist, setclipboardslist] = useState(clipboards);
  const [isAddNew, setisAddNew] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [isView, setisView] = useState(false);
  const [editCard, seteditCard] = useState(null);
  const [bulkArr, setbulkArr] = useState([]);
  const [theme, settheme] = useState(null);
  const [appstate, setappstate] = useState(null);
  const [currentView, setCurrentView] = useState('time');
  const [clipboardCount, setClipboardCount] = useState(null);
  const [searchtext, setSearchtext] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ga = ReactGA.ga();
  ga('set', 'checkProtocolTask', null);

  useEffect(() => {
    if (!clipboards.length) {
      setIsLoading(true);
      getAllClipboard(dispatch);
    }
  }, []);

  useEffect(() => {
    if (clipboards.length) {
      const list = getFilterdData(category.value);
      const sorted = sortData(list);
      setIsLoading(false);
      setclipboardslist(list);
      setClipboardCount(list.length);
    } else {
      setIsLoading(false);
      setclipboardslist(clipboards);
      setClipboardCount(clipboards.length);
    }
  }, [clipboards]);

  useEffect(() => {
    const currentTheme = window.localStorage.getItem('theme');
    if (currentTheme) settheme(currentTheme);
    else window.localStorage.setItem('theme', theme);
  }, []);

  useEffect(() => {
    const curentState = window.localStorage.getItem('appState');
    if (curentState) setappstate(curentState === 'true');
    else
      window.localStorage.setItem(
        'appState',
        appstate ? appstate.toString() : 'true'
      );
  }, []);

  useEffect(() => {
    getFilterdData(category.value);
  }, [category]);

  const getFilterdData = (type) => {
    let filtered;
    if (type === 'fav') {
      filtered = clipboards.filter((a) => a.isFavorite === true);
    } else if (type === 'manual') {
      filtered = clipboards.filter((a) => a.isManual === true);
    } else if (type === 'source') {
      filtered = clipboards.filter((a) => a.sourceUrl !== null);
    } else {
      filtered = clipboards;
    }
    const value = document.getElementById('Search').value;
    const filteredClips = value.length
      ? matchSorter(filtered, value, {
          keys: [
            {
              threshold: matchSorter.rankings.CONTAINS,
              key: type === 'source' ? 'sourceUrl' : 'originalText',
            },
          ],
        })
      : filtered;
    return filteredClips;
  };

  const handleCategoryChange = (cat) => {
    setcategory(cat);
    const list = getFilterdData(cat.value);
    setclipboardslist(list);
    setClipboardCount(list.length);
    ReactGA.event({
      category: 'tracker',
      action: window.localStorage.getItem('appId'),
      label: 'app category changed',
    });
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    if (value && value.length > 0 && value !== null) {
      const filteredClips = matchSorter(clipboards, value, {
        keys: [
          { threshold: matchSorter.rankings.CONTAINS, key: 'originalText' },
        ],
      });
      setclipboardslist(filteredClips);
      setClipboardCount(filteredClips.length);
    } else {
      handleCategoryChange(category);
      ReactGA.event({
        category: 'tracker',
        action: window.localStorage.getItem('appId'),
        label: 'Search',
      });
    }
    setSearchtext(value);
  };

  const closeAddClip = () => {
    setisAddNew(false);
    setisEdit(false);
  };

  const isObjExists = (key) => {
    return clipboards.find((o) => o.hash === key);
  };

  const pushToIDB = async (payload) => {
    await db.clipboards.put(payload).then((data) => {
      dispatch({ type: ADD_CLIPBOARD, payload });
      showToaster('Clip has been added');
    });
  };

  const updatedDB = async (payload) => {
    await db.clipboards.put(payload).then((data) => {
      dispatch({ type: UPDATE_CLIPBOARD, payload });
      showToaster('Changes were updated');
    });
  };

  const addClipHanlder = (payload) => {
    const isExist = isObjExists(payload.hash);
    if (!isExist) {
      pushToIDB(payload);
      closeAddClip();
      return;
    } else if (isEdit && isExist) {
      updatedDB(payload);
      closeAddClip();
      return;
    } else {
      errToaster('Clip already exists');
    }
  };

  const emptyBulkArr = () => {
    setbulkArr([]);
  };

  const toggleAppState = (curState) => {
    setappstate(curState);
    window.localStorage.setItem('appState', curState.toString());
  };

  const obj = JSON.parse(localStorage.getItem('tab-preference'));

  const themenow = window.localStorage.getItem('theme');

  return (
    <div className={`popup_container ${theme}`}>
      <div className="layout">
        <Header
          {...props}
          toggleNew={setisAddNew}
          currentAppState={appstate}
          toggleAppState={toggleAppState}
          emptyBulkArr={emptyBulkArr}
          handleSearch={handleSearch}
          isEnabled={isView || isEdit}
        />
        <div className="popup_content">
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
          {isEdit || isView ? (
            <AddNewClipboard
              addClipHanlder={addClipHanlder}
              close={closeAddClip}
              card={editCard}
              isEdit={isEdit}
              isView={isView}
            />
          ) : (
            <React.Fragment>
              <div className="filterBar">
                <div className="pills">
                  <div
                    className={`pill ${currentView === 'time' && 'active'}`}
                    onClick={() => {
                      emptyBulkArr();
                      setCurrentView('time');
                    }}
                  >
                    Timeline
                  </div>
                  {obj && obj.websites ? (
                    <div
                      className={`pill ${currentView === 'web' && 'active'}`}
                      onClick={() => {
                        emptyBulkArr();
                        setCurrentView('web');
                      }}
                    >
                      Websites
                    </div>
                  ) : null}
                  {obj && obj.codesnippets ? (
                    <div
                      className={`pill ${currentView === 'code' && 'active'}`}
                      onClick={() => {
                        emptyBulkArr();
                        setCurrentView('code');
                      }}
                    >
                      Code snippets
                    </div>
                  ) : null}
                </div>
                <div>&nbsp;</div>
                <Select
                  list={DROPMENU}
                  selectedItem={category}
                  onChange={handleCategoryChange}
                  totalCount={clipboardCount}
                />
              </div>
              {clipboardslist && clipboardslist.length ? (
                <CardList
                  cards={clipboardslist}
                  openEdit={setisEdit}
                  openCard={seteditCard}
                  selectedArr={bulkArr}
                  setbulkArr={setbulkArr}
                  openView={setisView}
                  category={category}
                  currentView={currentView}
                  emptyBulkArr={emptyBulkArr}
                  updateCount={setClipboardCount}
                />
              ) : category.value === 'all' && !searchtext && isLoading ? (
                <SkeletonTheme color={themenow === 'dark' ? '#39393a' : '#eee'}>
                  <div className="cardlist">
                    <h1>
                      <Skeleton width={130} height={18} />
                    </h1>
                    {[1, 2, 3].map((a) => (
                      <div className="card" key={a}>
                        <div className="check">
                          <Skeleton width={20} height={20} />
                        </div>
                        <div className="card_content">
                          <Skeleton count={2} height={13} />
                          <Skeleton width={120} height={8} />
                        </div>
                      </div>
                    ))}
                  </div>
                </SkeletonTheme>
              ) : (
                <div
                  style={{
                    marginTop: '60px',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={themenow === 'dark' ? blackEmpty : whiteEmpty}
                    alt="empty"
                  />
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      marginTop: '10px',
                      color: themenow === 'dark' ? '#fff' : '#27272b',
                    }}
                  >
                    {searchtext && searchtext.length
                      ? 'No match found'
                      : 'No clipboards to show here!'}
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
        {bulkArr.length ? (
          <Footer
            {...props}
            selectedArr={bulkArr}
            emptySelectedArr={emptyBulkArr}
            cards={clipboardslist}
          />
        ) : (
          !isEdit && <AddNote addClipHanlder={addClipHanlder} card={editCard} />
        )}
      </div>
    </div>
  );
}

export default Popup;
