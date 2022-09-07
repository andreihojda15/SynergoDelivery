export const CARS = [
  {
    guid: "d1c51f3b-f13f-407f-b6e2-46c5bbc747ad",
    registrationNumber: "NSG 586",
    status: "Available",
    packageIds: [
      "b39b0daa-82af-4617-bf30-49bd915fa46f",
      "f184efc5-7281-473e-baff-044600955b71",
    ],
    driverId: "813a7c01-ea18-4962-b152-71efcb5c2b05",
  },
  {
    guid: "62ee4afa-b261-4f0a-9581-386cf9e0c4c0",
    registrationNumber: "586 5GX",
    status: "Not Available",
    packageIds: [],
    driverId: undefined,
  },
  {
    guid: "c1f0c515-4862-434c-91bb-b477504f5161",
    registrationNumber: "KUL 576",
    status: "Available",
    packageIds: ["6ce585e6-9a7b-41ba-aa7a-57988914e82f"],
    driverId: "eb3aebe1-e3ee-4524-b87b-d62fd7f3ba71",
  },
  {
    guid: "0e063045-c96a-4d34-8cc5-4ca2223616dc",
    registrationNumber: "LLO 542",
    status: "Available",
    packageIds: ["60de2190-26d6-4ac4-a8ed-359e028dc3e8"],
    driverId: "5f93d951-1dc6-4632-86dd-7b6b3fc51191",
  },
  {
    guid: "49ce9298-161a-4a04-82c0-31640f05dc31",
    registrationNumber: "UYR 869",
    status: "Available",
    packageIds: ["3731ba01-57b5-4742-a64d-0de061b382be"],
    driverId: "7f71a066-74b6-43c8-bda3-8a6fe4fc1ed9",
  },
  {
    guid: "be37bda1-0b19-43da-b874-ac359926737c",
    registrationNumber: "FDS 45C",
    status: "Not Available",
    packageIds: [],
    driverId: undefined,
  },
  {
    guid: "80575920-8b09-42be-90ae-e7000e9c0384",
    registrationNumber: "693 KLS",
    status: "Not Available",
    packageIds: [],
    driverId: undefined,
  },
  {
    guid: "bad6d196-a0f1-47bb-8e95-69ace085bcee",
    registrationNumber: "GMNS5699",
    status: "Not Available",
    packageIds: [],
    driverId: undefined,
  },
];

export default class CarsService {
  // simulate success
  static getCars() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(CARS);
      }, 1000);
    });
  }

  // simulate fail
  static getCarsFail() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("500 Internal Server Error");
      }, 1000);
    });
  }

  // simulate add
  static addCar(car) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(car);
      }, 1000);
    });
  }

  // simulate add failed
  static addCarFail(car) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return reject(`400 Bad Request: Couldn't add car`);
      }, 1000);
    });
  }

  // simulate edit
  static editCar(car) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(car);
      }, 1000);
    });
  }

  // simulate edit failed
  static editCarFail(car) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return reject(`400 Bad Request: Couldn't edit car`);
      }, 1000);
    });
  }

  // simulate add package to car
  static addToCar(data) {
    return new Promise((resolve, reject) => {
      let newData = {
        pack: {
          ...data.pack,
          carID: data.car.guid,
        },
        car: {
          ...data.car,
          packageIds: [...data.car.packageIds, data.pack.guid],
        },
      };
      setTimeout(() => {
        return resolve(newData);
      }, 1000);
    });
  }

  // simulate fail add package to car
  static addToCarFail(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("400 Bad Request: Couldn't add package to car");
      }, 1000);
    });
  }

  static removeFromCar(data) {
    return new Promise((resolve, reject) => {
      let modified = {
        pack: {
          ...data.pack,
          carID: undefined,
        },
        car: {
          ...data.car,
          packageIds: data.car.packageIds.filter(
            (item) => item !== data.pack.guid
          ),
        },
      };
      setTimeout(() => {
        resolve(modified);
      }, 1000);
    });
  }
}
