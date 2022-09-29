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

  static addCustomer(customer){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(customer);
      }, 1000);
    });
  }

  static addCustomerFail(customer){
    return new Promise((reject) => {
      setTimeout(() => {
        return reject(`400 Bad Request: Couldn't add driver`);
      }, 1000);
    });
  }

  static editCustomer(customer){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(customer);
      }, 1000);
    });
  }

  static editCustomerFail(customer){
    return new Promise((reject) => {
      setTimeout(() => {
        return reject(`400 Bad Request: Couldn't add driver`);
      }, 1000);
    });
  }

  static deleteCustomer(customer){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //console.log(customer);
        GenericService.delete(`customers/${customer.id}`);
        return resolve(customer);
      }, 1000);
    });
  }

  static deleteCustomerFail(customer){
    return new Promise((reject) => {
      setTimeout(() => {
        return reject(`400 Bad Request: Couldn't add driver`);
      }, 1000);
    });
  }

}
