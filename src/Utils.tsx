import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { config } from './Configuration';

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

enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE'
}

export const deleteExpense = async (
  userId: string,
  budgetId: string,
  expenseId: string
) => {
  return await makeAxiosRequest(
    HttpMethods.DELETE,
    config.backendHost,
    config.deleteExpenseUrl(userId, budgetId, expenseId)
  );
};

export const deleteBudget = async (userId: string, budgetId: string) => {
  return await makeAxiosRequest(
    HttpMethods.DELETE,
    config.backendHost,
    config.deleteBudgetUrl(userId, budgetId)
  );
};

export const addBudget = async ({ userId, name, max }: any) => {
  return await makeAxiosRequest(
    HttpMethods.POST,
    config.backendHost,
    config.addBudgetUrl(userId),
    {},
    { budgetCategory: name, amount: max, expenses: [] }
  );
};

export const addExpense = async (
  userId: string,
  budgetId: string,
  expense: object
) => {
  return await makeAxiosRequest(
    HttpMethods.POST,
    config.backendHost,
    config.addExpenseUrl(userId, budgetId),
    {},
    expense
  );
};

export const getBudgetExpenses = async (userId: string, budgetId: string) => {
  if (!budgetId) {
    return [];
  }
  return await makeAxiosRequest(
    HttpMethods.GET,
    config.backendHost,
    config.getBudgetExpensesUrl(userId, budgetId)
  );
};

export const getBudgetsForUser = async (userId: string): Promise<any> => {
  return await makeAxiosRequest(
    HttpMethods.GET,
    config.backendHost,
    config.getBudgetsForUserUrl(userId)
  );
};

export const getDate = (date: string | Date) => {
  const newDate = new Date(date);

  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};
