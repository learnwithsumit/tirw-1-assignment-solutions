import { useDispatch } from 'react-redux';
import deleteImage from '../../assets/images/delete.svg';
import editImage from '../../assets/images/edit.svg';
import {
  editActive,
  fetchTransactions,
  removeTransaction,
  setModalEdit,
} from '../../features/transaction/transactionSlice';
import numberWithCommas from '../../utils/numberWithCommas';

export default function Transaction({ transaction, modal }) {
  const { name, amount, type, id } = transaction || {};
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  const handleDelete = async () => {
    await dispatch(removeTransaction(id));
    await dispatch(fetchTransactions());
  };

  const handleModalEdit = () => {
    dispatch(editActive(transaction));
    dispatch(setModalEdit());
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {numberWithCommas(amount)}</p>
        <button className="link" onClick={modal ? handleModalEdit : handleEdit}>
          <img alt="Edit" className="icon" src={editImage} />
        </button>
        <button className="link" onClick={handleDelete}>
          <img alt="Delete" className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}
