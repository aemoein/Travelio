// src/Components/Pagination/Pagination.js

import React from 'react';
import { Button, Box } from '@mui/material';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getButtonStyles = (page) => ({
        margin: 1,
        borderRadius: 10,
        fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' },
        textTransform: 'uppercase',
        fontFamily: 'Poppins',
        fontWeight: '700',
        border: currentPage === page ? '2px solid ' : '2px solid',
        backgroundImage: currentPage === page ? 'linear-gradient(to right, #6b778d, #ff6b6b)' : 'none',
        color: currentPage === page ? 'white' : '#A9A9A9',
        backgroundColor: currentPage === page ? 'transparent' : 'none',
        '&:hover': {
            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
            color: '#ffffff',
            border: 'none',
        },
    });

    const arrowButtonStyles = {
        color: '#A9A9A9',
        font: 'Poppins',
        border: '2px solid',
        borderRadius: 10,
        textTransform: 'none',
        fontWeight: '900',
        fontSize: '1.5vw',
        margin: 1,
        transition: 'background-image 0.8s, color 0.2s',
        '&:hover': {
            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
            color: '#ffffff',
            border: 'none',
        },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 4,
            }}
        >
            <Button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                sx={arrowButtonStyles}
            >
                <KeyboardDoubleArrowLeftOutlinedIcon />
            </Button>
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                sx={arrowButtonStyles}
            >
                <ArrowBackIosNewOutlinedIcon />
            </Button>
            {currentPage > 2 && (
                <Button
                    onClick={() => onPageChange(currentPage - 1)}
                    sx={getButtonStyles(currentPage - 1)}
                >
                    {currentPage - 1}
                </Button>
            )}
            <Button
                variant="contained"
                sx={getButtonStyles(currentPage)}
            >
                {currentPage}
            </Button>
            {currentPage < totalPages && (
                <Button
                    onClick={() => onPageChange(currentPage + 1)}
                    sx={getButtonStyles(currentPage + 1)}
                >
                    {currentPage + 1}
                </Button>
            )}
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                sx={arrowButtonStyles}
            >
                <ArrowForwardIosOutlinedIcon />
            </Button>
            <Button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                sx={arrowButtonStyles}
            >
                <KeyboardDoubleArrowRightOutlinedIcon />
            </Button>
        </Box>
    );
};

export default Pagination;