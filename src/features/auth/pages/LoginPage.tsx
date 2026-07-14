import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      dispatch(setCredentials({
        user: {
          id: 1,
          login_id: 'john_doe',
          first_name: 'John',
          last_name: 'Doe',
          role_id: 1,
          role: 'ADMIN',
          is_first_login: 0
        },
        accessToken: 'fake-access-token',
        refreshToken: 'fake-refresh-token'
      }));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">Enter your credentials to access the platform</p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in (Mock)'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
