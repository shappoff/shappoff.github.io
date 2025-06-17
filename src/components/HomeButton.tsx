import React from "react";
import Button from '@mui/material/Button';

const HomeButton = ({absolute, variant}: any) => {
    return <Button
        variant={variant ? 'contained' : 'outlined'}
        size="small"
        href="/"
        sx={absolute ? {position: 'absolute', top: 0, left: 0, zIndex: 999} : {}}>
        Главная
    </Button>
}

export default HomeButton;
