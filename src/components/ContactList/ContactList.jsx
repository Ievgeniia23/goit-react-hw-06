import { useSelector, useDispatch } from 'react-redux';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';


import { selectContacts } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice';
import { deleteContact } from '../../redux/contactsSlice';




const ContactList = () => {
    const dispatch = useDispatch();
  
    const contacts = useSelector(selectContacts);
    const filter = useSelector(selectNameFilter);

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    const handleDelete = (id) => {
        dispatch(deleteContact(id));
   }
    
  
    return (
    <ul className={css.contactListWrapper}>
      {visibleContacts.map(contact => {
        return (
          <li className={css.listItem} key={contact.id}>
            <Contact
              id={contact.id}
              name={contact.name}
              number={contact.number}
              onDelete={() => handleDelete(contact.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
