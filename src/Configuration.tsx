export const config = Object.freeze({
  //
  backendHost: 'http://127.0.0.1:3000/',

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
  },

  deleteBudgetUrl: (userId: string, budgetId: string) => {
    return `users/${userId}/budgets/${budgetId}`;
  },

  deleteExpenseUrl: (userId: string, budgetId: string, expenseId: string) => {
    return `users/${userId}/budgets/${budgetId}/expenses/${expenseId}`;
  }
});
