import GenericService from "./generic.service";


export default class CustomersService {

  static getCustomers() {
    return GenericService.get('customers');
  }


  static getCustomersFail() {
    return new Promise((resolve, reject) => {
      reject("500 Internal Server Error");
    });
  }

  static addCustomer(customer) {
    return new Promise((resolve, reject) => {
      resolve(GenericService.post('customers',customer));
    });
  }

  static addCustomerFail(customer) {
    return new Promise((reject) => {
      return reject(`400 Bad Request: Couldn't add driver`);
    });
  }

  static editCustomer(customer) {
    return new Promise((resolve, reject) => {
      return resolve(GenericService.put(`customers/${customer.id}`,customer));
    });
  }

  static editCustomerFail(customer) {
    return new Promise((reject) => {
      return reject(`400 Bad Request: Couldn't add driver`);
    });
  }

  static deleteCustomer(customer) {
    return new Promise((resolve, reject) => {
      return resolve(GenericService.delete(`customers/${customer.id}`));
    });
  }

  static deleteCustomerFail(customer) {
    return new Promise((reject) => {
      return reject(`400 Bad Request: Couldn't add driver`);
    });
  }

}
