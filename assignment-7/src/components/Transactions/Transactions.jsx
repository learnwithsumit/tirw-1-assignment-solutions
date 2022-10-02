import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTransactions } from '../../features/transaction/transactionSlice';
import Transaction from './Transaction';

export default function Transactions() {
  const dispatch = useDispatch();

  const { transactions, isLoading, isError, totalCount } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // decide what to render
  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions
      .slice(0, 5)
      .map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ));
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transactions found!</p>;
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
        {(totalCount > 5 || transactions.length > 5) && (
          <Link
            to="/transactions"
            className="btn"
            style={{
              textAlign: 'center',
              background: 'mediumseagreen',
              display: 'block',
              textDecoration: 'none',
            }}
          >
            View All
          </Link>
        )}
      </div>
    </>
  );
}
