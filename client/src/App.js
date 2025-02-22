import './App.css';
import Header from "./components/header/Header"
import Home from './components/home/Home';

import {Box} from '@mui/material';
import ContextProvider from './context/ContextProvider';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import DetailView from './components/details/DetailView';
import Cart from "../src/components/cart/Cart";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
     <Header/>
     <Box style={{marginTop:54}}>
      <Routes>

     <Route path='/' element={<Home/>}/>
     <Route path='/products/:id' element={<DetailView/>}/>
     <Route path='/cart' element={<Cart/>}/>


     </Routes>

     </Box>
     </BrowserRouter>
     </ContextProvider>
  );
}

export default App;
