const Card = ({ children }) => {
  return (
    <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
      {children}
    </div>
  );
};
export default Card;
