import GenericService from "./generic.service";

export const CARS = [
  {
    id: "d1c51f3b-f13f-407f-b6e2-46c5bbc747ad",
    registrationNumber: "NSG 586",
    status: "Available",
    packageIds: [
      "b39b0daa-82af-4617-bf30-49bd915fa46f",
      "f184efc5-7281-473e-baff-044600955b71",
    ],
  },
  {
    id: "62ee4afa-b261-4f0a-9581-386cf9e0c4c0",
    registrationNumber: "586 5GX",
    status: "Not Available",
    packageIds: [],
  },
  {
    id: "c1f0c515-4862-434c-91bb-b477504f5161",
    registrationNumber: "KUL 576",
    status: "Available",
    packageIds: ["6ce585e6-9a7b-41ba-aa7a-57988914e82f"],
  },
  {
    id: "0e063045-c96a-4d34-8cc5-4ca2223616dc",
    registrationNumber: "LLO 542",
    status: "Available",
    packageIds: ["60de2190-26d6-4ac4-a8ed-359e028dc3e8"],
  },
  {
    id: "49ce9298-161a-4a04-82c0-31640f05dc31",
    registrationNumber: "UYR 869",
    status: "Available",
    packageIds: ["3731ba01-57b5-4742-a64d-0de061b382be"],
  },
  {
    id: "be37bda1-0b19-43da-b874-ac359926737c",
    registrationNumber: "FDS 45C",
    status: "Not Available",
    packageIds: [],
  },
  {
    id: "80575920-8b09-42be-90ae-e7000e9c0384",
    registrationNumber: "693 KLS",
    status: "Not Available",
    packageIds: [],
  },
  {
    id: "bad6d196-a0f1-47bb-8e95-69ace085bcee",
    registrationNumber: "GMNS5699",
    status: "Not Available",
    packageIds: [],
  },
];

export default class CarsService {
  // simulate success
  static getCars() {
    return new Promise((resolve, reject) => {
      let cars = GenericService.get('cars');
      setTimeout(() => {
        resolve(cars);
      }, 1000);
    })
  }

  static getAvailablePackages(id) {
    return new Promise((resolve, reject) => {
      let packages = GenericService.get(`cars/availablePackages/${id}`);
      setTimeout(() => {
        resolve(packages);
      }, 1000);
    })
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
      let addedCar;
      try {
        addedCar = GenericService.post('cars', car);
      } catch (e) {
        reject(e);
      }
      setTimeout(() => {
        resolve(addedCar);
      }, 1000);
    })
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
    return GenericService.put(`cars/${car.id}`, car)
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
          carId: data.car.id,
        },
        car: {
          ...data.car,
          packageIds: [...data.car.packageIds, data.pack.id],
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
          carId: undefined,
        },
        car: {
          ...data.car,
          packageIds: data.car.packageIds.filter(
            (item) => item !== data.pack.id
          ),
        },
      };
      setTimeout(() => {
        resolve(modified);
      }, 1000);
    });
  }

  static deleteCar(car) {
    return new Promise((resolve, reject) => {
      let deleted = GenericService.delete(`cars/${car.id}`);
      setTimeout(() => {
        resolve(deleted);
      }, 1000);
    })
  }

}
