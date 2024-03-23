export const config = Object.freeze({
  //
  backendHost: 'http://localhost:3000/',

  // endpoints
  getBudgetsForUserUrl: (userId: string) => {
    return `users/${userId}/budgets/`;
  },

  getBudgetExpensesUrl: (userId: string, budgetId: string) => {
    return `users/${userId}/budgets/${budgetId}`;
  },

  addBudgetUrl: (userId: string) => {
    return `users/${userId}/budgets`;
  },

  addExpenseUrl(userId: string, budgetId: string) {
    return `users/${userId}/budgets/${budgetId}/expenses`;
  }
});