import { useSelector, useDispatch } from 'react-redux';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import ContactForm from './components/ContactForm/ContactForm';

import {
  addContact,
  deleteContact,
  selectContacts,
} from './redux/contactsSlice';
import { changeFilter, selectNameFilter } from './redux/filtersSlice';

import css from './App.module.css';

const AppContent = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const handleAddContact = newContact => dispatch(addContact(newContact));
  const handleDeleteContact = contactId => dispatch(deleteContact(contactId));
  const handleFilterChange = value => dispatch(changeFilter(value));

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.totalWrapper}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={handleAddContact} />
      <SearchBox filter={filter} onFilter={handleFilterChange} />
      <ContactList contacts={visibleContacts} onDelete={handleDeleteContact} />
    </div>
  );
};

export default AppContent;
