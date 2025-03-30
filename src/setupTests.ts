import '@testing-library/jest-dom';
import * as fakeIndexedDB from 'fake-indexeddb';
import React from "react";

global.React = React;
global.indexedDB = fakeIndexedDB.indexedDB;
global.IDBKeyRange = fakeIndexedDB.IDBKeyRange;
global.IDBDatabase = fakeIndexedDB.IDBDatabase;
global.IDBObjectStore = fakeIndexedDB.IDBObjectStore;
global.IDBTransaction = fakeIndexedDB.IDBTransaction;
global.IDBFactory = fakeIndexedDB.IDBFactory;
global.IDBIndex = fakeIndexedDB.IDBIndex;
global.IDBCursor = fakeIndexedDB.IDBCursor;
global.IDBRequest = fakeIndexedDB.IDBRequest;
