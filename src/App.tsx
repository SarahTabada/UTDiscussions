import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/components';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Home from './pages/Home';
import Threads from './pages/Threads';
import ThreadDetails from './pages/ThreadDetails';
import SubmitQuestion from './pages/SubmitQuestion';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth initialMode="login" />} />
            <Route path="/register" element={<Auth initialMode="register" />} />
            <Route path="/threads" element={<Threads />} />
            <Route path="/threads/:id" element={<ThreadDetails />} />
            <Route 
              path="/submit" 
              element={
                <ProtectedRoute>
                  <SubmitQuestion />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
