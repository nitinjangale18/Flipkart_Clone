import Navbar from "./Navbar";
import Banner from "./Banner";
import {Box} from '@mui/material';
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import Slide from './Slide';
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";
import {getProducts} from "../../redux/actions/productActions"
const Home=()=>{

   const {products}= useSelector(state=>state.getProducts);

    const dispatch=useDispatch();

    

    useEffect(() => {
        console.log("Dispatching getProducts...");
        dispatch(getProducts());
    }, [dispatch]);
    
    return(
        <>
        <Navbar/>
        <Banner/>
        <MidSlide products={products}  />
        <Slide products={products}  title="Discounts for you"  timer={false}/>
        <MidSection/>
        <Slide products={products} title="Suggested items" timer={false}/>       
        <Slide products={products} title="Top selection" timer={false}/>
        <Slide products={products} title="Top deals" timer={false}/>
        <Slide products={products} title="Trending Offers" timer={false}/>

        </>
    )
}
export default Home;