import { useState } from 'react';
import { Typography, Menu, MenuItem, Box, styled } from '@mui/material';
import { PowerSettingsNew } from '@mui/icons-material';

const Component = styled(Menu)`
    margin-top: 5px;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`;

const Profile = ({ account, setAccount }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget); // ✅ Opens menu at clicked position
    };

    const handleClose = () => {
        setAnchorEl(null); // ✅ Closes menu
    };

    const logout = () => {
        setAccount(''); // ✅ Clears account state
        handleClose();  // ✅ Closes menu after logout
    };
    
    return (
        <>
            {/* Profile Name - Click to Open Menu */}
            <Box onClick={handleClick} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mt: 0.5 }}>{account}</Typography>
            </Box>

            {/* Dropdown Menu */}
            <Component
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={logout}>
                    <PowerSettingsNew fontSize="small" color="primary"/> 
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </>
    );
}

export default Profile;
