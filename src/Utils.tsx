import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: 'INR',
  style: 'currency',
  minimumFractionDigits: 0
});

export const makeAxiosRequest = async (
  method: string,
  baseUrl: string,
  endpoint: string,
  params?: {
    [key: string]: string | number | boolean | (string | number | boolean)[];
  },
  body?: object,
  headers?: { [key: string]: string }
) => {
  try {
    // Construct the full URL
    const url = `${baseUrl}${endpoint}`;

    // Configure the Axios request
    const config: AxiosRequestConfig = {
      method,
      url,
      params,
      data: body,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },
      headers
    };

    // Execute the Axios request
    const response = await axios(config);

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error making Axios request:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
