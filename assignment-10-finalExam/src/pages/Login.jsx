import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/lws-logo-light.svg';
import Loader from '../components/ui/Loader';
import Error from '../components/ui/Error';
import { useLoginMutation } from '../features/auth/authApi';

export default function Login() {
  const [email, setEmail] = useState('sumit@learnwithsumit.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    // actually not needed to implement here
    // from public route wrapper this will be done
    // but used also there for safety
    if (data?.accessToken && data?.user) {
      navigate('/teams');
    }
  }, [data, responseError, navigate]);

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    login({
      email,
      password,
    });
  };

  return (
    <div className="grid place-items-center min-h-screen bg-[#F9FAFB">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/">
              <img
                className="mx-auto h-12 w-auto"
                src={logoImage}
                alt="Learn with sumit"
              />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end"></div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : 'Sign in'}
              </button>
            </div>

            {error !== '' && <Error message={error} />}
          </form>
          <div className="shadow-lg py-4 px-2 rounded-md text-xs space-y-1 text-gray-500">
            <p>Available Users:</p>
            <ol className="list-inside list-disc">
              <li>sumit@learnwithsumit.com</li>
              <li>akash@learnwithsumit.com</li>
              <li>saad@learnwithsumit.com</li>
              <li>test1@gmail.com - test4@gmail.com</li>
            </ol>
            <p>Password: 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
