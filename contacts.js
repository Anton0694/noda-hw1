const { nanoid } = require('nanoid');
const path = require('path');
const fs = require('fs').promises;

 const contactsPath = path.resolve('./db/contacts.json');
 


 async function listContacts() {
    try {
        const contacts = await fs.readFile(contactsPath)
        return JSON.parse(contacts)
    }
    catch (error) {
        console.log(error)    
        return [];
  }
}

 async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact || null;
}

 async function removeContact(contactId) {
    let contacts = await listContacts();
    contacts = contacts.filter(contact => contact.id !== contactId)
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return `Contact with id:${contactId} successfully removed`;
    } catch (error) {
        console.log(error)
    }
}


 async function addContact(name, email, phone) {
    const contacts = await listContacts();
    contacts.push({
        id: nanoid(),
        name,
        email,
        phone,
    });
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return contacts.slice(-1)[0];
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}