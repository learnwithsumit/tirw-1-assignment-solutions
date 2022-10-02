import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Transaction from '../components/Transactions/Transaction';
import Form from '../components/Form';
import { fetchTransactions } from '../features/transaction/transactionSlice';
import {
  setSearch,
  clearSearch,
  setType,
  clearType,
  clearFilter,
} from '../features/filter/filterSlice';
import { ReactComponent as CrossIcon } from '../assets/icons/cross.svg';
import Pagination from '../components/Pagination';
const TransactionListing = () => {
  const [searchText, setSearchText] = useState('');
  const [tType, setTtype] = useState('');
  const dispatch = useDispatch();
  const {
    transaction: { transactions, isLoading, isError, modalEdit, totalCount },
    filter: {
      search,
      type,
      pagination: { currentPage, limit },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchTransactions({ currentPage, limit, search, type }));
  }, [currentPage, limit, search, type, dispatch]);

  // search handler
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchText) {
      dispatch(setSearch(searchText));
      return setSearchText('');
    }
    dispatch(clearSearch());
  };

  // type change handler
  const typeChangeHandler = (type) => {
    setTtype(type);
    dispatch(setType(type));
  };
  // cancel type handler
  const handleClearType = () => {
    dispatch(clearType());
    setTtype('');
  };
  const handleClearFilter = () => {
    dispatch(clearFilter());
    setTtype('');
  };

  // decide what to render
  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} modal />
    ));
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transactions found!</p>;
  }

  return (
    <>
      {modalEdit && (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
          <Form />
        </div>
      )}
      <div className="listing-header">
        <div className="types">
          <div className="input-group">
            <input
              type="radio"
              name="type"
              id="income"
              checked={tType === 'income'}
              onChange={(e) => typeChangeHandler('income')}
            />
            <label htmlFor="income">Income</label>
          </div>
          <div className="input-group">
            <input
              type="radio"
              name="type"
              id="expense"
              checked={tType === 'expense'}
              onChange={(e) => typeChangeHandler('expense')}
            />
            <label htmlFor="expense">Expense</label>
          </div>
        </div>
        <form className="search" onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="search text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
      </div>

      {(search || type) && (
        <div className="flex items-center justify-between w-full my-6">
          <div className="flex items-center space-x-4">
            {type && (
              <button
                className="px-4 py-2 rounded-full bg-blue-400 text-white flex items-center"
                onClick={handleClearType}
              >
                {type}
                <CrossIcon className="w-2 h-2 fill-white  ml-2" />
              </button>
            )}{' '}
            {search && (
              <button
                className="px-4 py-2 rounded-full bg-blue-400 text-white flex items-center"
                onClick={() => dispatch(clearSearch())}
              >
                {`"${search}"`}{' '}
                <CrossIcon className="w-2 h-2 fill-white ml-2" />
              </button>
            )}
          </div>
          <div>
            <button
              className="px-4 py-2 rounded-full bg-red-400 text-white flex items-center"
              onClick={handleClearFilter}
            >
              clear
              <CrossIcon className="w-2 h-2 fill-white ml-2" />
            </button>
          </div>
        </div>
      )}
      <div className="container">
        <ul className="listing-list">{content}</ul>
      </div>
      <Pagination totalCount={totalCount} />
    </>
  );
};
export default TransactionListing;
