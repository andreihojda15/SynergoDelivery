export const DRIVERS = [
    {
        id: "eb3aebe1-e3ee-4524-b87b-d62fd7f3ba71",
        name: "Brooks Maitland",
        phoneNumber: "+1 518-936-3292",
        carId: "d1c51f3b-f13f-407f-b6e2-46c5bbc747ad",
    },
    {
        id: "813a7c01-ea18-4962-b152-71efcb5c2b05",
        name: "Jack Sparrow",
        phoneNumber: "+1 301-909-1968",
        carId: "62ee4afa-b261-4f0a-9581-386cf9e0c4c0",
    },
    {
        id: "5f93d951-1dc6-4632-86dd-7b6b3fc51191",
        name: "Nettie Prosper",
        phoneNumber: "+1 812-649-8597",
        carId: "c1f0c515-4862-434c-91bb-b477504f5161",
    },
    {
        id: "7f71a066-74b6-43c8-bda3-8a6fe4fc1ed9",
        name: "Mellony Lee",
        phoneNumber: "+1 601-833-0545",
        carId: "0e063045-c96a-4d34-8cc5-4ca2223616dc",
    },
    {
        id: "1dfdfb6e-8791-4766-8fe4-9973b965e1ac",
        name: "Tarina Raegan",
        phoneNumber: "+1 904-633-5106",
        carId: "49ce9298-161a-4a04-82c0-31640f05dc31",
    },
    {
        id: "602ee2fa-e319-41aa-aac9-9ebad9d21c56",
        name: "Tanya Kamden",
        phoneNumber: "+1 229-389-4702",
        carId: "be37bda1-0b19-43da-b874-ac359926737c",
    },
    {
        id: "fc80d8f4-d2c3-460d-8596-fb26d41df3d8",
        name: "Cheryl Kaden",
        phoneNumber: "+1 818-373-7905",
        carId: "80575920-8b09-42be-90ae-e7000e9c0384",
    },
    {
        id: "0bc15d56-f542-4228-802b-6ed877b87474",
        name: "Jaydon Lacie",
        phoneNumber: "+1 507-526-5727",
        carId: "bad6d196-a0f1-47bb-8e95-69ace085bcee",
    },
    {
        id: "6a0ee78b-f782-47e7-b178-af373cfa159b",
        name: "Brennan Lexus",
        phoneNumber: "+1 816-758-9938",
        carId: undefined,
    },
    {
        id: "329568b3-e130-4515-95ef-91cba734f52c",
        name: "Franklyn Brylee",
        phoneNumber: "+1 972-798-9680",
        carId: undefined,
    },
];

export default class DriversService {
    // simulate success
    static getDrivers() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(DRIVERS);
            }, 1000);
        });
    }

    // simulate fail
    static getDriversFail() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('500 Internal Server Error');
            }, 1000);
        });
    }

    // simulate add
    static addDrivers(pack) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve(pack);
            }, 1000);
        });
    }

    // simulate add failed
    static addDriversFail(pack) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return reject(`400 Bad Request: Couldn't add driver`);
            }, 1000);
        });
    }
}
