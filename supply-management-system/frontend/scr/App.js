import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Supplies from './pages/Supplies';
import Sales from './pages/Sales';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <div className="container mt-4">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <PrivateRoute path="/products" component={Products} />
                        <PrivateRoute path="/supplies" component={Supplies} />
                        <PrivateRoute path="/sales" component={Sales} />
                    </Switch>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;