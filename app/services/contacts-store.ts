var data = [
  {
    "fullName": "Layla Oberbrunner",
    "firstName": "Mabel",
    "lastName": "Mante",
    "phone": "(821)635-3194x77511",
    "email": "hugh83@example.com",
    "address": "006 Dickens Freeway Apt. 376\nStehrbury, AK 67163-2235"
  },
  {
    "fullName": "Clinton Haley",
    "firstName": "Montana",
    "lastName": "Wisozk",
    "phone": "+88(9)2632921828",
    "email": "gleichner.manuela@example.com",
    "address": "16410 Arno Shoal Suite 140\nJaniyaton, PW 96393-5217"
  },
  {
    "fullName": "Libby Mohr",
    "firstName": "Daron",
    "lastName": "Sanford",
    "phone": "(200)522-9680x699",
    "email": "hammes.haley@example.net",
    "address": "844 O'Keefe Spurs\nRaynorstad, IA 15063-4466"
  },
  {
    "fullName": "Meagan Lindgren",
    "firstName": "Lorenzo",
    "lastName": "Tillman",
    "phone": "848.147.2746",
    "email": "judd78@example.org",
    "address": "225 Elvis Walks\nWest Salma, TX 69031"
  },
  {
    "fullName": "Mrs. Vivienne Schimmel III",
    "firstName": "Kadin",
    "lastName": "Schmidt",
    "phone": "+48(6)6489157253",
    "email": "broderick.armstrong@example.com",
    "address": "7282 Celestino Roads\nAudreyfort, LA 18802-4038"
  }
];

export class ContactStore {
    contacts:Array<any>;

    constructor() {
        this.contacts = [];
    }

    getList():Promise<any> {
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
