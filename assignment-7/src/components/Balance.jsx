import { useSelector } from 'react-redux';
import numberWithCommas from '../utils/numberWithCommas';

export default function Balance() {
  const { balance } = useSelector((state) => state.transaction);

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span> <span>{numberWithCommas(balance)}</span>
      </h3>
    </div>
  );
}
