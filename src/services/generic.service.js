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
};
