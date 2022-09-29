import GenericService from "./generic.service";

export const PACKAGES = [
  {
    id: "b39b0daa-82af-4617-bf30-49bd915fa46f",
    senderName: "Wilfred Warner",
    senderPhoneNumber: "+1 224-523-0893",
    departureAddress: "2631 Medical Center Drive",
    departureDate: new Date(2022, 6, 29).toLocaleDateString(),
    awb: "28957193295",
    deliveryAddress: "Street Doverdale 201",
    deliveryDate: "set",
    recipientName: "John Doe",
    recipientPhone: "+1 331-254-1866",
    carId: "set",
    packageStatus: undefined,
    assignedToCar: undefined,
  },
  {
    id: "f184efc5-7281-473e-baff-044600955b71",
    senderName: "Britney Walker",
    senderPhoneNumber: "+1 315-407-5174",
    departureAddress: "1588 Brentwood Drive",
    departureDate: new Date(2022, 7, 20).toLocaleDateString(),
    awb: "93640145365",
    deliveryAddress: "2485 Worley Avenue",
    deliveryDate: "set",
    recipientName: "Menelaus Rajko",
    recipientPhone: "+1 201-872-9969",
    carId: "set",
    packageStatus: undefined,
    assignedToCar: undefined,
  },
  {
    id: "6ce585e6-9a7b-41ba-aa7a-57988914e82f",
    senderName: "Shane Alvarado",
    senderPhoneNumber: "+1 582-282-7917",
    departureAddress: "4984 Timberbrook Lane",
    departureDate: new Date(2022, 7, 12).toLocaleDateString(),
    awb: "42345191223",
    deliveryAddress: "Street Alonys 200",
    deliveryDate: undefined,
    recipientName: "Hanan Dorcas",
    recipientPhone: "+1 201-867-9401",
    carId: "set",
    packageStatus: undefined,
    assignedToCar: undefined,
  },
  {
    id: "60de2190-26d6-4ac4-a8ed-359e028dc3e8",
    senderName: "Robin Mccallum",
    senderPhoneNumber: "+1 531-776-3643",
    departureAddress: "4467 Frank Avenue",
    departureDate: new Date(2022, 8, 20).toLocaleDateString(),
    awb: "32657151292",
    deliveryAddress: "Street Peson 201",
    deliveryDate: undefined,
    recipientName: "Medousa Domitius",
    recipientPhone: "+1 582-201-1351",
    carId: "set",
    packageStatus: undefined,
    assignedToCar: undefined,
  },
  {
    id: "3731ba01-57b5-4742-a64d-0de061b382be",
    senderName: "Eilidh Dupont",
    senderPhoneNumber: "+1 312-864-8013",
    departureAddress: "1293 Dogwood Lane",
    departureDate: new Date(2022, 8, 18).toLocaleDateString(),
    awb: "12957101114",
    deliveryAddress: "Street Aelsop 201",
    deliveryDate: "set",
    recipientName: "Jacob Troilos",
    recipientPhone: "+1 505-950-4893",
    carId: "set",
    packageStatus: undefined,
    assignedToCar: undefined,
  },
  {
    id: "3731ba01-57b5-4742-a64d-0de061b382b0",
    senderName: "Phillipa Skinner",
    senderPhoneNumber: "+1 223-343-0977",
    departureAddress: "2819 Blane Street",
    departureDate: new Date(2022, 5, 8).toLocaleDateString(),
    awb: "72834902536",
    deliveryAddress: "1709 Heavner Avenue",
    deliveryDate: undefined,
    recipientName: "Oisin Browning",
    recipientPhone: "+1 505-644-6540",
    carId: undefined,
    packageStatus: undefined,
    assignedToCar: undefined,
  },
  {
    id: "3731ba01-57b5-4742-a64d-0de061b382b1",
    senderName: "Alfred Lin",
    senderPhoneNumber: "+1 309-690-4682",
    departureAddress: "4089 Powder House Road",
    departureDate: new Date(2022, 8, 2).toLocaleDateString(),
    awb: "28634517893",
    deliveryAddress: "910 Sherman Street",
    deliveryDate: undefined,
    recipientName: "Atif Kelley",
    recipientPhone: "+1 582-222-4932",
    carId: undefined,
    packageStatus: undefined,
    assignedToCar: undefined,
  },
  {
    id: "3731ba01-57b5-4742-a64d-0de061b382b2",
    senderName: "Otto Lovell",
    senderPhoneNumber: "+1 214-849-2375",
    departureAddress: "506 Alexander Drive",
    departureDate: new Date(2022, 5, 30).toLocaleDateString(),
    awb: "46159826371",
    deliveryAddress: "3947 Stark Hollow Road",
    deliveryDate: undefined,
    recipientName: "Camille Needham",
    recipientPhone: "+1 203-284-1579",
    carId: undefined,
    packageStatus: "set",
    assignedToCar: undefined,
  },
];

export default class PackagesService {
  // simulate success
  static getPackages() {
    return GenericService.get('packages');
  }
  // simulate fail
  static getPackagesFail() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("500 Internal Server Error");
      }, 1000);
    });
  }

  static addPackage(pack) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(pack);
      }, 1000);
    });
  }

  // simulate add failed
  static addPackageFail(pack) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return reject(`400 Bad Request: Couldn't add package`);
      }, 1000);
    });
  }

  static managePackages(data) {
    return GenericService.put(`cars/managePackages/${data.car.id}?packageId=${data.pack.id}`);
  }
  
  static deletePackage(pack) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(pack);
      }, 1000);
    });
  }

  // simulate add failed
  static deletePackageFail(pack) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return reject(`400 Bad Request: Couldn't add package`);
      }, 1000);
    });
  }

  static editPackage(pack) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(pack);
      }, 1000);
    });
  }

  // simulate add failed
  static editPackageFail(pack) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return reject(`400 Bad Request: Couldn't add package`);
      }, 1000);
    });
  }
}
