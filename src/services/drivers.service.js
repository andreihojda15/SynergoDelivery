import GenericService from "./generic.service";


export const DRIVERS = [
  {
    id: "eb3aebe1-e3ee-4524-b87b-d62fd7f3ba71",
    name: "Brooks Maitland",
    phoneNumberNumber: "+1 518-936-3292",
    carId: 1,
  },
  {
    id: "813a7c01-ea18-4962-b152-71efcb5c2b05",
    name: "Jack Sparrow",
    phoneNumberNumber: "+1 301-909-1968",
    carId: 2,
  },
  {
    id: "5f93d951-1dc6-4632-86dd-7b6b3fc51191",
    name: "Nettie Prosper",
    phoneNumberNumber: "+1 812-649-8597",
    carId: 3,
  },
  {
    id: "7f71a066-74b6-43c8-bda3-8a6fe4fc1ed9",
    name: "Mellony Lee",
    phoneNumberNumber: "+1 601-833-0545",
    carId: 4,
  },
  {
    id: "1dfdfb6e-8791-4766-8fe4-9973b965e1ac",
    name: "Tarina Raegan",
    phoneNumberNumber: "+1 904-633-5106",
    carId: 5,
  },
  {
    id: "602ee2fa-e319-41aa-aac9-9ebad9d21c56",
    name: "Tanya Kamden",
    phoneNumberNumber: "+1 229-389-4702",
    carId: 6,
  },
  {
    id: "fc80d8f4-d2c3-460d-8596-fb26d41df3d8",
    name: "Cheryl Kaden",
    phoneNumberNumber: "+1 818-373-7905",
    carId: 7,
  },
  {
    id: "0bc15d56-f542-4228-802b-6ed877b87474",
    name: "Jaydon Lacie",
    phoneNumberNumber: "+1 507-526-5727",
    carId: 8,
  },
  {
    id: "6a0ee78b-f782-47e7-b178-af373cfa159b",
    name: "Brennan Lexus",
    phoneNumberNumber: "+1 816-758-9938",
    carId: undefined,
  },
  {
    id: "329568b3-e130-4515-95ef-91cba734f52c",
    name: "Franklyn Brylee",
    phoneNumberNumber: "+1 972-798-9680",
    carId: undefined,
  },
];

export default class DriversService {
  // simulate success
  static getDrivers() {
    return GenericService.get('drivers');
  }
  static getAvailableCars(id) {
    return GenericService.get(`drivers/availableCars/${id}`);
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
  static addDriver(driver) {
    return new Promise((resolve, reject) => {
      let addedDriver;
      try {
        addedDriver = GenericService.post('drivers', driver);
      } catch (e) {
        reject(e);
      }
      setTimeout(() => {
        resolve(addedDriver);
      }, 1000);
    })
  }

  // simulate add failed
  static addDriverFail(driver) {
    return new Promise((reject) => {
      setTimeout(() => {
        return reject(`400 Bad Request: Couldn't add driver`);
      }, 1000);
    });
  }

  // simulate edit
  static editDriver(driver) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(driver);
      }, 1000);
    });
  }

  // simulate edit failed
  static editDriverFail(driver) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return reject(`400 Bad Request: Couldn't edit driver`);
      }, 1000);
    });
  }

  // simulate delete
  static deleteDriver(driver) {
    return new Promise((resolve, reject) => {
      let deletedDriver;
      try {
        deletedDriver = GenericService.delete(`drivers/${driver.id}`);
      } catch (e) {
        reject(e);
      }
      setTimeout(() => {
        resolve(deletedDriver);
      }, 1000);
    })
  }

  // simulate delete failed
  static deleteDriverFail(driver) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return reject(`400 Bad Request: Couldn't delete driver`);
      }, 1000);
    });
  }

  static addCarToDriver(data) {
    return new Promise((resolve, reject) => {
      let modified = {
        car: {
          ...data.car,
          status: 'Available',
        },
        driver: {
          ...data.driver,
          carId: data.car.id,
        },
      };
      setTimeout(() => {
        resolve(modified);
      }, 1000);
    });
  }
}

