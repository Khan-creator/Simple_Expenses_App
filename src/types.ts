export type Revenue = {
  amount: number;
  date: string;
};

export type Expense = {
  amount: number;
  date: string;
  category: string;
  description?: string;
};
