const apiUrl = 'http://localhost:49085/api';

export default class GenericService {
  static async get(relativePath) {
    const response = await fetch(`${apiUrl}/${relativePath}`,
      {
        crossDomain: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET'
        }
      });
    return await response.json();
  }

  static async post(relativePath, data) {
    const response = await fetch(`${apiUrl}/${relativePath}`,
      {
        crossDomain: true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify(data),
      });
    if(response.status === 500) {
      return Promise.reject('500');
    }
    return await response.json();
  }

  static async put(relativePath, data) {
    const response = await fetch(`${apiUrl}/${relativePath}`,
      {
        crossDomain: true,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT'
        },
        body: JSON.stringify(data),
      });
    return await response.json();
  }

  static async delete(relativePath) {
    const response = await fetch(`${apiUrl}/${relativePath}`,
      {
        crossDomain: true,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE'
        },
      });
    return await response.json();
  }

};
