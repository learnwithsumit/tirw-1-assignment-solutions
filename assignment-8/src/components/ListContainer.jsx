const ListContainer = ({ children }) => {
  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {children}
    </div>
  );
};
export default ListContainer;
