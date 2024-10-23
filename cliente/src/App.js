import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import fondoMovil from './assets/fondoMovil.jpg'; // Asegúrate de que la ruta sea correcta


function App() {
  return (
    <>
      {/* Fondo para tabletas y PC */}
      <div className="hidden md:bg-cover md:bg-center md:h-screen md:block" >
        <Header />
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* Fondo para dispositivos móviles */}
      <div className="bg-cover bg-center min-h-screen md:hidden" style={{ backgroundImage: `url('${fondoMovil}')` }}>
        <Header />
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

