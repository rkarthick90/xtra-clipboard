import Dexie from 'dexie';

const db = new Dexie('bestowDB');
db.version(1).stores({
  clipboards: '&hash,copiedDate,lastCopiedDate',
});

export default db;
