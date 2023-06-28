import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/Upload';
import { AuthProvider } from './components/auth/AuthProvider';
import RequireAuth from './components/auth/RequireAuth';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route index path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route
                    path='/dashboard'
                    element={
                        <RequireAuth>
                            <Dashboard />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/upload'
                    element={
                        <RequireAuth>
                            <UploadPage />
                        </RequireAuth>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;
