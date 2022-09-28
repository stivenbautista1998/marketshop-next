import { Login } from '@templates/Login';
import { LoginProtectedRoute } from '@components/LoginProtectedRoute';

function LoginPage() {
  return (
    <LoginProtectedRoute>
      <Login />
    </LoginProtectedRoute>
  );
}

export default LoginPage;
