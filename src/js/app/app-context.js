import React, { useReducer, useContext } from 'react';
import {
  SET_INITIAL_STATE,
  ADD_CLIPBOARD,
  MARK_CLIPBOARD_FAVOURITE,
  UPDATE_CLIPBOARD,
  DELETE_CLIPBOARD,
  BULK_DELETE,
  BULK_FAVOURITE,
  GET_ALL_CLIPBOARDS,
  SET_APP_STATE,
} from './constants/actions';
import db from '../utils/db';
import moment from 'moment';
// import { startCase } from 'lodash';

const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();

const initialState = {
  isAppEnabled: true,
  copiedtxt: null,
  clipboards: [],
};

function AppReducer(state, action) {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return { ...state, ...action.payload };
    case SET_APP_STATE:
      return {
        ...state,
        isAppEnabled: action.appState,
      };
    case ADD_CLIPBOARD:
      return {
        ...state,
        clipboards: [...state.clipboards, action.payload],
      };
    case MARK_CLIPBOARD_FAVOURITE:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_CLIPBOARD:
      return {
        ...state,
        clipboards: [
          ...state.clipboards.map((clip) => {
            if (clip.hash === action.payload.hash) {
              return action.payload;
            }
            return clip;
          }),
        ],
      };
    case DELETE_CLIPBOARD:
      return {
        ...state,
        clipboards: [...state.clipboards.filter((a) => a.hash !== action.hash)],
      };
    case BULK_DELETE:
      return {
        ...state,
        clipboards: [
          ...state.clipboards.filter(
            (a) => action.hashArr.indexOf(a.hash) === -1
          ),
        ],
      };
    case BULK_FAVOURITE:
      return {
        ...state,
        clipboards: [
          ...state.clipboards.map((clip) => {
            if (action.hashArr.indexOf(clip.hash) > -1) {
              clip.isFavorite = true;
              return clip;
            }
            return clip;
          }),
        ],
      };
    case GET_ALL_CLIPBOARDS:
      return {
        ...state,
        clipboards: [...state.clipboards, ...action.clipboards],
      };

    default:
      return state;
  }
}

function AppProvider({ children }) {
  function init(initialState) {
    return {
      ...initialState,
    };
  }
  const [state, dispatch] = useReducer(AppReducer, initialState, init);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const stateContext = useContext(AppStateContext);
  if (stateContext === undefined) {
    throw new Error(
      'App State must be inside corresponding Provider or AppReducer might be faulty'
    );
  }
  return stateContext;
}

function useAppDispatch() {
  const dispatchContext = useContext(AppDispatchContext);
  if (dispatchContext === undefined) {
    throw new Error(
      'App Dispatch must be inside corresponding Provider or AppReducer might be faulty'
    );
  }
  return dispatchContext;
}

async function clearOlderData(limit) {
  const lastmonthDate = moment()
    .subtract(1, 'month')
    .startOf('month')
    .valueOf();
  const totalCount = await db.clipboards.count();

  if (totalCount > limit) {
    let old = null;
    await db
      .table('clipboards')
      .orderBy('copiedDate')
      .reverse()
      .limit(Number(limit))
      .toArray()
      .then((clipboards) => {
        old = clipboards[Number(limit) - 1].copiedDate;
      });
    db.table('clipboards')
      .where('copiedDate')
      .below(old)
      .and((item) => !item.isFavorite)
      .delete()
      .then(function (deleteCount) {
        console.log('===####======###old#data#count######====== ', deleteCount);
      });
  } else {
    // only after 1 month and only favourite items and also count
    db.table('clipboards')
      .where('copiedDate')
      .below(lastmonthDate)
      .and((item) => !item.isFavorite)
      .delete()
      .then(function (deleteCount) {
        console.log('===####======###old#data#######=======', deleteCount);
      });
  }
}

async function getAllClipboard(dispatch) {
  const Countlimit = window.localStorage.getItem('clipboardlimitCount') || 250;
  clearOlderData(Countlimit);
  db.table('clipboards')
    .orderBy('copiedDate')
    .reverse()
    .limit(Number(Countlimit))
    .toArray()
    .then((clipboards) => {
      dispatch({ type: GET_ALL_CLIPBOARDS, clipboards });
    });
}

export default AppProvider;
export { useAppState, useAppDispatch, getAllClipboard };
