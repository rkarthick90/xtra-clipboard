import React, { Fragment, useRef, useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import moment from 'moment';
import Card from '../Card';
import { useAppDispatch } from '../../../../app-context';
import {
  UPDATE_CLIPBOARD,
  DELETE_CLIPBOARD,
} from '../../../../constants/actions';
import db from '../../../../../utils/db';
import { showToaster } from '../../index';
import { EMPTY } from '../../../../constants/icons';
import whiteEmpty from '../../../../../../images/No-Clipboard-white.png';
import blackEmpty from '../../../../../../images/No-Clipboard-black.png';

function CardList(props) {
  const dispatch = useAppDispatch();
  // const textAreaRef = useRef(null);
  const [todayItems, setTodayItems] = useState([]);
  const [lastWeekItems, setLastWeekItems] = useState([]);
  const [currentMonthItems, setCurrentMonthItems] = useState([]);
  const [websitesList, setwebsitesList] = useState(null);
  const refs = [];

  const {
    cards,
    openEdit,
    openCard,
    selectedArr,
    setbulkArr,
    openView,
    category,
    currentView,
    emptyBulkArr,
  } = props;

  const makeItFavorite = async (clipData) => {
    await db.clipboards.put(clipData).then((data) => {
      dispatch({ type: UPDATE_CLIPBOARD, payload: clipData });
      showToaster(
        clipData.isFavorite
          ? 'Clip marked as Favourite'
          : 'Clip removed from Favourite'
      );
    });
  };

  const deleteCard = async (hash) => {
    await db.clipboards.delete(hash).then((data) => {
      dispatch({ type: DELETE_CLIPBOARD, hash });
      showToaster('Clip has been deleted');
    });
  };

  const cardHanlder = (type, hash) => {
    const card = cards.find((a) => a.hash === hash);

    switch (type) {
      case 'edit':
        emptyBulkArr();
        openEdit(true);
        openCard(card);
        return;
      case 'fav':
        const favCard = {
          ...card,
          isFavorite: !card.isFavorite,
        };
        makeItFavorite(favCard);
        return;
      case 'copy':
        // document.querySelector('textarea').value = card.originalText;
        // textAreaRef.current.select();
        // document.execCommand('copy');
        copy(card.originalText);
        showToaster('Clip has been copied!');
        return;
      case 'delete':
        deleteCard(hash);
        return;
      case 'view':
        emptyBulkArr();
        openEdit(false);
        openCard(card);
        openView(true);
        return;
      default:
        return;
    }
  };

  const todayList = (list) =>
    list.filter((a) => a.copiedDate > moment().startOf('day').valueOf());

  const lastWeekList = (list) =>
    list.filter(
      (a) =>
        a.copiedDate < moment().startOf('day').valueOf() &&
        a.copiedDate > moment().subtract(7, 'days').startOf('day').valueOf()
    );

  const thisMonthList = (list) =>
    list.filter(
      (a) =>
        a.copiedDate < moment().subtract(7, 'days').startOf('day').valueOf() &&
        a.copiedDate > moment().subtract(1, 'month').startOf('day').valueOf()
    );

  useEffect(() => {
    if (cards && cards.length) {
      setTodayItems(todayList(cards));
      setLastWeekItems(lastWeekList(cards));
      setCurrentMonthItems(thisMonthList(cards));
    }
  }, [cards]);

  // @TODO: strict regex check to filter the copied content
  useEffect(() => {
    if (currentView === 'web') {
      const urls = [];
      const cat = {};
      cards.forEach((a) => {
        if (a.sourceUrl) {
          const hostname = new URL(a.sourceUrl).hostname;
          urls.push(hostname);
          if (cat[hostname]) cat[hostname] = [...cat[hostname], a];
          else cat[hostname] = [a];
        }
      });
      props.updateCount(cards.filter((d) => d.sourceUrl).length || 0);
      setwebsitesList(cat);
    } else if (currentView === 'code') {
      const RegExSimple = /^[\w -#$#$&%.,:;{}<>\[/\]/\(/\)/=!~\?*']$/g;
      const text = /^[\w ]/g;
      const codeList = cards.filter((a) => !text.test(a.originalText));
      props.updateCount(codeList.length);
      setTodayItems(todayList(codeList));
      setLastWeekItems(lastWeekList(codeList));
      setCurrentMonthItems(thisMonthList(codeList));
    } else {
      props.updateCount(cards.length);
      setTodayItems(todayList(cards));
      setLastWeekItems(lastWeekList(cards));
      setCurrentMonthItems(thisMonthList(cards));
    }
  }, [cards, currentView]);

  const themenow = window.localStorage.getItem('theme');

  return (
    <div className="cardlist">
      {currentView !== 'web' ? (
        <Fragment>
          {todayItems && todayItems.length ? (
            <Fragment>
              <h1 ref={(el) => el && refs.push(el)}> Today </h1>
              {todayItems.map((item) => (
                <Card
                  data={item}
                  cardHanlder={cardHanlder}
                  selectedArr={selectedArr}
                  setbulkArr={setbulkArr}
                  category={category}
                />
              ))}
            </Fragment>
          ) : null}

          {lastWeekItems && lastWeekItems.length ? (
            <Fragment>
              <h1 ref={(el) => el && refs.push(el)}> Last Week </h1>
              {lastWeekItems.map((item) => (
                <Card
                  data={item}
                  cardHanlder={cardHanlder}
                  selectedArr={selectedArr}
                  setbulkArr={setbulkArr}
                  category={category}
                />
              ))}
            </Fragment>
          ) : null}

          {currentMonthItems && currentMonthItems.length ? (
            <Fragment>
              <h1 ref={(el) => el && refs.push(el)}> This month </h1>
              {currentMonthItems.map((item) => (
                <Card
                  data={item}
                  cardHanlder={cardHanlder}
                  selectedArr={selectedArr}
                  setbulkArr={setbulkArr}
                  category={category}
                />
              ))}
            </Fragment>
          ) : null}
        </Fragment>
      ) : websitesList && Object.keys(websitesList).length ? (
        Object.keys(websitesList).map((a) => (
          <Fragment>
            <h1 ref={(el) => el && refs.push(el)}> {a} </h1>
            {websitesList[a].map((item) => (
              <Card
                data={item}
                cardHanlder={cardHanlder}
                selectedArr={selectedArr}
                setbulkArr={setbulkArr}
                category={category}
              />
            ))}
          </Fragment>
        ))
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
            No clipboards to show here!
          </div>
        </div>
      )}
    </div>
  );
}

export default CardList;
