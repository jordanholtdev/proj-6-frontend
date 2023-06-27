import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import { AuthProvider } from './components/auth/AuthProvider';
import RequireAuth from './components/auth/RequireAuth';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route index path='/login' element={<LoginPage />} />
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
                            <Upload />
                        </RequireAuth>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;
