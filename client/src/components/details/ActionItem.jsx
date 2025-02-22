    import { useState } from 'react';

    import { Button, Box, styled } from '@mui/material';
    import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';
    import { payUsingPaytm } from '../../service/api';
    import { post } from '../../utils/paytm';
    import ProductDetail from './ProductDetail';
    import { useDispatch } from 'react-redux';
    import { addToCart } from '../../redux/actions/cartActions';

    const URL='http://localhost:8000'

    const LeftContainer = styled(Box)(({ theme }) => ({
        minWidth: '40%',
        padding: '40px 0 0 80px',
        [theme.breakpoints.down('md')]: {
            padding: '20px 40px'
        }
    }));

    const Image = styled('img')({
        padding: '15px 20px',
        border: '1px solid #f0f0f0',
        width: '100%' // Ensure it takes full width of its container
    });

    const StyledButton = styled(Button)`
        width: 46%;
        border-radius: 2px;
        height: 50px;
        color: #FFF;
    `;

    const ActionItem = ({ product }) => {
        const navigate = useNavigate();
        const { id } = product;
            
        const [quantity, setQuantity] = useState(1);
        const dispatch = useDispatch();


        const loadRazorpay = async () => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };



        const buyNow = async () => {
            try {
                console.log("🟢 Buy Now Button Clicked");
        
                // ✅ Step 1: Load Razorpay SDK
                const razorpayLoaded = await loadRazorpay();
                if (!razorpayLoaded) {
                    console.error("❌ Razorpay SDK failed to load. Check your internet connection.");
                    return;
                }
        
                // ✅ Step 2: Get API Key
                const RAZORPAY_KEY = process.env.RAZORPAY_KEY || "rzp_test_V3I3xCijmk7n0s";
                console.log("🔑 Razorpay Key:", RAZORPAY_KEY);
        
                // ✅ Step 3: Create Order via Backend
                const { data } = await axios.post(`${URL}/payment`, {
                    amount: 500,
                    currency: 'INR'
                });
        
                console.log("📥 API Response:", data);
        
                if (!data.success || !data.order || !data.order.id) {
                    console.error("❌ Failed to create order:", data.error);
                    return;
                }
        
                const { order } = data; 
                console.log("📌 Order Details from Backend:", order);
        
                // ✅ Step 4: Ensure Order ID Exists
                if (!order.id) {
                    console.error("❌ Order ID is missing! Cannot proceed.");
                    return;
                }
        
                // ✅ Step 5: Initialize Razorpay Options
                const options = {

                    key: process.env.RAZORPAY_KEY,  // Use dynamic key from .env
                    amount: order.amount,
                    currency: order.currency,
                    name: "xyz",
                    description: "Test Transaction",
                    image: "data:image/jpeg;base64,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",  // Replace with your logo
                    order_id: order.id, // Razorpay Order ID
                    handler: async function (response) {
                        console.log("✅ Payment Success Response:", response);
        
                        // ✅ Step 6: Verify Payment via Backend
                        try {
                            console.log("entered try block:");
                            const verifyRes = await axios.post(`${URL}/verify`, {
                                order_id: order.id,
                                payment_id: response.razorpay_payment_id,
                                signature: response.razorpay_signature,
                            });
        
                            console.log("🔍 Payment Verification Response:", verifyRes.data);
                            
                            if (verifyRes.data.success) {
                                alert("🎉 Payment Successful!");
                            } else {
                                alert("⚠️ Payment verification failed!");
                            }
                        } catch (error) {
                            console.error("❌ Payment Verification Failed:", error.response?.data || error.message);
                            alert("❌ Error verifying payment");
                        }
                    },
                    prefill: {
                        name: "John Doe",
                        email: "johndoe@example.com",
                        contact: "9999999999"
                    },
                    theme: {
                        color: "#3399cc"
                    }
                };
        
                console.log("🚀 Opening Razorpay Checkout...");
                const rzp = new window.Razorpay(options);
                rzp.open();
        
            } catch (error) {
                console.error("❌ API Error:", error.response?.data || error.message);
            }
        };
        
        
        const addItemToCart = () => {
            console.log("Adding to cart:", { id, quantity });  // Debugging
            dispatch(addToCart(id, quantity));
            navigate('/cart');
        };
        
        
        return (
            <LeftContainer>
                <Box sx={{ padding: '10px 50px', border: '1px solid #fefefe' }}>
                    <Image src={product.detailUrl} style={{ marginBottom: '15px' }} /><br />
                </Box>
                <StyledButton onClick={()=>addItemToCart()} style={{ marginRight: 10, background: '#ff9f00' }} variant="contained"><Cart />Add to Cart</StyledButton> 
                <StyledButton onClick={()=>buyNow()} style={{ background: '#fb641b' }} variant="contained"><Flash /> Buy Now</StyledButton> 
            </LeftContainer>
        );
    }

    export default ActionItem;


