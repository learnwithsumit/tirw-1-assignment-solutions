import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="grid place-items-center h-screen text-center">
      <div className="space-y-4">
        <h1 className="text-6xl font-extrabold">404</h1>
        <p className="text-xl"> Sorry, the page you tried is not found</p>
        <Link
          to="/"
          className="uppercase inline-block bg-pink-400 text-white px-6 py-2 rounded-md"
        >
          Back home
        </Link>
      </div>
    </div>
  );
};
export default Error;
