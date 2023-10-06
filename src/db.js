import Dexie from 'dexie';

const db = new Dexie('weatherAppDB');

db.version(1).stores({
    units: '++id, unit'
});

export default db;
