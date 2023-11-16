const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        return [];
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contact = contacts.find(({ id }) => id === contactId);
        return contact || null;
    } catch (error) {
        return null;
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const contactIndex = contacts.findIndex(({ id }) => id === contactId);

        if (contactIndex === -1) {
            return null;
        }

        const [removedContact] = contacts.splice(contactIndex, 1);

        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return removedContact;
    } catch (error) {
        return null;
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = { id: Date.now().toString(), name, email, phone };

        contacts.push(newContact);

        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        return null;
    }
}

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            listContacts().then((contacts) => console.table(contacts));
            break;

        case 'get':
            getContactById(id).then((contact) => console.log(contact));
            break;

        case 'add':
            addContact(name, email, phone).then((newContact) => console.log(newContact));
            break;

        case 'remove':
            removeContact(id).then((removedContact) => console.log(removedContact));
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact, invokeAction };
