import React from 'react';
import './hot-reload';
import '../images/clipboard-16.png';
import '../images/clipboard-32.png';
import '../images/clipboard-48.png';
import '../images/clipboard-128.png';
import '../images/search.svg';
import db from './utils/db';
import md5 from 'md5';
import { useAppDispatch } from './app/app-context';
import { ADD_CLIPBOARD } from './app/constants/actions';

if (localStorage['lastVersionUsed'] != '1') {
  localStorage['lastVersionUsed'] = '1';
  chrome.tabs.create({
    url: chrome.extension.getURL('options.html'),
  });
}

function createClipboardPaylod(clipboard, sourceUrl) {
  const timestamp = Date.now();
  const hashGen = md5(clipboard);
  const shortText = clipboard.slice(0, 120);
  // const originalText = clipboard.slice(0, 5000);
  return {
    copiedDate: timestamp, //Date.now()
    lastCopiedDate: timestamp, // copied from tool
    hash: hashGen, //md5, pgp, sha1
    isModified: false,
    isFavorite: false,
    isManual: false,
    isFromCloudPro: false,
    isFromSync: false,
    isMerged: false,
    sourceUrl,
    shortText,
    originalText: clipboard,
  };
}

async function addDataToDB(info) {
  const payload = createClipboardPaylod(info.selectionText, info.pageUrl);
  await db.clipboards.put(payload).then((data) => {
    // console.log('data', data);
  });
}

chrome.contextMenus.create({
  title: 'Add to Xtra clipboard',
  contexts: ['page', 'selection', 'link'],
  onclick: addDataToDB,
});

// async function showLastFive(info) {
//   // const payload = createClipboardPaylod(info.selectionText, info.pageUrl);
//   // await db.clipboards.put(payload).then((data) => {
//   //   console.log('data', data);
//   // });
//   console.log('info');
// }

