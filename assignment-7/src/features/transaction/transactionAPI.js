import axios from '../../utils/axios';

export const getTransactions = async (
  { currentPage, limit, search, type } = { currentPage: 1, limit: 5 }
) => {
  let queryString = '';
  if (search) {
    queryString += `&name_like=${search}`;
  }
  if (type) {
    queryString += `&type=${type}`;
  }
  const response = await axios.get(
    `/transactions?_sort=id&_order=desc&_page=${currentPage}&_limit=${limit}${queryString}`
  );
  console.log(response);
  const balanceResponse = await axios.get('/balance');

  return {
    transactions: response.data,
    balance: balanceResponse.data.totalBalance,
    totalCount: response.headers['x-total-count'],
  };
};

export const addTransaction = async (data) => {
  const balanceResponse = await axios.get('/balance');
  const response = await axios.post('/transactions', data);
  const newBalance =
    data.type === 'income'
      ? Number(balanceResponse.data.totalBalance) + Number(data.amount)
      : Number(balanceResponse.data.totalBalance) - Number(data.amount);
  const updatedBalance = await axios.put('/balance', {
    totalBalance: newBalance,
  });

  return {
    transaction: response.data,
    balance: updatedBalance.data.totalBalance,
  };
};

export const editTransaction = async (id, data) => {
  const balanceResponse = await axios.get('/balance');
  const itemResponse = await axios.get(`/transactions/${id}`);
  const response = await axios.put(`/transactions/${id}`, data);
  let newBalance;
  if (itemResponse.data.type === data.type) {
    const actionBalance =
      Number(response.data.amount) - Number(itemResponse.data.amount);
    if (data.type === 'income') {
      newBalance = balanceResponse.data.totalBalance + actionBalance;
    } else {
      newBalance = balanceResponse.data.totalBalance - actionBalance;
    }
  } else {
    let actionBalance = Number(itemResponse.data.amount) + Number(data.amount);
    if (itemResponse.data.type === 'income' && data.type !== 'income') {
      newBalance = balanceResponse.data.totalBalance - actionBalance;
    } else {
      newBalance = balanceResponse.data.totalBalance + actionBalance;
    }
  }

  const updatedBalance = await axios.put('/balance', {
    totalBalance: newBalance,
  });

  return {
    transaction: response.data,
    balance: updatedBalance.data.totalBalance,
  };
};

export const deleteTransaction = async (id) => {
  const balanceResponse = await axios.get('/balance');
  const itemResponse = await axios.get(`/transactions/${id}`);
  const response = axios.delete(`/transactions/${id}`);

  const newBalance =
    itemResponse.data.type === 'income'
      ? Number(balanceResponse.data.totalBalance) -
        Number(itemResponse.data.amount)
      : Number(balanceResponse.data.totalBalance) +
        Number(itemResponse.data.amount);
  const updatedBalance = await axios.put('/balance', {
    totalBalance: newBalance,
  });
  return {
    deletedTransaction: response.data,
    balance: updatedBalance.data.totalBalance,
  };
};
