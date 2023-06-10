import { useState, useEffect } from "react";
import { ContactsForm } from "./ContactsForm/contactsForm";
import ContactList from "./ContactsList/contactsList";
import Filter from "./Filter/filter";
import { Section, Title, SectionHeading } from "./GlobalStyles.styled";


const getInitialContacts = () => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    } else {
return [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]
    }
}  
export default function App() {
  
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const addNewContact = (newContact, { actions }) => {
    const existName = contacts.map(el => el.name.toLowerCase());

    return existName.includes(newContact.name.toLowerCase()) ?
      alert(`${newContact.name} is already in contacts`) :
      setContacts(prevState => {
        actions.resetForm()
        return [...prevState, newContact]
      });
      }

    
  const getVisibleContact = () => {
    const normalizeFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };
  
  const delContact = id => {
    setContacts(prevState => prevState.filter(item => item.id !== id),
    );
  };

    const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

    return (
      <Section>
        <Title>Phonebook</Title>
        <ContactsForm
          onSubmit={ addNewContact } />
      
        <SectionHeading>Contacts</SectionHeading>
        <Filter filter={filter} onChange={changeFilter} />
        <ContactList contacts={getVisibleContact()}
          onDelete={delContact} />
    </Section>
    )

}



