import React, { useState } from 'react';
import { Box, Container, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import quizData from '../../Components/Data/quiz.json';

const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(new Array(quizData.questions.length).fill(''));
    const [userAnswers, setUserAnswers] = useState([]);

    const navigate = useNavigate();

    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleBack = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleOptionChange = (event) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = event.target.value;
        setAnswers(newAnswers);
    };

    const handleFinish = () => {
        setUserAnswers(answers);
        axios.post('http://localhost:7777/users/auth/quiz', { answers: answers }, { withCredentials: true })
        .then(response => {
            console.log('Quiz submitted successfully:', response.data);
            navigate(`/preferences/recommended`, { state: response.data });
        })
        .catch(error => {
            console.error('Error submitting quiz:', error);
        });
    };

    const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;
    const currentQuestion = quizData.questions[currentQuestionIndex];

    return (
    <>
        <Box sx={{ width: '100vw', height: '100vh', backgroundImage: `url(${currentQuestion.image})`, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundPosition: 'center', backgroundSize: 'cover',}}>
            <Container maxWidth="sm" sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 3,
                padding: 3,
                height: 'fit-content',
            }}>
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: '900', fontSize: '30px'}}>{currentQuestion.category}</Typography>
                <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: '22px' }}>{currentQuestion.question}</Typography>
                <FormControl component="fieldset" sx={{width: '100%'}}>
                    <RadioGroup value={answers[currentQuestionIndex]} onChange={handleOptionChange}>
                        {currentQuestion.options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={option.value}
                                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: '20px' } }} />}
                                label={<Typography sx={{ fontFamily: 'Poppins', fontWeight: '300', fontSize: '20px' }}>{option.option}</Typography>}
                                sx={{ mb: -0.5, ml: 0 }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Box sx={{ width: 'fit-content' }}>
                        <Button onClick={handleBack} disabled={currentQuestionIndex === 0}>
                            <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Back</Typography>
                        </Button>
                        <Button onClick={handleNext} disabled={!answers[currentQuestionIndex] || isLastQuestion} sx={{ml: 2}}>
                            <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px'}}>
                                {!isLastQuestion && 'Next'}
                            </Typography>
                        </Button>
                    </Box>
                    {isLastQuestion && (
                        <Button onClick={handleFinish}>
                        <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Finish</Typography>
                        </Button>
                    )}
                </Box>
            </Container>
        </Box>
    </>
    );
};

export default Quiz;