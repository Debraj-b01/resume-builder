import React, { useEffect } from 'react';
import { Box, Button, Container, Typography, Grid, Card, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { updateEducation } from '../redux/educationSlice';
import { updateProfile } from '../redux/profileSlice';
import { updateProject } from '../redux/projectSlice';
import { updateExperience } from '../redux/experienceSlice';
import axios from 'axios';
import { BASE_URL } from '../api';
import { updateAchievements, updateExtraCoCurricular, updateSkills } from '../redux/extraDetailsSlice';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1e88e5',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#f4f6f8',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#4f4f4f',
        },
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
    },
});

export default function LandingPage() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getAllResumeData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/data/get-all-resume-data?id=${currentUser._id}`, {
                headers: {
                    authorization: currentUser.token,
                },
            });

            const resumeData = response.data.resumeData[0];
            if (resumeData) {
                dispatch(updateProfile(resumeData.profile));
                dispatch(updateEducation(resumeData.education[0]));
                resumeData.projects.forEach((project, index) => {
                    Object.keys(project).forEach(field => {
                        dispatch(updateProject({ index, field, value: project[field] }));
                    });
                });
                resumeData.experience.forEach((experience, index) => {
                    Object.keys(experience).forEach(field => {
                        dispatch(updateExperience({ index, field, value: experience[field] }));
                    });
                });
                const { skills, achievements, extraCoCurricular } = resumeData.extraDetails;
                Object.keys(skills).forEach((type) => {
                    skills[type].forEach((skill, index) => {
                        dispatch(updateSkills({ type, index, value: skill }));
                    });
                });
                achievements.forEach((achievement, index) => {
                    dispatch(updateAchievements({ index, value: achievement }));
                });
                extraCoCurricular.forEach((activity, index) => {
                    dispatch(updateExtraCoCurricular({ index, value: activity }));
                });
            }
        } catch (error) {
            console.error("Error in getAllResumeData:", error);
        }
    };

    useEffect(() => {
        getAllResumeData();
    }, []);

    const handleGetStarted = () => {
        navigate('/profile');
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ background: 'linear-gradient(135deg, #f3f4f6, #e2e8f0)', minHeight: '100vh', py: 8 }}>
                <Container maxWidth="lg">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
                            Design Your Dream Resume
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <Typography variant="h6" sx={{ mb: 6, textAlign: 'center', color: 'text.secondary' }}>
                            A sleek and modern resume builder tailored for professionals
                        </Typography>
                    </motion.div>

                    <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
                        {[img1, img2, img3].map((img, i) => (
                            <Grid item xs={12} sm={6} md={4} key={i}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.2 }}
                                >
                                    <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
                                        <CardMedia component="img" height="240" image={img} alt={`Preview ${i + 1}`} />
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Button
                            onClick={handleGetStarted}
                            variant="contained"
                            sx={{
                                px: 5,
                                py: 1.5,
                                fontSize: '1rem',
                                borderRadius: '50px',
                                background: 'linear-gradient(135deg, #1e88e5, #42a5f5)',
                                color: '#fff',
                                fontWeight: 600,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1565c0, #1e88e5)',
                                }
                            }}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
