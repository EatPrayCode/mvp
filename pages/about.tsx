import Head from 'next/head'
import requests from '../Utils/requests'
import { Movie } from '../typings'
import { ThreeCircles } from 'react-loader-spinner'
import useAuth from '../hooks/AuthContext'
// import { modalState, movieState } from '../atoms/modalAtom'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import payments from '../lib/stripe'
// components
import useList from '../hooks/useList'
import DefaultLayout from '../layouts/DefaultLayout'
import BottomNavigationBar from '../Shared/BottomNavigation'
import ChipsArray from '../components/PacksCategories'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const About = () => {
    const { loading, user } = useAuth()
    const list = useList(user?.uid)

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <ThreeCircles color="red" height={110} width={110} />
            </div>
        )
    }
    return (
        <DefaultLayout>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
                </Container>
            </React.Fragment>
        </DefaultLayout >
    )
}

export default About
