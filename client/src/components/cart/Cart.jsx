import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Typography, styled, Button } from "@mui/material";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import CartItem from "./CartItem";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";
import axios from "axios";

const URL = "http://localhost:8000";

const Container = styled(Box)`
    padding: 30px 135px;
    padding-bottom: 100px; /* Added padding to prevent overlap */
`;

const Header = styled(Box)`
    padding: 15px 24px;
    font-size: 18px;
    font-weight: bold;
`;

const ButtonWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    position: sticky;
    bottom: 0;
    z-index: 1000; /* Ensures it stays on top */
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    width: 250px;
    height: 51px;
    border-radius: 10px;
    color: #fff;
    &:hover {
        background: #ff5722; /* Slightly darker on hover */
    }
`;

const Cart = () => {
    const { cartItems } = useSelector(state => state.cart);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (cartItems && id !== cartItems.id)
            dispatch(addToCart(id));
    }, [dispatch, cartItems, id]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const loadRazorpay = async () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const placeOrder = async () => {
        try {
            console.log("🟢 Place Order Button Clicked");

            const razorpayLoaded = await loadRazorpay();
            if (!razorpayLoaded) {
                console.error("❌ Razorpay SDK failed to load.");
                return;
            }

            const { data } = await axios.post(`${URL}/payment`, {
                amount: 500,
                currency: "INR"
            });

            if (!data.success || !data.order || !data.order.id) {
                console.error("❌ Failed to create order:", data.error);
                return;
            }

            const options = {
                key: process.env.RAZORPAY_KEY || "rzp_test_V3I3xCijmk7n0s",
                amount: data.order.amount,
                currency: data.order.currency,
                name: "XYZ Store",
                description: "Purchase from Cart",
                order_id: data.order.id,
                handler: function (response) {
                    console.log("Payment Successful:", response);
                    navigate("/order-success");
                },
                prefill: {
                    name: "John Doe",
                    email: "john@example.com",
                    contact: "9876543210",
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("❌ Payment Error:", error);
        }
    };

    return (
        <>
            {cartItems.length > 0 ? (
                <Grid container>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                        <Container>
                            <Header>My cart ({cartItems.length})</Header>
                            {cartItems.map(item => (
                                <CartItem key={item.id} item={item} removeItemFromCart={removeItemFromCart} />
                            ))}
                        </Container>
                        <ButtonWrapper>
                            <StyledButton onClick={placeOrder}>
                                Place Order
                            </StyledButton>
                        </ButtonWrapper>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <TotalView cartItems={cartItems} />
                    </Grid>
                </Grid>
            ) : (
                <EmptyCart />
            )}
        </>
    );
};

export default Cart;
