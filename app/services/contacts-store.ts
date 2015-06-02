var data = [{ givenName: 'John' }, { givenName: 'Smith' }];

export class ContactStore {
    contacts:Array<any>;

    constructor() {
        this.contacts = [];
    }

    getList():Promise {
        this.contacts = data;
        return new Promise((resolve, reject) => resolve(this.contacts))
    }

    search(query:string) {
        let result = [];
        query = query.toLowerCase();

        if (!query) return this.contacts;

        this.contacts.forEach(contact => {
            Object.keys(contact).forEach(key => {
                if (contact[key].toLowerCase().indexOf(query) !== -1 && result.indexOf(contact) === -1) {
                    result.push(contact);
                }
            });
        });
        return result;
    }

    add(value):void {
        this.contacts.push(value);
    }
}

export var contactStore = new ContactStore();
