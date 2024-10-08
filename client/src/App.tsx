import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import HeroesOrItemsPage from './pages/HeroesOrItemsPage';
import NotFoundPage from './pages/NotFoundPage';
import IdeasPage from './pages/IdeasPage';
import AuthPage from './pages/Authorization/AuthPage';
import RegisterPage from './pages/Authorization/RegisterPage';

function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/aboutUs' element={<AboutUsPage/>}/>
        <Route path='/ideas' element={<IdeasPage/>}/>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/itemsById/:categoryId/id/:id' element={<HeroesOrItemsPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>

      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;
