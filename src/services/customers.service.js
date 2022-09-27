import GenericService from "./generic.service";


export default class CustomersService {

  static getCustomers() {
    return GenericService.get('customers');
  }


  static getCustomersFail() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("500 Internal Server Error");
      }, 1000);
    });
  }
}
