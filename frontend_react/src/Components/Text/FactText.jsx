import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';

const FactText = ({ city, population }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            });
        }, { threshold: 1.0 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [isVisible]);

    const getFactText = (populationInt) => {
        if (populationInt > 1000000) {
            return `has a staggering ${population}`;
        } else if (populationInt > 100000) {
            return `is a vibrant community of ${population}`;
        } else if (populationInt > 50000) {
            return `is a bustling town with ${population}`;
        } else {
            return `is a charming city of ${population}`;
        }
    };

    const populationInt = parseInt(population.replace(/,/g, ''), 10);

    return (
        <Box>
            <div ref={ref}>
                <Typography variant="body1" component="div" sx={{ fontFamily: 'Poppins', fontSize: '3vw', fontWeight: "700" }}>
                    Did You know ?!{'     '}<br />
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                        <motion.span
                            initial={{ width: isVisible ? 'calc(100% + 10px)' : 0, background: 'linear-gradient(to right, #6365f1, #a655f6)' }}
                            animate={{ width: isVisible ? 'calc(100% + 10px)' : 0 }}
                            transition={{ duration: 1 }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '-5px',
                                height: '100%',
                                zIndex: -1,
                                borderRadius: '10px',
                            }}
                        />
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            style={{ fontWeight: 'bold', color: '#ffffff' }}
                        >
                            {' ' + city + ' ' + getFactText(populationInt)}
                        </motion.span>
                    </span>
                    {' '}residents!
                </Typography>
            </div>
        </Box>
    );
};

export default FactText;