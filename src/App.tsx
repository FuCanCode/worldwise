import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";

// dist/index.html                   0.45 kB │ gzip:   0.29 kB
// dist/assets/index-b50fff57.css   30.46 kB │ gzip:   5.11 kB
// dist/assets/index-674e9245.js   509.49 kB │ gzip: 148.93 kB

const Homepage = lazy(()=> import("./pages/Homepage"));
const Pricing = lazy(()=> import("./pages/Pricing"));
const Product = lazy(()=> import("./pages/Product"));
const PageNotFound = lazy(()=> import("./pages/PageNotFound"));
const Login = lazy(()=> import("./pages/Login"));
const AppLayout = lazy(()=> import("./pages/AppLayout"));

// dist/index.html                           0.45 kB │ gzip:   0.29 kB
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/Homepage-9e31ecd2.css         0.49 kB │ gzip:   0.31 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-a9e6818a.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-dc87dad8.css           26.71 kB │ gzip:   4.36 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-6c6e8cde.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-7f9f8d43.js              0.22 kB │ gzip:   0.20 kB
// dist/assets/PageNav-0d18421d.js           0.54 kB │ gzip:   0.32 kB
// dist/assets/Pricing-80482911.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-bb6af440.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-f252a650.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-34aba7f4.js             1.05 kB │ gzip:   0.56 kB
// dist/assets/AppLayout-b7abad9d.js       157.04 kB │ gzip:  46.26 kB
// dist/assets/index-72640ab5.js           350.64 kB │ gzip: 102.16 kB

import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import { CitiesContextProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <CitiesContextProvider>
              <Suspense fallback={<SpinnerFullPage/>} >
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/product" element={<Product />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                
                <Route
                  index
                  element={<Navigate replace={true} to="cities" />}
                />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
              </Suspense>
          </CitiesContextProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
