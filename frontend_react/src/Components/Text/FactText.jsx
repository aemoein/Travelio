import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';

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

    return (
        <div ref={ref}>
            <Typography variant="body1" component="div" sx={{ fontFamily: 'Poppins', fontSize: '3vw', fontWeight: "700" }}>
                Did You know{' '}
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
                        {' ' + city}
                    </motion.span>
                </span>
                {' '}Has a population of{' '}
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
                        transition={{ delay: 2, duration: 1 }}
                        style={{ fontWeight: 'bold', color: '#ffffff' }}
                    >
                        {' ' + population}
                    </motion.span>
                </span>
                {' '}!
            </Typography>
        </div>
    );
};

export default FactText;