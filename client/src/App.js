import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Welcome from "./components/layout/Welcome";
import Footer from "./components/layout/Footer";
import ContactUs from "./components/layout/ContactUs";
import CoomingSoon from "./components/layout/pages/CoomingSoon";
import AboutUs from "./components/layout/AboutUs";
import Menu from "./components/layout/Menu";
import ProfilePage from "./components/layout/pages/ProfilePage";
import PaymentPage from "./components/layout/pages/PaymentPage";
import { useEffect, useState } from "react";
import LogPages from "./components/layout/LogPages";
import RegPages from "./components/layout/RegPages";
import AdminDashboardUsers from "./components/layout/pages/AdminDashboardUsers";
import AdminDashboardPizza from "./components/layout/pages/AdminDashboardPizza";
import AdminDashboardOrders from "./components/layout/pages/AdminDashboardOrders";
import AdminDashboard from "./components/layout/pages/AdminDashboard";
import Protected from "./components/layout/Protected";
import Confirm from "./components/layout/pages/Confirm";
function App() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchPizzas();
    setLoading(true);
    setError(null);
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await fetch("http://localhost:5000/pizza");
      const data = await response.json();

      setLoading(false);
      setPizzas(data);
    } catch (error) {
      setError(error);
    }
  };

   // Remove from cart
   const handleRemoveFromCart = (id) => {
    setCart((prev) => {
      return prev.reduce((cal, item) => {
        if (item.id === id) {
          if (item.amount === 1) return cal;

          return [...cal, { ...item, amount: item.amount }];
        }

        return [...cal, { ...item }];
      }, []);
    });
  };

  return (
    <Router>
    
    
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
             <Navbar cart={cart} />
              <Welcome />
              <Menu pizzas={pizzas} loading={loading} error={error} setCart={setCart} />
              <AboutUs />
              <ContactUs />
            </>
          }
        ></Route>
        <Route path="/comingsoon" element={<CoomingSoon />}></Route>
        <Route path="/confirm" element={<Confirm />}></Route>
        <Route path="/profilepage" element={<><Protected><Navbar cart={cart} /><ProfilePage /></Protected></>}></Route>
        <Route path="/paymentpage" element={<><Navbar cart={cart} /><PaymentPage cart={cart}  setCart={setCart} handleRemoveFromCart={handleRemoveFromCart} /></>}></Route>
        <Route path="/login" element={<LogPages />}></Route>
        <Route path="/registration" element={<RegPages />}></Route>
        <Route path="/dashboard" element={  <><Protected><Navbar cart={cart} /><AdminDashboard /></Protected></>}></Route>
        <Route path="/dashboard_users" element={  <><Protected><Navbar cart={cart} /><AdminDashboardUsers /></Protected></>}></Route>
        <Route path="/dashboard_pizza" element={<><Protected><Navbar cart={cart} /><AdminDashboardPizza /></Protected></>}></Route>
        <Route path="/dashboard_orders" element={<><Protected><Navbar cart={cart} /><AdminDashboardOrders /></Protected></>}></Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
