import logo from '../logo.svg';
const Navbar = () => {
  return (
    <nav className="bg-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-5 lg:px-0 flex justify-between py-3 items-center">
        <img src={logo} alt="lws" className="h-10" />
      </div>
    </nav>
  );
};
export default Navbar;