// const parent = chrome.contextMenus.create({
//   title: 'Bestow Clipboards',
//   contexts: ['editable'],
// });
// const child1 = chrome.contextMenus.create({
//   title: 'Latest',
//   parentId: parent,
//   onclick: showLastFive,
//   contexts: ['editable'],
// });
// const child2 = chrome.contextMenus.create({
//   title: 'Recent',
//   parentId: parent,
//   onclick: showLastFive,
//   contexts: ['editable'],
// });
!(function (e) {
  function t(t) {
    for (
      var i, n, o = t[0], h = t[1], c = t[2], l = 0, u = [];
      l < o.length;
      l++
    )
      (n = o[l]),
        Object.prototype.hasOwnProperty.call(r, n) && r[n] && u.push(r[n][0]),
        (r[n] = 0);
    for (i in h) Object.prototype.hasOwnProperty.call(h, i) && (e[i] = h[i]);
    for (d && d(t); u.length; ) u.shift()();
    return a.push.apply(a, c || []), s();
  }
  function s() {
    for (var e, t = 0; t < a.length; t++) {
      for (var s = a[t], i = !0, o = 1; o < s.length; o++) {
        var h = s[o];
        0 !== r[h] && (i = !1);
      }
      i && (a.splice(t--, 1), (e = n((n.s = s[0]))));
    }
    return e;
  }
  var i = {},
    r = { 1: 0 },
    a = [];
  function n(t) {
    if (i[t]) return i[t].exports;
    var s = (i[t] = { i: t, l: !1, exports: {} });
    return e[t].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
  }
  (n.m = e),
    (n.c = i),
    (n.d = function (e, t, s) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var s = Object.create(null);
      if (
        (n.r(s),
        Object.defineProperty(s, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var i in e)
          n.d(
            s,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return s;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = './');
  var o = (window.webpackJsonp = window.webpackJsonp || []),
    h = o.push.bind(o);
  (o.push = t), (o = o.slice());
  for (var c = 0; c < o.length; c++) t(o[c]);
  var d = h;
  a.push([195, 0]), s();
})({
  195: function (e, t, s) {
    s(59), (e.exports = s(420));
  },
  196: function (e, t) {
    !(function () {
      var e = this,
        t = function (t, s) {
          var i,
            r = t.split('.'),
            a = window || e;
          r[0] in a || !a.execScript || a.execScript('var ' + r[0]);
          for (; r.length && (i = r.shift()); )
            r.length || void 0 === s
              ? (a = a[i] ? a[i] : (a[i] = {}))
              : (a[i] = s);
        },
        s = function (e) {
          var t = chrome.runtime.connect(
              'lknambhoiggcnmbnlmdihchhmjjjdppk',
              {}
            ),
            s = !1;
          t.onMessage.addListener(function (t) {
            (s = !0),
              'response' in t && !('errorType' in t.response)
                ? e.success && e.success(t)
                : e.failure && e.failure(t);
          }),
            t.onDisconnect.addListener(function () {
              !s &&
                e.failure &&
                e.failure({
                  request: {},
                  response: { errorType: 'INTERNAL_SERVER_ERROR' },
                });
            }),
            t.postMessage(e);
        };
    })();
  },
  420: function (e, t, s) {
    'use strict';
    s.r(t);
    var i = s(54),
      r = s(26),
      a = s.n(r),
      n = s(1),
      o = s(19),
      h = s(9),
      c = s(5),
      d = s(51),
      l = s(18),
      u = s.n(l),
      m = s(44),
      g = s.n(m);
    u.a.extend(g.a);
    var b = u.a,
      p = s(13),
      f = s(52);
    var _ = class {
        constructor(e, t) {
          (this.storage = {}), (this._defaults = t), (this._storeKeyName = e);
        }
        init() {
          return this._load()
            .then((e) => this._mixDefaults(e))
            .then(() => this.storage);
        }
        _mixDefaults(e) {
          return (
            (this.storage = Object.assign(this._getDefaults(), e)),
            Promise.resolve()
          );
        }
        get(e) {
          return this.storage[e];
        }
        set(e) {
          let t = !1;
          return (
            Object.keys(e).forEach((s) => {
              let i = this._defaults[s];
              if (!i) return;
              i = i[0];
              const r = e[s];
              i && typeof r === i
                ? ((this.storage[s] = r), (t = !0))
                : console.warn(
                    `Wrong value type. Key: ${s}, Type: ${i}, Value: ${r} [${typeof r}]`
                  );
            }),
            this._commit().then(() => (t && this.emitUpdate(), t))
          );
        }
        getAll() {
          return Object.assign({}, this.storage);
        }
        emitUpdate() {}
        _load() {
          return new Promise((e) => {
            chrome.storage.local.get(this._storeKeyName, (t) => {
              e(t && t[this._storeKeyName] ? t[this._storeKeyName] : {});
            });
          });
        }
        _getDefaults() {
          return Object.keys(this._defaults).reduce(
            (e, t) => ((e[t] = this._defaults[t][1]), e),
            {}
          );
        }
        _commit() {
          return new Promise((e) => {
            chrome.storage.local.set({ [this._storeKeyName]: this.storage }, e);
          });
        }
      },
      v = s(27);
    var y = class extends _ {
      constructor() {
        super('settings', {
          appState: ['boolean', !0],
          isTimeLimited: ['boolean', !1],
          isItemsLimited: ['boolean', !1],
          isCharsLimited: ['boolean', !1],
          timeCount: ['number', 1],
          timePeriod: ['string', 'w'],
          itemsLimit: ['number', 150],
          charsLimit: ['number', 5e3],
          sortMethod: ['string', 'lastCopiedDate'],
          guid: ['string', ''],
          loadOnScroll: ['boolean', !0],
          showBadgeCount: ['boolean', true],
          contextMenuMode: ['string', 'smart'],
          defaultViewMode: ['string', c.a.ALL],
          defaultMergeChar: ['string', 'newline'],
          copyFreshlyMerged: ['boolean', true],
          cloudHidden: ['boolean', !0],
          selectedTextAction: ['string', 'auto'],
          theme: ['string', 'auto'],
          autoSyncCloudPro: ['boolean', !1],
          pageWidgetContext: ['boolean', !0],
          itemViewBreakText: ['boolean', !0],
          itemViewFontSizePx: ['number', 14],
          itemViewMetaHidden: ['boolean', !1],
          itemViewShowWhitespaces: ['boolean', !1],
          pageWidgetX: ['number', 20],
          pageWidgetY: ['number', 20],
          pageWidgetWidth: ['number', 180],
          pageWidgetHeight: ['number', 200],
          lockEnabled: ['boolean', !1],
          lockButtonHidden: ['boolean', !1],
          lockSet: ['boolean', !1],
          lockCodeHash: ['string', ''],
          lockTimer: ['string', v.a.OFF],
          lockChangeBadge: ['boolean', !0],
        }),
          (this._localStorageSettingsKeys = [
            'appState ',
            'charsLimit',
            'contextMenuMode',
            'defaultMergeChar',
            'defaultViewMode',
            'guid',
            'isCharsLimited',
            'isItemsLimited',
            'isTimeLimited',
            'itemsLimit',
            'loadOnScroll',
            'oldCloudMigrated',
            'showBadgeCount',
            'sortMethod',
            'timeCount',
            'timePeriod',
          ]),
          (this._themeProvider = new f.a());
      }
      init() {
        return Promise.all([this._load(), this._checkMigration()])
          .then(([e, t]) => this._mixDefaults(e, t))
          .then(() => this._commit());
      }
      set(e) {
        return this._processLsSettings(e), super.set(e);
      }
      _processLsSettings(e) {
        Object.keys(e).forEach((t) => {
          'theme' === t && this._themeProvider.set(e[t]);
        });
      }
      resetAll() {
        return new Promise((e, t) => {
          chrome.storage.local.clear(() => {
            chrome.runtime.lastError ||
              (localStorage.clear(), e(), Object(d.a)());
          });
        });
      }
      _checkMigration() {
        return new Promise((e) => {
          chrome.storage.local.get('settings_migrated', (t) => {
            if (t && !0 === t.settings_migrated) return void e({});
            const s = this._getLocalStorageSettings();
            e(s);
          });
        });
      }
      _getLocalStorageSettings() {
        return this._localStorageSettingsKeys.reduce((e, t) => {
          if (void 0 !== localStorage[t]) {
            let s = localStorage[t];
            ['true', 'false'].includes(s) && (s = 'true' === s), (e[t] = s);
          }
          return e;
        }, {});
      }
      _removeLocalStorageSettings() {
        this._localStorageSettingsKeys.forEach((e) =>
          localStorage.removeItem(e)
        );
      }
      _mixDefaults(e, t = {}) {
        const s = Object.assign(this._getDefaults(), e, t);
        return (
          ('string' == typeof s.guid && s.guid) || (s.guid = Object(p.d)()),
          '-id' === s.sortMethod && (s.sortMethod = 'copiedDate'),
          '-date' === s.sortMethod && (s.sortMethod = 'lastCopiedDate'),
          (this.storage = s),
          Object.keys(t).length
            ? new Promise((e) => {
                chrome.storage.local.set({ settings_migrated: !0 }, () => {
                  chrome.runtime.lastError ||
                    this._removeLocalStorageSettings(),
                    e();
                });
              })
            : Promise.resolve()
        );
      }
    };

    var S = class {
        constructor(e) {
          (this.onChange =
            e ||
            (() => {
              throw new Error('onChangeHandler did not set');
            })),
            (this.pasteElement = document.getElementById('paste-field')),
            (this.currentTimer = null),
            (this.enabled = null),
            (this.notATextDetected = !1),
            (this._pasteLoop = this._pasteLoop.bind(this));
        }
        start() {
          if (!this.pasteElement) throw new Error('No paste element found');
          (this.enabled = !0),
            this.pasteElement.focus(),
            null === this.currentTimer &&
              (this.currentTimer = setTimeout(this._pasteLoop, 1200));
        }
        stop() {
          clearTimeout(this.currentTimer),
            (this.currentTimer = null),
            (this.enabled = !1);
        }
        _pasteLoop() {
          const e = this.pasteElement.value;
          (this.pasteElement.value = ''), document.execCommand('paste');
          const t = this.pasteElement.value;
          t
            ? t !== e &&
              ((this.notATextDetected = !1),
              this.enabled && this.onChange({ isText: !0, value: t }))
            : this.notATextDetected ||
              ((this.notATextDetected = !0),
              this.onChange({ isText: !1, value: t })),
            clearTimeout(this.currentTimer),
            (this.currentTimer = null),
            this.enabled &&
              (this.currentTimer = setTimeout(this._pasteLoop, 1200));
        }
      },
      w = s(114);
    const A = /^\[(.+)\]$/;
    function C(e, t) {
      let s = t.toLowerCase();
      const i = s.match(A);
      s = i && i.length ? i[1] : s;
      return i && s
        ? e.filter((e) =>
            ((e) => e.tags && e.tags.some((e) => e.toLowerCase() === s))(e)
          )
        : e.filter(
            (e) =>
              ((e) => e.text.toLowerCase().includes(s))(e) ||
              ((e) =>
                e.tags && e.tags.some((e) => e.toLowerCase().includes(s)))(e)
          );
    }
    function P({ text: e, hash: t }, s) {
      const i = Date.now();
      return (
        t || (t = a.a.hash(e)),
        {
          originalText: e,
          hash: t,
          copiedDate: i,
          lastCopiedDate: i,
          length: e.length,
          shortText: e.slice(0, h.n),
          tags: [],
          sourceUrl: null,
          isFavorite: !1,
          isMerged: !1,
          isFromSync: !1,
          isModified: !1,
          isFromCloudPro: !1,
          ...s,
        }
      );
    }
    function x(e) {
      if (
        ('string' !=
          typeof (e = (function (e) {
            const t = {
                full: 'text',
                date: 'copiedDate',
                favorite: 'isFavorite',
                fromSync: 'isFromSync',
                merged: 'isMerged',
                sourceURL: 'sourceUrl',
                tags: 'tags',
              },
              s = Object.assign({}, e);
            return (
              Object.keys(t).forEach((i) => {
                const r = t[i];
                void 0 !== e[i] &&
                  void 0 === s[r] &&
                  ((s[r] = e[i]), delete s[i]),
                  'tags' === i &&
                    Array.isArray(e[i]) &&
                    (s[r] = e[i].map((e) =>
                      'object' == typeof e && e.text
                        ? e.text
                        : 'string' == typeof e
                        ? e
                        : void 0
                    ));
              }),
              s
            );
          })(e)).text && (e.text = '' + e.text),
        !e.text)
      )
        return null;
      const t = P({ text: e.text }),
        s = Object.keys(t),
        i = ['text'];
      return (
        Object.keys(e).forEach((r) => {
          s.includes(r) && !i.includes(r) && (t[r] = e[r]);
        }),
        (t.lastCopiedDate = t.copiedDate),
        t
      );
    }
    class M {
      constructor(e) {
        (this.dbInstance = null),
          (this.table = null),
          (this.onChange = e),
          (this.hashCache = new Set()),
          (this.favoritesCount = null),
          (this.fillHashCash = this.fillHashCash.bind(this));
      }
      init() {
        return new Promise((e) => {
          (this.dbInstance = new w.a('bestowDB')),
            this.dbInstance
              .version(1)
              .stores({ clipboards: '&hash, copiedDate, lastCopiedDate' })
              .upgrade(this._migration),
            (this.table = this.dbInstance.clipboards),
            e();
        })
          .then(this.fillHashCash)
          .then(this.countFavorites.bind(this));
      }
      _migration(e) {
        return e
          .table('history')
          .toArray()
          .then((e) => e.map(x))
          .then((t) => e.table('clipboards').bulkAdd(t))
          .then(() => {
            0;
          });
      }
      fillHashCash() {
        return this.table
          .toCollection()
          .keys()
          .then((e) => {
            const t = e.length;
            this.hashCache.clear();
            for (let s = 0; s < t; s++) this.hashCache.add(e[s]);
            return (
              this.emmitChange('cache_filled'),
              Promise.resolve({ cacheSize: this.size })
            );
          });
      }
      emmitChange(e, t = {}) {
        return new Promise((s) => {
          const i = { type: e, ...t };
          setTimeout(() => {
            this.onChange(i);
          }, 0),
            s();
        });
      }
      isNew(e) {
        return !this.hashCache.has(e);
      }
      getAll() {
        return this.table
          .orderBy('copiedDate')
          .reverse()
          .toArray()
          .then((e) => ({ items: e }));
      }
      getItemByHash(e) {
        return this.table
          .where({ hash: e })
          .first()
          .then((e) => ({ item: e }));
      }
      getItemsByHash(e, t) {
        return this.table
          .where('hash')
          .anyOf(t)
          .reverse()
          .sortBy(e)
          .then((e) => ({ items: e }));
      }
      getItems(e = 'lastCopiedDate', t = 0, s, i = '') {
        const r = s === c.a.FAV ? (e) => e.isFavorite : () => !0,
          a = this.table.orderBy(e).filter(r).reverse();
        let n,
          o = a,
          d = this.size;
        if (i && 'string' == typeof i) {
          const e = C(a, i);
          (d = e.toArray().then((e) => e.length)), (o = e);
        }
        return (
          (n = o
            .offset(t * h.g)
            .limit(h.g)
            .toArray()),
          s === c.a.FAV && (d = this.favSize),
          Promise.all([n, d]).then(([e, t]) => [
            e.map((e) => {
              const t = { ...e };
              return (t.textBytes = Object(p.b)(t.text)), delete t.text, t;
            }),
            t,
          ])
        );
      }
      getFavorites(e = 'lastCopiedDate') {
        return this.table
          .orderBy(e)
          .reverse()
          .filter((e) => e.isFavorite)
          .toArray();
      }
      getLatestItems(e = 'lastCopiedDate', t) {
        return this.table
          .orderBy(e)
          .reverse()
          .toArray()
          .then((e) => e.slice(0, t));
      }
      add({ hash: e, text: t }, s) {
        const i = P({ text: t, hash: e }, s);
        return this.table
          .add(i)
          .then(
            () => (
              this.hashCache.add(i.hash),
              this.emmitChange('added', { hash: i.hash }),
              { hash: i.hash }
            )
          );
      }
      editText(e, t, s) {
        const i = { isModified: !0 };
        return (
          e.tags && (i.tags = [...e.tags]),
          (i.sourceUrl = e.sourceUrl),
          (i.isFavorite = e.isFavorite),
          s ||
            ((i.copiedDate = e.copiedDate),
            (i.lastCopiedDate = e.lastCopiedDate)),
          this.add({ text: t }, { ...i }).then((t) =>
            s ? t : this.deleteItems([e.hash], !1).then(() => t)
          )
        );
      }
      updateCopyDate(e, t = Date.now()) {
        if ('number' != typeof t) throw new Error('Copy date is not number');
        return this.table
          .where({ hash: e })
          .modify({ lastCopiedDate: t })
          .then(() => this.emmitChange('updated_copy_date', { hash: e }))
          .then(() => ({ lastCopiedDate: t }));
      }
      deleteItems(e, t = !0) {
        Array.isArray(e) || (e = [e]);
        const s = t ? (e) => !e.isFavorite : () => !0;
        return this.table
          .where('hash')
          .anyOf(e)
          .filter(s)
          .delete()
          .then((e) => {
            if (e)
              return this.emmitChange('item_deleted').then(this.fillHashCash);
          });
      }
      deleteAll(e) {
        return this.table
          .filter((t) => !t.isFavorite && t.hash !== e)
          .delete()
          .then((e) => {
            if (e)
              return this.emmitChange('items_deleted').then(this.fillHashCash);
          });
      }
      limitItemsCount(e = 'lastCopiedDate', t, s) {
        return this.table
          .count()
          .then((i) => {
            const r = i - t;
            return this.table
              .orderBy(e)
              .filter((e) => !e.isFavorite && e.hash !== s)
              .limit(r)
              .delete();
          })
          .then((e) =>
            e
              ? this.emmitChange('items_deleted').then(this.fillHashCash)
              : Promise.resolve()
          )
          .catch(M._handleException);
      }
      deleteOutdated(e, t, s) {
        this.table
          .where(e)
          .below(t)
          .filter((e) => e.hash !== s && !e.isFavorite)
          .delete()
          .then((e) =>
            e
              ? this.emmitChange('items_deleted').then(this.fillHashCash)
              : Promise.resolve()
          )
          .catch(M._handleException);
      }
      setFavorite(e, t) {
        if ('boolean' != typeof t)
          throw new Error('Favorite state is not boolean');
        return (
          Array.isArray(e) || (e = [e]),
          this.table
            .where('hash')
            .anyOf(e)
            .modify({ isFavorite: t })
            .then(() => this.emmitChange('item_changed'))
            .then(() => {
              if (1 !== e.length) return this.countFavorites();
              (this.favoritesCount += t ? 1 : -1),
                this.favoritesCount < 0 && (this.favoritesCount = 0);
            })
        );
      }
      setSourceUrl(e, t) {
        if ('string' != typeof t) throw new Error('Source URL is no a string');
        return this.table
          .where({ hash: e })
          .modify({ sourceUrl: t })
          .then(() => this.emmitChange('item_changed'));
      }
      setTags(e, t) {
        const s = t.filter((e) => 'string' == typeof e);
        return this.table
          .where({ hash: e })
          .modify({ tags: s })
          .then(() => this.emmitChange('item_changed'));
      }
      getAllTags() {
        return this.table
          .filter((e) => e.tags && e.tags.length)
          .toArray()
          .then((e) => {
            const t = e.reduce(
              (e, t) => (t.tags.forEach((t) => e.add(t)), e),
              new Set()
            );
            return Array.from(t);
          })
          .then((e) => ({ allTags: e }));
      }
      addMerged(e, t) {
        let s = {
          newline: '\n',
          comma: ',',
          semicolon: ';',
          space: ' ',
          tab: '\t',
          empty: '',
        }[t];
        return (
          void 0 === s && (s = '\n'),
          this.table
            .where('hash')
            .anyOf(e)
            .toArray()
            .then((t) =>
              t
                .sort((t, s) => e.indexOf(t.hash) - e.indexOf(s.hash))
                .map((e) => e.text)
                .join(s)
            )
            .then((e) => {
              const t = a.a.hash(e);
              return this.add({ hash: t, text: e }, { isMerged: !0 });
            })
        );
      }
      addSynced(e) {
        return (
          Array.isArray(e) || (e = [e]),
          this.addRemote(e, 'isFromSync', 'items_synced')
        );
      }
      addCloudPro(e) {
        return (
          Array.isArray(e) || (e = [e]),
          this.addRemote(e, 'isFromCloudPro', 'items_cloud_pro')
        );
      }
      addRemote(e, t, s) {
        const i = e
          .map((e) => {
            if (this.isNew(e.hash)) {
              const s = { [t]: !0, ...e };
              return (
                delete s.lastCopiedDate,
                delete s.copiedDate,
                P({ text: e.text, hash: e.hash }, { ...s })
              );
            }
          })
          .filter(Boolean);
        return i && i.length ? this.bulkAdd(i, s) : Promise.resolve();
      }
      importItems(e) {
        const t = e.map(x).filter(Boolean);
        return t && t.length
          ? this.bulkAdd(t, 'items_imported')
          : Promise.resolve();
      }
      bulkAdd(e, t) {
        return this.table
          .bulkAdd(e)
          .catch(w.a.BulkError, (e) => (console.warn(e), Promise.resolve()))
          .then(() => this.emmitChange(t))
          .then(() => this.fillHashCash())
          .then(() => this.countFavorites());
      }
      countFavorites() {
        return this.table
          .filter((e) => e.isFavorite)
          .count()
          .then((e) => {
            this.favoritesCount = e >= 0 ? e : 0;
          })
          .then(() => this.emmitChange('fav_counted'));
      }
      get favSize() {
        return this.favoritesCount;
      }
      get size() {
        return this.hashCache.size;
      }
      static _handleException(e) {
        o.a(e);
      }
    }
    var I = M;
    const k = chrome.i18n.getMessage,
      T = /[a-fA-F0-9]{32}/i;
    class L {
      constructor(e, t) {
        (this.guid = e),
          (this.hashCache = new Set()),
          (this.deletedCache = new Set()),
          (this.onChange = t),
          (this._commitDeletedCacheDebounced = Object(p.c)(
            this._commitDeletedCacheFn.bind(this),
            10
          ));
      }
      init() {
        this._loadDeletedCache()
          .then(() => this.getAll())
          .then((e) => this._processAllItems(e))
          .then(() => this._updateDeletedCache())
          .then(() => {
            this._startChangeListener(),
              Object(n.a)(
                'Clipboard',
                'Added',
                this.hashCache.size > 0 ? 'true' : 'false'
              );
          });
      }
      _processAllItems(e) {
        return new Promise((t) => {
          if (e && e.length) {
            const t = [];
            e.forEach((e) => {
              this.hashCache.add(e.hash),
                this.deletedCache.has(e.hash) || t.push(e);
            }),
              this.onChange({ type: 'get_all', data: t });
          }
          t();
        });
      }
      _loadDeletedCache() {
        return new Promise((e) => {
          chrome.storage.local.get('sync_deleted_items', (t) => {
            t &&
              t.sync_deleted_items &&
              t.sync_deleted_items.forEach((e) => {
                this.deletedCache.add(e);
              }),
              e();
          });
        });
      }
      _updateDeletedCache() {
        return new Promise((e) => {
          let t = !1;
          this.deletedCache.forEach((e) => {
            this.hashCache.has(e) || (this.deletedCache.delete(e), (t = !0));
          }),
            t ? this._commitDeletedCacheFn().then(e) : e();
        });
      }
      _commitDeletedCacheFn() {
        return new Promise((e) => {
          const t = Array.from(this.deletedCache);
          chrome.storage.local.set({ sync_deleted_items: t }, () => {
            e();
          });
        });
      }
      processHistoryDelete(e = []) {
        const t = e.filter((e) => this.hashCache.has(e));
        t.forEach((e) => this.deletedCache.add(e)),
          t.length && this._commitDeletedCacheDebounced();
      }
      _startChangeListener() {
        chrome.storage.onChanged.addListener((e, t) => {
          'sync' === t &&
            Object.keys(e).forEach((t) => {
              void 0 !== e[t].newValue &&
                this._handleItemAdded(t, e[t].newValue),
                void 0 !== e[t].oldValue && this._handleItemDeleted(t);
            });
        });
      }
      _handleItemAdded(e, t) {
        if (L.isSyncKey(e) && 'object' == typeof t) {
          if (t.g === this.guid) return void 0;
          if (this.hashCache.has(e))
            return void console.debug(
              '%cSkip already cached sync item',
              'color:dimgrey'
            );
          this.hashCache.add(e),
            this.onChange({ type: 'item_added', data: L.fromSyncFormat(t, e) });
        } else 0;
      }
      _handleItemDeleted(e) {
        this.hashCache.delete(e),
          this.deletedCache.delete(e),
          this._commitDeletedCacheDebounced();
      }
      addItem(e, t) {
        return new Promise((s, i) => {
          if (!t || !t.text || !t.copiedDate)
            return void i('SyncItem object invalid');
          const r = {};
          (r[e] = L.toSyncFormat(t, this.guid)),
            chrome.storage.sync.set(r, () => {
              chrome.runtime.lastError
                ? i(L.handleSyncErrors(chrome.runtime.lastError.message))
                : s();
            });
        });
      }
      getAll(e = '') {
        return new Promise((t) => {
          chrome.storage.sync.get(null, (s) => {
            const i = Object.keys(s).reduce((t, i) => {
              if (L.isSyncKey(i)) {
                const r = L.fromSyncFormat(s[i], i);
                if (e) {
                  const s = e.toLowerCase();
                  r.text.toLowerCase().includes(s) && t.push(r);
                } else t.push(r);
              }
              return t;
            }, []);
            i.sort((e, t) => (e.copiedDate > t.copiedDate ? -1 : 1)), t(i);
          });
        });
      }
      getItem(e) {
        return new Promise((t) => {
          chrome.storage.sync.get(e, (s) => {
            const i = L.fromSyncFormat(s[e], e);
            t({ item: i });
          });
        });
      }
      deleteItems(e) {
        return new Promise((t) => {
          chrome.storage.sync.remove(e, () => {
            e.forEach((e) => this.deletedCache.delete(e)),
              this._commitDeletedCacheDebounced(),
              t();
          });
        });
      }
      deleteAll() {
        return new Promise((e) => {
          chrome.storage.sync.clear(() => {
            this.deletedCache.clear(), this._commitDeletedCacheDebounced(), e();
          });
        });
      }
      getUsedSpace() {
        return new Promise((e) => {
          chrome.storage.sync.getBytesInUse((t) => {
            e({ bytesInUse: t });
          });
        });
      }
      static handleSyncErrors(e) {
        return e.includes('QUOTA_BYTES_PER_ITEM')
          ? {
              title: k('sync_alert_too_big_title'),
              message: k('sync_alert_too_big_message'),
            }
          : e.includes('QUOTA_BYTES') || e.includes('MAX_ITEMS')
          ? {
              title: k('sync_alert_full_title'),
              message: k('sync_alert_full_message'),
            }
          : e.includes('MAX_WRITE_OPERATIONS_PER_HOUR')
          ? {
              title: k('sync_alert_hour_limit_title'),
              message: k('sync_alert_hour_limit_title'),
            }
          : e.includes('MAX_WRITE_OPERATIONS_PER_MINUTE')
          ? {
              title: k('sync_alert_minute_limit_title'),
              message: k('sync_alert_minute_limit_message'),
            }
          : void 0;
      }
      static fromSyncFormat(e, t) {
        const s = e.f || '';
        return {
          text: s,
          shortText: s.slice(0, h.n),
          copiedDate: e.d,
          lastCopiedDate: e.d,
          length: s.length,
          hash: t,
        };
      }
      static toSyncFormat(e, t) {
        return { f: e.text, d: e.copiedDate, g: t };
      }
      static isSyncKey(e) {
        return T.test(e);
      }
    }
    var O = L;
    const D = chrome.i18n.getMessage,
      E = () => {};
    class j {
      constructor({
        getFavoritesItems: e,
        getLatestItems: t,
        runPageWidget: s = E,
        processSelectedText: i = E,
      }) {
        (this.dbProvider = { getFavoritesItems: e, getLatestItems: t }),
          (this.runPageWidget = s),
          (this.processSelectedText = i),
          (this.lastType = null),
          (this.lastSortMethod = null),
          (this.lastSelectedTextAction = !1),
          (this._createLocked = !1),
          (this._updateAfterLock = !1),
          (this.create = Object(p.c)(this.create, 100)),
          (this.update = Object(p.c)(this.update, 100));
      }
      removeAll() {
        return new Promise((e) => {
          chrome.contextMenus.removeAll(e);
        });
      }
      create({
        type: e = this.lastType,
        sortMethod: t = this.lastSortMethod,
        createWidgetMenu: s = this.lastShouldCreateWidgetMenu,
        selectedTextAction: i = this.lastSelectedTextAction,
      }) {
        this._createLocked
          ? (this._updateAfterLock = !0)
          : ((this._createLocked = !0),
            this.removeAll()
              .then(() => this._createPageMenu(e, t))
              .then(() => this._createSelectionMenu(i))
              .then(() => this._tryCreatePageWidgetMenu(s))
              .then(() => {
                (this._createLocked = !1),
                  this._updateAfterLock &&
                    ((this._updateAfterLock = !1), this.update());
              })
              .catch((e) => {
                (this._createLocked = !1), (this._updateAfterLock = !1);
              }));
      }
      update() {
        this.lastType &&
          'string' == typeof this.lastType &&
          this.create(this.lastType);
      }
      _createPageMenu(e, t) {
        switch (((this.lastType = e), (this.lastSortMethod = t), e)) {
          case 'smart':
            return Promise.all([
              this.dbProvider.getFavoritesItems(t),
              this.dbProvider.getLatestItems(t, 7),
            ]).then(this._createSmartMenu.bind(this));
          case 'favorites':
            return this.dbProvider
              .getFavoritesItems(t)
              .then(this._createSimpleMenu.bind(this));
          case 'recent':
            return this.dbProvider
              .getLatestItems(t, 7)
              .then(this._createSimpleMenu.bind(this));
          case 'both':
            return Promise.all([
              this.dbProvider.getFavoritesItems(t),
              this.dbProvider.getLatestItems(t, 7),
            ]).then(this._createFullMenu.bind(this));
        }
        return Promise.resolve();
      }
      _createSelectionMenu(e) {
        if (((this.lastSelectedTextAction = e), !e || 'none' === e))
          return Promise.resolve();
        let t;
        switch (e) {
          case 'save':
            t = D('context_save_selected');
            break;
          case 'send':
            t = D('context_send_selected');
            break;
          case 'fav':
            t = D('context_fav_selected');
        }
        return new Promise((e) => {
          chrome.contextMenus.create(
            {
              type: 'normal',
              contexts: ['selection'],
              title: t,
              onclick: (e) => {
                e.selectionText &&
                  (this.processSelectedText(e.selectionText, e.pageUrl),
                  Object(n.a)('Context', 'SendSelected'));
              },
            },
            e
          );
        });
      }
      _tryCreatePageWidgetMenu(e) {
        const t = 'Run Clipboard Widget';
        if (((this.lastShouldCreateWidgetMenu = e), !e))
          return Promise.resolve();
        const s = new Promise((e) => {
            chrome.contextMenus.create(
              {
                title: t,
                contexts: ['page', 'frame', 'image'],
                onclick: () => {
                  this.runPageWidget(),
                    Object(n.a)('Context', 'PageWidget', 'contextMenu');
                },
              },
              e
            );
          }),
          i = new Promise((e) => {
            chrome.contextMenus.create(
              {
                title: t,
                contexts: ['browser_action'],
                onclick: () => {
                  this.runPageWidget(),
                    Object(n.a)('Context', 'PageWidget', 'browserAction');
                },
              },
              e
            );
          });
        return Promise.all([s, i]);
      }
      _createSimpleMenu(e) {
        if (e.length) {
          let t = this._createMainMenu();
          return this._insertMenuItems(t, e);
        }
      }
      _createSmartMenu(e, t) {
        let s = e[0] || [],
          i = e[1] || [];
        if (s.length || i.length) {
          let e = this._createMainMenu();
          if (t || s.length) {
            let t = this._createSubMenu(D('context_menu_recent'), e),
              r = this._createSubMenu(D('context_menu_favorites'), e);
            return Promise.resolve([
              this._insertMenuItems(t, i),
              this._insertMenuItems(r, s),
            ]);
          }
          return this._insertMenuItems(e, i);
        }
      }
      _createFullMenu(e) {
        return this._createSmartMenu(e, !0);
      }
      _createMainMenu() {
        return chrome.contextMenus.create({
          type: 'normal',
          contexts: ['editable'],
          title: D('context_menu_title'),
        });
      }
      _createSubMenu(e, t) {
        return chrome.contextMenus.create({
          parentId: t,
          type: 'normal',
          contexts: ['editable'],
          title: e,
        });
      }
      _insertMenuItems(e, t) {
        return new Promise((s) => {
          t.length
            ? t.forEach((t) => {
                let i = '';
                (i =
                  t.text.length < 50
                    ? j._simplifyText(t.text)
                    : j._trimText(t.text) + '...'),
                  i &&
                    chrome.contextMenus.create(
                      {
                        type: 'normal',
                        contexts: ['editable'],
                        title: i,
                        parentId: e,
                        onclick: (e, s) => {
                          this._runPaste(t, s);
                        },
                      },
                      s
                    );
              })
            : chrome.contextMenus.create(
                {
                  type: 'normal',
                  contexts: ['editable'],
                  title: D('context_menu_empty'),
                  parentId: e,
                  enabled: !1,
                },
                s
              );
        });
      }
      _runPaste(e, t) {
        t &&
          -1 !== t.id &&
          this._performPaste(t.id, e.text)
            .then(() => {})
            .catch(() =>
              this._attemptToInjectCS(t.id).then(() =>
                this._performPaste(t.id, e.text)
              )
            )
            .catch((e) => {
              e && o.a(e);
            });
      }
      _performPaste(e, t) {
        return new Promise((s, i) => {
          chrome.tabs.sendMessage(
            e,
            { action: 'context_menu_paste', text: t },
            (e) => {
              chrome.runtime.lastError || !e ? i() : e.paste ? s() : i();
            }
          );
        });
      }
      _attemptToInjectCS(e) {
        return new Promise((t, s) => {
          chrome.tabs.executeScript(
            e,
            {
              file: '/contentScript.bundle.js',
              runAt: 'document_idle',
            },
            function () {
              chrome.runtime.lastError ? s() : t();
            }
          );
        });
      }
      static _trimText(e) {
        return j._simplifyText(e).substring(0, 50);
      }
      static _simplifyText(e) {
        return e
          .trim()
          .replace(/^\s+|\s+$/g, '')
          .replace(/\s+/g, ' ');
      }
    }
    var H = j,
      F = s(30);
    var W = function (e) {
      return new Promise((t) => {
        chrome.windows.getLastFocused((s) => {
          chrome.runtime.lastError && t(null),
            s && s.focused
              ? chrome.tabs.query({ active: !0, windowId: s.id }, (s) => {
                  s && s.length && s[0].url
                    ? t({ url: s[0].url, hash: e })
                    : t(null);
                })
              : t(null);
        });
      });
    };
    let U = null;
    chrome.runtime.onInstalled.addListener(
      ({ reason: e, previousVersion: t }) => {
        U = { reason: e, previousVersion: t };
      }
    );
    var R = class extends _ {
      constructor() {
        super('promos', {
          optimize: ['boolean', !0],
          updateModal: ['boolean', !1],
          updateNotification: ['boolean', !1],
          subsModal: ['number', -1],
          redDot: ['boolean', !0],
          welcome: ['boolean', !1],
        }),
          (this._currentVersion = ''),
          (this._previousVersion = ''),
          (this._hasSubs = null),
          (this._isInited = !1);
      }
      init(e) {
        super.init().then(() => {
          (this._hasSubs = e),
            (this._currentVersion = chrome.runtime.getManifest().version),
            this._processLastEvent(),
            (this._isInited = !0);
        });
      }
      _processLastEvent() {
        if (U && U.reason) {
          const { reason: e, previousVersion: t } = U;
          'update' === e
            ? ((this._previousVersion = t), this._handleUpdate())
            : 'install' === e && this._handleInstall(),
            (U = null);
        }
      }
      _isPrevVer(e) {
        if (e && this._previousVersion)
          return this._previousVersion.startsWith(e);
      }
      _isCurVer(e) {
        if (e && this._currentVersion)
          return this._currentVersion.startsWith(e);
      }
      _handleUpdate() {
        this._previousVersion !== this._currentVersion &&
          this._isCurVer('1.1.1') &&
          this._isPrevVer('1.1.0') &&
          (this._hasSubs
            ? this.set({ updateNotification: !0 })
            : this.set({ subsModal: 3 }));
      }
      _handleInstall() {
        this.set({ welcome: !0, subsModal: 10 });
      }
      _isInit() {
        return this._isInited;
      }
      processShow(e) {
        const t = {};
        return (
          this.storage.optimize && e >= h.f
            ? (t.optimize = !0)
            : this.storage.subsModal > -1 &&
              (this.set({ subsModal: this.storage.subsModal - 1 }),
              this.storage.subsModal < 1 && (t.subsModal = !0)),
          this.storage.redDot && (t.redDot = !0),
          this.storage.updateModal && (t.updateModal = !0),
          this.storage.welcome && (t.welcome = !0),
          this.storage.updateNotification && (t.updateNotification = !0),
          t
        );
      }
      completePromo(e) {
        'subsModal' === e ? this.set({ subsModal: -1 }) : this.set({ [e]: !1 });
      }
    };
    s(196);
    var B = class extends _ {
      constructor(e) {
        super('subsData', {
          subsData: ['object', null],
          lastActiveDate: ['number', -1],
          shouldUpdate: ['boolean', !1],
        }),
          (this._updateCallback = e);
      }
      init() {
        return (
          chrome.alarms.create('subsUpdateAlarm', { periodInMinutes: 300 }),
          chrome.alarms.onAlarm.addListener((e) => {
            e && 'subsUpdateAlarm' === e.name && this.updateState();
          }),
          setTimeout(() => {
            this.updateState();
          }, 700),
          super.init()
        );
      }
      _getSkuDetails() {
        return new Promise((e) => {
          google.payments.inapp.getSkuDetails({
            parameters: { env: 'prod' },
            success: (t) => {
              try {
                const s = t.response.details.inAppProducts;
                e(s);
              } catch (t) {
                0, e(null);
              }
            },
            failure: (t) => {
              e(null);
            },
          });
        });
      }
      _getPurchases() {
        // return new Promise((e) => {
        //   google.payments.inapp.getPurchases({
        //     parameters: { env: 'prod' },
        //     success: (t) => {
        //       try {
        //         const s = t.response.details;
        //         e(s);
        //       } catch (t) {
        //         0, e(null);
        //       }
        //     },
        //     failure: (t) => {
        //       e(null);
        //     },
        //   });
        // });
      }
      _requestState() {
        return this._getPurchases()
          .then((e) => {
            if (e && e.length) {
              const t = e.find((e) => h.q.includes(e.sku));
              if (t && t.state && 'active' === t.state.toLowerCase())
                return { subsState: 'active', info: t };
            }
            return null;
          })
          .then(
            (e) =>
              e ||
              this._getSkuDetails().then((e) => {
                if (e && e.length) {
                  const t = e.find((e) => e.sku === h.o);
                  if (t) return { subsState: 'available', info: t };
                }
                return null;
              })
          );
      }
      updateState() {
        return this._requestState()
          .then((e) => {
            let t = { subsData: e || { subsState: 'unknown' } };
            if (null === e) {
              const e = this.get('subsData');
              if (e && 'active' === e.subsState) {
                e.offline = !0;
                const s = this.get('lastActiveDate');
                if (s && -1 !== s) {
                  Date.now() - s < 1728e5 || (e.subsState = 'unknown');
                } else e.subsState = 'unknown';
                t.subsData = e;
              }
            } else
              e && 'active' === e.subsState && (t.lastActiveDate = Date.now());
            return this.set(t), t;
          })
          .catch((e) => (o.a(e), { subsData: { subsState: 'unknown' } }));
      }
      activate(e) {
        return new Promise((t) => {
          google.payments.inapp.buy({
            parameters: { env: 'prod' },
            sku: e,
            success: () => {
              t(!0);
            },
            failure: (e) => {
              e &&
                e.response &&
                'PURCHASE_CANCELED' === e.response.errorType &&
                Object(n.a)('Subscription', 'CancelPayment'),
                t(!1);
            },
          });
        });
      }
      emitUpdate() {
        'function' == typeof this._updateCallback && this._updateCallback();
      }
      getState() {
        return this.updateState().then((e) => ({
          ...e,
          hasSubs: this.hasSubs(),
        }));
      }
      hasSubs() {
        return (
          this.storage &&
          this.storage.subsData &&
          'active' === this.storage.subsData.subsState
        );
      }
    };
    var V = class {
        constructor() {
          (this._tabsWithWidget = new Set()), (this._inited = !1);
        }
        init() {
          this._startCleanupHandlers(), (this._inited = !0);
        }
        isInit() {
          return this._inited;
        }
        _startCleanupHandlers() {
          chrome.tabs.onRemoved.addListener((e) => {
            this._tabsWithWidget.delete(e);
          }),
            chrome.tabs.onUpdated.addListener((e, t) => {
              'loading' === t.status && this._tabsWithWidget.delete(e);
            });
        }
        runOnCurrentTab() {
          return new Promise((e) => {
            chrome.tabs.query({ active: !0, currentWindow: !0 }, (t) => {
              if (!t || !t.length) return void e();
              const s = t[0].id;
              s === chrome.tabs.TAB_ID_NONE || t[0].url.includes('chrome://')
                ? e()
                : e(this.run(s));
            });
          });
        }
        run(e) {
          return new Promise((t) => {
            this._tabsWithWidget.has(e)
              ? t(this.show(e))
              : chrome.tabs.executeScript(
                  e,
                  { file: 'page-widget/page-widget.js' },
                  () => {
                    t(),
                      chrome.runtime.lastError
                        ? console.warn(chrome.runtime.lastError.message)
                        : (this._tabsWithWidget.add(e),
                          Object(n.e)('PageWidget'));
                  }
                );
          });
        }
        show(e) {
          return new Promise((t) => {
            chrome.tabs.sendMessage(e, { action: 'showPageWidget' }, () => {
              chrome.runtime.lastError &&
                console.warn(chrome.runtime.lastError.message),
                t();
            });
          });
        }
        updateAll() {
          this._tabsWithWidget.forEach((e) => {
            chrome.tabs.sendMessage(e, { action: 'updatePageWidget' }, () => {
              chrome.runtime.lastError &&
                console.warn(chrome.runtime.lastError.message);
            });
          });
        }
        updateActiveHash(e) {
          this._tabsWithWidget.forEach((t) => {
            chrome.tabs.sendMessage(
              t,
              { action: 'updateActiveHash', activeHash: e },
              () => {
                chrome.runtime.lastError &&
                  console.warn(chrome.runtime.lastError.message);
              }
            );
          });
        }
      },
      N = s(115);
    class z {
      constructor() {
        this._screenshots = [];
      }
      init() {
        chrome.runtime.onMessage.addListener((e, t, s) => {
          if ('_makeCapture' === e.action) return this._capture(e, s), !0;
        });
      }
      _initScrolling(e, t) {
        chrome.tabs.sendMessage(e.id, { msg: 'scrollPage' }, function () {
          t();
        });
      }
      _makeCapture() {
        return new Promise((e) => {
          chrome.tabs.captureVisibleTab(
            null,
            { format: 'png', quality: 100 },
            (t) => {
              e(t);
            }
          );
        });
      }
      async _capture(e, t) {
        const s = await this._makeCapture();
        if (s) {
          let i = new Image();
          (i.onload = () => {
            if (
              ((e.image = { width: i.width, height: i.height }),
              e.windowWidth !== i.width)
            ) {
              let t = i.width / e.windowWidth;
              (e.x *= t), (e.y *= t), (e.totalWidth *= t), (e.totalHeight *= t);
            }
            this._screenshots.length ||
              Array.prototype.push.apply(
                this._screenshots,
                this._initScreenshots(e.totalWidth, e.totalHeight)
              ),
              this._filterScreenshots(
                e.x,
                e.y,
                i.width,
                i.height,
                this._screenshots
              ).forEach(function (t) {
                t.ctx.drawImage(i, e.x - t.left, e.y - t.top);
              }),
              t(!0);
          }),
            (i.src = s);
        }
      }
      _initScreenshots(e, t) {
        let s,
          i,
          r,
          a,
          n,
          o = t > 3e4 || e > 3e4 || t * e > 24e7,
          h = e > t,
          c = o ? (h ? 3e4 : 8e3) : e,
          d = o ? (h ? 8e3 : 3e4) : t,
          l = Math.ceil(e / c),
          u = Math.ceil(t / d),
          m = 0,
          g = [];
        for (s = 0; s < u; s++)
          for (i = 0; i < l; i++)
            (r = document.createElement('canvas')),
              (r.width = (i === l - 1 && e % c) || c),
              (r.height = (s === u - 1 && t % d) || d),
              (a = i * c),
              (n = s * d),
              g.push({
                canvas: r,
                ctx: r.getContext('2d'),
                index: m,
                left: a,
                right: a + r.width,
                top: n,
                bottom: n + r.height,
              }),
              m++;
        return g;
      }
      _filterScreenshots(e, t, s, i, r) {
        let a = e + s,
          n = t + i;
        return r.filter(function (s) {
          return e < s.right && a > s.left && t < s.bottom && n > s.top;
        });
      }
      static _dataURItoBlob(e) {
        let t = atob(e.split(',')[1]),
          s = e.split(',')[0].split(':')[1].split(';')[0],
          i = new ArrayBuffer(t.length),
          r = new Uint8Array(i);
        for (let e = 0; e < t.length; e++) r[e] = t.charCodeAt(e);
        return new Blob([i], { type: s });
      }
      _getBlobs(e) {
        return e.map((e) => {
          let t = e.canvas.toDataURL();
          return z._dataURItoBlob(t);
        });
      }
      _captureToBlobs(e) {
        return new Promise((t, s) => {
          let i = !1,
            r = !1;
          const a = () => {
            this._initScrolling(e, () => {
              t(this._getBlobs(this._screenshots));
            });
          };
          this._screenshots = [];
          const n = e.id;
          chrome.tabs.sendMessage(n, { action: 'ping' }, (e) => {
            chrome.runtime.lastError || !e || 'pong' !== e.action
              ? chrome.tabs.executeScript(
                  n,
                  { file: 'content-script/capture-page.js' },
                  () => {
                    chrome.runtime.lastError
                      ? s(chrome.runtime.lastError.message)
                      : r
                      ? s('Timed out too early while waiting for executeScript')
                      : ((i = !0), a());
                  }
                )
              : a();
          }),
            window.setTimeout(function () {
              i || ((r = !0), s('Execute timeout for capture'));
            }, 3e3);
        });
      }
      static getDateFileName() {
        return u()().format('DD-MMM-YYYY_HH-mm-ss');
      }
      captureFullActiveTab() {
        return new Promise((e, t) => {
          chrome.tabs.query({ active: !0, currentWindow: !0 }, async (s) => {
            try {
              (await this._captureToBlobs(s[0])).forEach((e) => {
                Object(N.saveAs)(e, `page_full_${z.getDateFileName()}.png`);
              }),
                e();
            } catch (e) {
              t(e);
            }
          });
        });
      }
      async captureActiveTab() {
        const e = await this._makeCapture();
        Object(N.saveAs)(
          z._dataURItoBlob(e),
          `page_${z.getDateFileName()}.png`
        );
      }
    }
    var q = z;
    let K = null;
    async function $(e) {
      if (!e.hasSubs()) return Promise.reject('no_subs');
      if (K) {
        return (
          !!(await new Promise((e) => {
            chrome.windows.get(K, (t) => {
              (!chrome.runtime.lastError && t) || e(!1),
                chrome.windows.update(K, { focused: !0 }, () => {
                  chrome.runtime.lastError ? e(!1) : e(!0);
                });
            });
          })) || Y()
        );
      }
      return Y();
    }
    function Y() {
      return new Promise((e) => {
        chrome.windows.create(
          {
            url: 'popup.html',
            width: 630,
            height: 500,
            type: 'popup',
            focused: !0,
          },
          (t) => {
            e(), t && t.tabs && t.tabs.length && (K = t.id);
          }
        );
      });
    }
    var G = s(37),
      Q = s(25);
    s(197), s(199);
    const X = {
      apiKey: 'sdfsdf',
      databaseURL: 'https://someone.firebaseio.com',
      storageBucket: '.appspot.com',
    };
    var J = class {
      constructor() {
        (this._userData = null),
          (this._userId = null),
          (this._itemsRefStr = null),
          (this._sortMethod = null),
          (this._instanceInited = !1),
          (this._changesListenerInit = !1);
      }
      init(e = 'lastCopiedDate') {
        this._isInit() ||
          ((this._sortMethod = e),
          Q.initializeApp(X),
          (this.db = Q.database()),
          this._startAuthHandler(),
          (this._instanceInited = !0));
      }
      _isInit() {
        return this._instanceInited;
      }
      hasAuth() {
        return Boolean(this._userData && this._userId);
      }
      addItems(e) {
        if (!e || !e.length) return void 0;
        if (!this._itemsRefStr) return void 0;
        e = (e = e.filter((e) => e.text && e.hash)).map(
          (e) => (
            (e.sourceDevice = 'extension_chrome'),
            (e.copiedDate = Date.now()),
            (e.lastCopiedDate = Date.now()),
            e
          )
        );
        const t = Q.database().ref(this._itemsRefStr),
          s = e.map((e) => t.child(e.hash).set(e));
        return Promise.all(s);
      }
      getAll(e = 0, t) {
        if (!this._itemsRefStr) return Promise.resolve([]);
        return Q.database()
          .ref(this._itemsRefStr)
          .orderByChild(this._sortMethod)
          .once('value')
          .then((s) => {
            let i = [];
            s.forEach((e) => {
              i.push(e.val());
            }),
              (i = i
                .reverse()
                .filter((e) => e.text && e.hash)
                .map(({ text: e, hash: t, ...s }) =>
                  P({ text: e, hash: t }, s)
                )),
              t && (i = C(i, t));
            const r = i.length;
            return (i = i.slice(e * h.g, (e + 1) * h.g)), [i, r];
          });
      }
      getItem(e) {
        if (!e) return Promise.reject('No hash');
        if (!this._itemsRefStr) return Promise.reject('No user auth');
        return Q.database()
          .ref(this._itemsRefStr + '/' + e)
          .once('value')
          .then((e) => {
            const t = e.val();
            return t.hash && t.text
              ? { item: P({ text: t.text, hash: t.hash }, { ...t }) }
              : Promise.reject('Bad item');
          });
      }
      deleteItems(e) {
        if (!this._itemsRefStr) return Promise.reject('No user auth');
        const t = e.reduce((e, t) => ((e[t] = null), e), {});
        return Q.database()
          .ref(this._itemsRefStr)
          .update({ ...t });
      }
      deleteAll() {
        if (!this._itemsRefStr) return Promise.reject('No user auth');
        return Q.database().ref(this._itemsRefStr).set(null);
      }
      makeAuth(e) {
        return new Promise((t, s) => {
          chrome.identity.getAuthToken({ interactive: !!e }, (e) => {
            if (chrome.runtime.lastError) s(chrome.runtime.lastError.message);
            else {
              if (e) {
                const i = Q.auth.GoogleAuthProvider.credential(null, e);
                return Q.auth()
                  .signInWithCredential(i)
                  .then(t)
                  .catch((i) => {
                    i && 'auth/invalid-credential' === i.code
                      ? (chrome.identity.removeCachedAuthToken({ token: e }),
                        t())
                      : (o.a(i), s(i));
                  });
              }
              o.a(new Error('The OAuth Token was null')),
                s('The OAuth Token was null');
            }
          });
        });
      }
      getAuthInfo() {
        return { authInfo: this._userData };
      }
      signOut() {
        return Q.auth()
          .signOut()
          .then(() => {
            (this._userData = null),
              (this._userId = null),
              (this._itemsRefStr = null);
          });
      }
      _startAuthHandler() {
        Q.auth().onAuthStateChanged((e) => {
          e &&
            ((this._userData = e),
            (this._userId = e.uid),
            (this._itemsRefStr = `users/${this._userId}/items`),
            Object(G.a)('updateFbAuthStatus', {
              hasCloudProAuth: this.hasAuth(),
            }),
            this._startChangesListener());
        });
      }
      _startChangesListener() {
        this._changesListenerInit ||
          (Q.database()
            .ref(this._itemsRefStr)
            .on('child_added', () => {
              Object(G.a)('reloadData');
            }),
          Q.database()
            .ref(this._itemsRefStr)
            .on('child_removed', () => {
              Object(G.a)('reloadData');
            }),
          (this._changesListenerInit = !0));
      }
    };
    var Z = class {
      constructor() {
        (this._permissions = {}),
          (this._optionalPermissions = ['tabs', 'notifications']);
      }
      async init() {
        await this._updatePermissions();
      }
      async _updatePermissions() {
        this._permissions = await this._checkPermission(
          this._optionalPermissions
        );
      }
      _checkPermission(e) {
        return new Promise((t) => {
          chrome.permissions.getAll(({ permissions: s = [] }) => {
            const i = e.reduce((e, t) => ((e[t] = s.includes(t)), e), {});
            t(i);
          });
        });
      }
      _requestPermission(e) {
        return new Promise((t) => {
          chrome.permissions.request({ permissions: e }, t);
        });
      }
      _removePermission(e) {
        return new Promise((t) => {
          chrome.permissions.remove({ permissions: e }, t);
        });
      }
      async requestPermission(e) {
        const t = await this._requestPermission([e]);
        return (
          (this._permissions[e] = t),
          Object(n.a)('Permissions', 'Enable', e),
          { [e]: t }
        );
      }
      async removedPermission(e) {
        const t = await this._removePermission([e]);
        return (
          (this._permissions[e] = !t),
          Object(n.a)('Permissions', 'Disable', e),
          { [e]: t }
        );
      }
      getAll() {
        return this._permissions;
      }
    };
    try {
      Object(n.e)('Background');
    } catch (e) {
      0;
    }
    var ee = class {
      constructor() {
        (this.settings = new y()),
          (this.db = new I(this.onDbChange.bind(this))),
          (this.clipMon = new S(this.onTextChange.bind(this))),
          (this.subs = new B(this.handleSubsUpdate.bind(this))),
          // (this.widgetManager = new V()),
          // (this.fb = new J()),
          // (this.promos = new R()),
          // (this.capture = new q()),
          (this.perm = new Z()),
          (this.contextMenu = new H({
            getFavoritesItems: this.db.getFavorites.bind(this.db),
            getLatestItems: this.db.getLatestItems.bind(this.db),
            runPageWidget: this.runPageWidgetCurrentTab.bind(this),
            processSelectedText: this.processSelectedTextAction.bind(this),
          })),
          (this.currentActiveHash = null),
          (this.lastUpdatedHash = null),
          (this.sync = null),
          (this.firstTimeTextChange = !0);
      }
      start() {
        Object(F.b)(),
          this.settings
            .init()
            .then(() => this.db.init())
            .then(async () => {
              await this.subs.init(), await this.perm.init();
            })
            .then(() => {
              this.onAppStateChanged(), this.startMessageHandler();
            })
            .then(() => {
              this.controlLimit(),
                this.startOutdatedChecker(),
                this.createContextMenu(),
                this.startSyncService(),
                this.startCommandListener(),
                this.initWidgetManager(),
                this.handleLockStart(),
                this.capture.init();
            })
            .then(() => {
              Object(n.d)('Background', 'Init', Math.round(performance.now())),
                // chrome.runtime.setUninstallURL(h.t),
                Object(n.a)(
                  'Stat',
                  'CloudHidden',
                  this.settings.get('cloudHidden')
                );
            })
            .catch((e) => {
              o.a(e);
            });
      }
      onTextChange({ isText: e, value: t }) {
        if (
          (this.firstTimeTextChange &&
            setTimeout(() => {
              this.firstTimeTextChange = !1;
            }, 0),
          !e || !t)
        )
          return void this.resetActive();
        if (
          this.settings.get('isCharsLimited') &&
          t.length > this.settings.get('charsLimit')
        )
          return void this.resetActive();
        const s = a.a.hash(t);
        if (this.db.isNew(s))
          this.db
            .add({ hash: s, text: t })
            .then(() => this.setActive(s))
            .then(() => this.autoSendToCloudPro(t, s))
            .catch((e) => {
              o.a(e), this.resetActive();
            });
        else {
          if (this.firstTimeTextChange) return void this.setActive(s);
          this.lastUpdatedHash !== s &&
            this.setActive(s)
              .then(() => this.db.updateCopyDate(s))
              .then(() => (this.lastUpdatedHash = s))
              .catch((e) => {
                o.a(e), this.resetActive();
              });
        }
      }
      onDbChange(e) {
        const { type: t, hash: s } = e;
        this.settings.get('showBadgeCount') && Object(F.b)(this.db.size),
          'cache_filled' !== t && this.contextMenu.update(),
          'added' === t &&
            (this.controlLimit(),
            this.detectSourceUrl(s),
            Object(G.a)('reloadData')),
          'updated_copy_date' !== t
            ? this.widgetManager.updateAll()
            : (this.widgetManager.updateActiveHash(this.currentActiveHash),
              Object(G.a)('updateActiveHash', {
                hash: this.currentActiveHash,
              }));
      }
      onAppStateChanged() {
        const e = this.settings.get('appState');
        e ? this.clipMon.start() : this.clipMon.stop(), Object(F.a)(e);
      }
      detectSourceUrl(e) {
        e &&
          W(e).then((e) => {
            null !== e &&
              e.hash &&
              e.url &&
              this.db.setSourceUrl(e.hash, e.url);
          });
      }
      setActive(e) {
        return (this.currentActiveHash = e), Promise.resolve();
      }
      resetActive() {
        return (this.currentActiveHash = null), Promise.resolve();
      }
      autoSendToCloudPro(e, t) {
        return this.settings.get('autoSyncCloudPro') && this.subs.hasSubs()
          ? this.fb.addItems([{ text: e, hash: t }])
          : Promise.resolve();
      }
      _getSelectedTextRealAction() {
        let e = this.settings.get('selectedTextAction');
        return 'auto' === e && (e = this.subs.hasSubs() ? 'send' : 'save'), e;
      }
      processSelectedTextAction(e, t = null) {
        const s = a.a.hash(e),
          i = { hash: s, text: e };
        t && (i.sourceUrl = t);
        const r = this._getSelectedTextRealAction();
        if ('send' === r)
          this.fb.addItems([i]).catch((e) => {
            o.a(e);
          });
        else if ('save' === r || 'fav' === r) {
          if (!this.db.isNew(s)) return;
          this.db.add(i, { isFavorite: Boolean('fav' === r) }).catch((e) => {
            o.a(e);
          });
        }
      }
      controlLimit() {
        this.settings.get('isItemsLimited') &&
          this.db.limitItemsCount(
            this.settings.get('sortMethod'),
            this.settings.get('itemsLimit'),
            this.currentActiveHash
          );
      }
      createContextMenu() {
        const e = this.subs.hasSubs() && this.settings.get('pageWidgetContext');
        this.contextMenu.create({
          type: this.settings.get('contextMenuMode'),
          sortMethod: this.settings.get('sortMethod'),
          createWidgetMenu: e,
          selectedTextAction: this._getSelectedTextRealAction(),
        });
      }
      importItems(e) {
        let t = Promise.resolve(!1);
        const s = { isItemsLimited: !1, isTimeLimited: !1 },
          i = Object.keys(s);
        i.some((e) => this.settings.get(e)) && (t = this.settings.set(s));
        const r = this.db.importItems(e);
        return Promise.all([t, r]).then(([e]) => ({
          settingsDisabled: e ? i : [],
        }));
      }
      startOutdatedChecker() {
        this.settings.get('isTimeLimited') &&
          (this.checkOutdated(), setInterval(() => this.checkOutdated(), 6e4));
      }
      startSyncService() {
        (this.sync = new O(this.settings.get('guid'), (e) => {
          e.type;
          let t = e.data;
          switch (((t = Array.isArray(t) ? t : [t]), e.type)) {
            case 'get_all':
            case 'item_added':
              this.db.addSynced(e.data);
          }
        })),
          setTimeout(() => {
            this.sync.init();
          }, 1e3);
      }
      checkOutdated() {
        if (!1 === this.settings.get('isTimeLimited')) return;
        const e = this.settings.get('timeCount'),
          t = this.settings.get('timePeriod'),
          s = b().subtract(e, t).valueOf();
        this.db.deleteOutdated(
          this.settings.get('sortMethod'),
          s,
          this.currentActiveHash
        );
      }
      handleSubsUpdate() {
        this.createContextMenu(),
          this.initWidgetManager(),
          this.initFb(),
          this.subs.hasSubs() && Object(n.a)('Stat', 'ActiveSubs', 'true'),
          this.promos._isInit() || this.promos.init(this.subs.hasSubs());
      }
      activateSubs() {
        return this.subs.activate(h.o).then((e) => {
          e &&
            setTimeout(() => {
              chrome.tabs.create({ url: h.p }), Object(d.a)();
            }, 500);
        });
      }
      startCommandListener() {
        chrome.commands.onCommand.addListener((e) => {
          try {
            'runPageWidget' === e && this.runPageWidgetCurrentTab(),
              'lockNow' === e && Object(v.c)(this.subs, this.settings),
              'floatingMode' === e &&
                $(this.subs).catch((e) => {
                  console.error(e);
                }),
              Object(n.c)('Command', e, this.subs.hasSubs());
          } catch (e) {
            console.error(e);
          }
        });
      }
      initWidgetManager() {
        this.subs.hasSubs() &&
          !this.widgetManager.isInit() &&
          this.widgetManager.init();
      }
      initFb() {
        this.subs.hasSubs() && this.fb.init(this.settings.get('sortMethod'));
      }
      runPageWidgetCurrentTab() {
        return this.subs.hasSubs()
          ? this.widgetManager.runOnCurrentTab()
          : Promise.resolve();
      }
      handleLockStart() {
        this.settings.get('lockEnabled') &&
          (this.settings.set({ lockSet: !0 }),
          this.subs.hasSubs() && Object(F.c)(!0, this.settings));
      }
      startMessageHandler() {
        chrome.runtime.onMessage.addListener(this.handleApiCall.bind(this));
      }
      getLockStatus() {
        return (
          this.subs.hasSubs() &&
          this.settings.get('lockSet') &&
          this.settings.get('lockEnabled')
        );
      }
      collectDebugInfo() {
        return (function ({ subs: e, sync: t, settings: s, db: i }) {
          return Promise.all([
            chrome.runtime.getManifest().version,
            window.navigator.userAgent,
            s.getAll(),
            e._getPurchases(),
            e._getSkuDetails(),
            i.size,
            t.getUsedSpace(),
          ])
            .then(([e, t, s, i, r, a, n]) => ({
              debugInfo: {
                appVersion: e,
                userAgent: t,
                settings: s,
                getPurchases: i,
                getSkuDetails: r,
                dbSize: a,
                syncUsedSpace: n,
              },
            }))
            .catch((e) => Promise.resolve({ debugInfo: 'error: ' + e }));
        })({
          subs: this.subs,
          sync: this.sync,
          settings: this.settings,
          db: this.db,
        });
      }
      handleApiCall(e, t, s) {
        if (!e || !e.action || 'string' != typeof e.action) return void 0;
        if (e.action.startsWith('_')) return;
        let i;
        switch (e.action) {
          case 'getAll':
            i = this.db
              .getAll()
              .then((e) => ({ ...e, activeHash: this.currentActiveHash }));
            break;
          case 'getItem':
            i = Object(c.d)(e.viewMode)
              ? this.sync.getItem(e.hash)
              : Object(c.c)(e.viewMode)
              ? this.fb.getItem(e.hash)
              : this.db.getItemByHash(e.hash);
            break;
          case 'getItemsByHash':
            i = this.db.getItemsByHash(
              this.settings.get('sortMethod'),
              e.hashArr
            );
            break;
          case 'getItems':
            i =
              e.type === c.a.CLOUD
                ? this.sync.getAll(e.search).then((e) => ({
                    items: e,
                    activeHash: this.currentActiveHash,
                    totalCount: e.length,
                  }))
                : e.type === c.a.CLOUD_PRO
                ? this.subs.hasSubs()
                  ? this.fb.getAll(e.page, e.search).then(([e, t]) => ({
                      items: e,
                      activeHash: this.currentActiveHash,
                      totalCount: t,
                    }))
                  : {}
                : this.db
                    .getItems(
                      this.settings.get('sortMethod'),
                      e.page,
                      e.type,
                      e.search
                    )
                    .then(([e, t]) => ({
                      items: e,
                      activeHash: this.currentActiveHash,
                      totalCount: t,
                    }));
            break;
          case 'getActiveHash':
            i = { activeHash: this.currentActiveHash };
            break;
          case 'setFavorite':
            i = this.db.setFavorite(e.hashArr, e.state);
            break;
          case 'setTags':
            i = this.db.setTags(e.hash, e.tags);
            break;
          case 'getAllTags':
            i = this.db.getAllTags();
            break;
          case 'addMerged':
            i = this.db.addMerged(e.hashArr, e.delimiterName);
            break;
          case 'deleteItems':
            Object(c.d)(e.viewMode)
              ? (i = this.sync.deleteItems(e.hashArr))
              : Object(c.c)(e.viewMode)
              ? (i = this.fb.deleteItems(e.hashArr))
              : ((i = this.db.deleteItems(e.hashArr)),
                this.sync.processHistoryDelete(e.hashArr));
            break;
          case 'deleteAll':
            i = Object(c.d)(e.viewMode)
              ? this.sync.deleteAll()
              : Object(c.c)(e.viewMode)
              ? this.fb.deleteAll()
              : this.db.deleteAll(this.currentActiveHash);
            break;
          case 'getSettings':
            i = { settings: this.settings.getAll() };
            break;
          case 'initData':
            i = {
              settings: this.settings.getAll(),
              subsData: this.subs.get('subsData'),
              hasSubs: this.subs.hasSubs(),
              locked: this.getLockStatus(),
              hasCloudProAuth: this.fb.hasAuth(),
              promos: this.promos.processShow(this.db.size),
              permissions: this.perm.getAll(),
            };
            break;
          case 'setSettings':
            (i = this.settings.set(e.settings)),
              void 0 !== e.settings.appState && this.onAppStateChanged();
            break;
          case 'resetSettings':
            i = this.settings.resetAll();
            break;
          case 'importItems':
            i = this.importItems(e.items);
            break;
          case 'setActive':
            i = Object(c.d)(e.viewMode)
              ? this.sync
                  .getItem(e.hash)
                  .then(({ item: e }) => this.db.addSynced(e))
                  .then(() => this.setActive(e.hash))
                  .then(() => (this.lastUpdatedHash = e.hash))
                  .then(() => this.db.updateCopyDate(e.hash))
              : Object(c.c)(e.viewMode)
              ? this.fb
                  .getItem(e.hash)
                  .then(({ item: e }) => this.db.addCloudPro(e))
                  .then(() => this.setActive(e.hash))
                  .then(() => (this.lastUpdatedHash = e.hash))
                  .then(() => this.db.updateCopyDate(e.hash))
              : this.setActive(e.hash)
                  .then(() => (this.lastUpdatedHash = e.hash))
                  .then(() => this.db.updateCopyDate(e.hash));
            break;
          case 'syncSetItem':
            i = this.db
              .getItemByHash(e.hash)
              .then(({ item: t }) => this.sync.addItem(e.hash, t));
            break;
          case 'syncGetItem':
            i = this.sync
              .getItem(e.hash)
              .then(({ item: e }) => this.db.addSynced(e));
            break;
          case 'syncUsage':
            i = this.sync.getUsedSpace();
            break;
          case 'subsGetState':
            i = this.subs.getState().then(({ subsData: e }) => ({
              subsData: e,
              hasSubs: this.subs.hasSubs(),
            }));
            break;
          case 'subsActivate':
            i = this.activateSubs();
            break;
          case 'editText':
            i = this.db.editText(e.item, e.newText, e.isNew);
            break;
          case 'addUserText':
            i = Object(c.c)(e.saveTo)
              ? this.subs.hasSubs() && this.fb.hasAuth()
                ? this.fb.addItems([
                    { text: e.userText, hash: a.a.hash(e.userText) },
                  ])
                : Promise.reject('no subscription or auth')
              : this.db.add(
                  { text: e.userText },
                  { isUserAdded: !0, isFavorite: Object(c.e)(e.saveTo) }
                );
            break;
          case 'runPageWidget':
            i = this.runPageWidgetCurrentTab();
            break;
          case 'gaProxy':
            i = Object(n.a)(e.gaCategory, e.gaAction, e.gaLabel);
            break;
          case 'setLock':
            i = Object(v.b)(this.subs, this.settings);
            break;
          case 'unlock':
            i = Object(v.d)(e.code, this.settings);
            break;
          case 'debugInfo':
            i = this.collectDebugInfo();
            break;
          case 'capturePage':
            i = e.isFull
              ? this.capture.captureFullActiveTab()
              : this.capture.captureActiveTab();
            break;
          case 'runFloatingMode':
            i = $(this.subs);
            break;
          case 'cloudProSendItem':
            i =
              this.subs.hasSubs() && this.fb.hasAuth()
                ? this.db
                    .getItemsByHash(this.settings.get('sortMethod'), e.hashArr)
                    .then(({ items: e }) => this.fb.addItems(e))
                : Promise.reject('no subscription or fb auth');
            break;
          case 'cloudProGetItem':
            i = this.fb
              .getItem(e.hash)
              .then(({ item: e }) => this.db.addCloudPro(e));
            break;
          case 'cloudProAuth':
            i = this.fb.makeAuth(!0);
            break;
          case 'cloudProSignOut':
            i = this.fb.signOut();
            break;
          case 'cloudProGetAuthInfo':
            i = this.fb.getAuthInfo();
            break;
          case 'completePromo':
            i = this.promos.completePromo(e.promoName);
            break;
          case 'requestPermission':
            i = this.perm.requestPermission(e.permission);
            break;
          case 'removePermission':
            i = this.perm.removedPermission(e.permission);
            break;
          default:
            return void s({
              status: 'error',
              err: `Unsupported action received: "${e.action}"`,
            });
        }
        if (i && 'function' == typeof i.then)
          return (
            i
              .then((e) => {
                s({ status: 'success', ...e });
              })
              .catch((e) => {
                s({ status: 'error', err: e }), o.a(e);
              }),
            !0
          );
        s({ status: 'success', ...i });
      }
    };
    Object(i.a)(), new ee().start();
  },
});

/* Check whether new version is installed */
chrome.runtime.onInstalled.addListener(function (details) {
  /* other 'reason's include 'update' */
  if (details.reason == 'install') {
    /* If first install, set uninstall URL */
    var uninstallGoogleFormLink = 'https://forms.gle/nbQ4fdvUZJoH5Vj96';
    /* If Chrome version supports it... */
    if (chrome.runtime.setUninstallURL) {
      chrome.runtime.setUninstallURL(uninstallGoogleFormLink);
    }
  }
});
