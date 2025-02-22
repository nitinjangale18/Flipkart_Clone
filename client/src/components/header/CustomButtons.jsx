import { Box, Button, Typography, styled } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginDialog from "../../login/LoginDialog";
import React, { useState, useContext } from 'react';
import { LoginContext } from '../../context/ContextProvider';
import { Link } from "react-router-dom";
import Profile from "./Profile.jsx";


const Wrapper = styled(Box)`
  display: flex;
  align-items: center; 
  margin-left: auto;
  margin-right: 5%; 
  gap: 20px; 
`;

const Container = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px; 
  cursor: pointer;
  text-decoration:none;
  color:inherit;
`;

const LoginButton = styled(Button)`
  background-color: #fff;
  color: #2874f0;
  text-transform: none;
  padding: 5px 30px;
  border-radius: 2px;
  box-shadow: none;
  font-weight: 600;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const CustomButtons = () => {

  const [open,setOpen]=useState(false);
  const { account, setAccount } = useContext(LoginContext);

  const toggleDialog=()=>{
   setOpen(true);
  }

  const openDialog = () => {
    setOpen(true);
}


  return (
    <Wrapper>
     {
                account ? <Profile account={account} setAccount={setAccount} /> :
                    <LoginButton variant="contained" onClick={() => openDialog()}>Login</LoginButton>
                
    }

      <Typography style={{ cursor: "pointer" }}>Become a seller</Typography>

      <Typography style={{ cursor: "pointer" }}>More</Typography>

      <Container to='/cart'>
        <ShoppingCartIcon />
        <Typography>Cart</Typography>
      </Container>
     
      <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount}/>
    </Wrapper>
  );
};

export default CustomButtons;
