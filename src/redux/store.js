//proposta
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import contactsReducer from './contactsSlice';
import filtersReducer from './filtersSlice';

//IO

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const contactsConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'], // зберігаємо тільки поле items зі списком контактів
};


export const store = configureStore({
  reducer: {
    contacts: persistReducer(contactsConfig, contactsReducer),
   
    filter: filtersReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'], // зберігаємо тільки поле items зі списком контактів
};

const rootReducer = combineReducers({
  contacts: persistReducer(persistConfig, contactsReducer),
  filters: filtersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
