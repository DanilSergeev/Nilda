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
import { useEffect, useState } from 'react';
import { useAppDispatch } from './hooks/redux';
import axios from 'axios';
import { authSlice } from './store/reducers/AuthSlice';

function App() {
  const dispatch = useAppDispatch()
  const { checkAuth } = authSlice.actions

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      (async () => {
        if (localStorage.getItem("token")) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, { withCredentials: true })
          dispatch(checkAuth(response.data))
        }
      })()
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }, [dispatch, checkAuth])

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/aboutUs' element={<AboutUsPage />} />
        <Route path='/ideas' element={<IdeasPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/itemsById/:categoryId/id/:id' element={<HeroesOrItemsPage />} />
        <Route path='*' element={<NotFoundPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
