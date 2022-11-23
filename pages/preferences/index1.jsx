import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import PacksList from '../../components/packs-list';
import AccountSelect from '../../components/account';

import Head from 'next/head'
import requests from '../../Utils/requests'

import { ThreeCircles } from 'react-loader-spinner'
import useAuth from '../../hooks/AuthContext'

import useList from '../../hooks/useList'
import { mockGoodsList, mockServicesList, mockFinancesList } from 'mocks/mockpacks';
import PacksCategories from '../../components/PacksCategories';

const steps = [
    {
        label: 'Enter Basic Info',
        id: '0',
        description: 'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Choose Goods',
        id: '1',
        description: `Try out different ad text to see what brings in the most customers.`,
    },
    {
        label: 'Choose Services',
        id: '2',
        description: `For each ad campaign that you create, you can control how.`,
    },
    {
        label: 'Set Finances',
        id: '3',
        description: 'An ad group contains one or more ads which target a shared set of keywords.',
    },
];

const Preferences = ({
    netflixOriginals,
}) => {
    const { loading, user, updateUserPreferences } = useAuth();
    const list = useList(user?.uid)
    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <ThreeCircles color="red" height={110} width={110} />
            </div>
        )
    }
    const router = useRouter();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const [allPacksSelected, setAllPacksSelected] = React.useState(false);

    const [goodsList, setGoodsList] = React.useState([]);
    const [servicesList, setServicesList] = React.useState([]);
    const [financesList, setFinancesList] = React.useState([]);

    const ContinueToFeed = () => {
        router.push(`/home`);
    };

    React.useEffect(() => {
        if (netflixOriginals) {
            // const transformedList = netflixOriginals.map(ele => {
            //     return { ...ele, selected: true };
            // });
            // const temp1 = [...netflixOriginals];
            // setGoodsList(temp1);
        }

        // Assigning data (Mock or Real)
        const tempGoods = mockGoodsList;
        const tempServices = mockServicesList;
        const tempFinances = mockFinancesList;

        setGoodsList(tempGoods);
        setServicesList(tempServices);
        setFinancesList(tempFinances);
    }, [netflixOriginals]);

    const handleNext = () => {
        if (activeStep === maxSteps - 1) {
            console.log("Save data");
            const Preferences = {
                userGoods: goodsList,
                userServices: servicesList,
                userFinances: financesList,
                userAccount: {}
            };
            localStorage.setItem('mrshop', JSON.stringify(Preferences));
            ContinueToFeed();
            updateUserPreferences('', Preferences);
        }
        else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const goTo = (idx) => {
        setActiveStep((prevActiveStep) => idx);
    };

    const selectPack = (item) => {
        const stepId = steps[activeStep].packId;
        if (stepId === 1) {
            selectGood(item);
        }
        else if (stepId === 2) {
            selectService(item);
        }
        else if (stepId === 3) {
            selectFinance(item);
        }
    };

    const selectGood = (item) => {
        const newData = goodsList.map(ele => {
            if (item.packId === ele?.packId) {
                const packSelected = !ele.selected;
                return { ...ele, selected: packSelected };
            }
            else {
                return { ...ele };
            }
        });
        setGoodsList(newData);
    };

    const selectService = (item) => {
        const newData = servicesList.map(ele => {
            if (item.packId === ele?.packId) {
                const packSelected = !ele.selected;
                return { ...ele, selected: packSelected };
            }
            else {
                return { ...ele };
            }
        });
        setServicesList(newData);
    };

    const selectFinance = (item) => {
        const newData = financesList.map(ele => {
            if (item.packId === ele?.packId) {
                const packSelected = !ele.selected;
                return { ...ele, selected: packSelected };
            }
            else {
                return { ...ele };
            }
        });
        setFinancesList(newData);
    };

    const selectAllPacks = () => {
        console.log("Not Implemented");
    };

    return (
        // <AuthCheck>
        <React.Fragment>
            <div className="h-screen flex flex-col bg-blue-500">
                <div className=" p-2 mt-0">
                    <div className="w-full">
                        <ul className="flex flex-wrap border-b border-gray-200">
                            <li className="mr-2" onClick={e => { goTo(0) }}>
                                <a href="#" aria-current="page" className="inline-block bg-gray-100 text-blue-600 rounded-t-lg py-2 px-2 text-sm font-medium text-center active">Account</a>
                            </li>
                            <li className="mr-2" onClick={e => { goTo(1) }}>
                                <a href="#" className="inline-block text-white-500 hover:text-white-600 hover:bg-white-50 rounded-t-lg py-2 px-2 text-sm font-medium text-center">Goods</a>
                            </li>
                            <li className="mr-2" onClick={e => { goTo(2) }}>
                                <a href="#" className="inline-block text-white-500 hover:text-white-600 hover:bg-white-50 rounded-t-lg py-2 px-2 text-sm font-medium text-center">Services</a>
                            </li>
                            <li className="mr-2" onClick={e => { goTo(3) }}>
                                <a href="#" className="inline-block text-white-500 hover:text-white-600 hover:bg-white-50 rounded-t-lg py-2 px-2 text-sm font-medium text-center">Finances</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-grow flex flex-row overflow-hidden justify-center">
                    {/* <div className="flex-shrink-0 w-1/12 p-4">
                        Left menu
                    </div> */}
                    <div className="flex-1 flex flex-col bg-white">
                        <div className="border border-blue-900 p-2">
                            {/* <PacksCategories /> */}
                            {steps[activeStep].label}
                        </div>
                        <main className="flex-1 pt-2 overflow-y-auto">
                            <React.Fragment>
                                {activeStep == 0 && (
                                    <React.Fragment>
                                        {/* <div>Account</div> */}
                                        <AccountSelect />
                                    </React.Fragment>
                                )}
                                {activeStep == 1 && (
                                    <React.Fragment>
                                        {/* <div>Packs</div> */}
                                        <PacksList allPacks={goodsList} userPreferences={netflixOriginals} selectItem={selectGood} selectAll={selectAllPacks} />
                                    </React.Fragment>
                                )}
                                {activeStep == 2 && (
                                    <React.Fragment>
                                        {/* <div>Services</div> */}
                                        <PacksList allPacks={servicesList} userPreferences={netflixOriginals} selectItem={selectService} selectAll={selectAllPacks} />
                                    </React.Fragment>
                                )}
                                {activeStep == 3 && (
                                    <React.Fragment>
                                        {/* <div>Finances</div> */}
                                        <PacksList allPacks={financesList} userPreferences={netflixOriginals} selectItem={selectFinance} selectAll={selectAllPacks} />
                                    </React.Fragment>
                                )}

                            </React.Fragment>
                        </main>
                    </div>
                    {/* <div className="flex-shrink-0 w-1/12 p-4">
                        Right sidebar
                    </div> */}
                </div>

                <div className=''>
                    {activeStep != 0 && (
                        <React.Fragment>
                            <nav className="m-0 p-2 h-8">
                                <div className="container mx-auto ">
                                    <div className="relative flex items-center justify-between">
                                        <div className="ml-10 myfont text-left">Spending: 10000</div>
                                        <div className="text-right myfont">
                                            Earnings: 1000
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </React.Fragment>
                    )}

                    <nav className="m-0 p-2 h-16">
                        <div className="container mx-auto ">
                            <div className="relative flex items-center justify-between">

                                <button onClick={ContinueToFeed} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full rounded inline-flex items-center">
                                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                                    <span>Cancel</span>
                                </button>

                                <div className="text-right">
                                    <button onClick={handleBack} disabled={activeStep === 0} className="bg-orange-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded-full rounded inline-flex items-center">
                                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                                        <span>Back</span>
                                    </button>

                                    <button onClick={handleNext} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full rounded inline-flex items-center">
                                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                                        <span>{activeStep === maxSteps - 1 ? 'Finish' : 'Next'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </React.Fragment>
        // </AuthCheck>
    );
}

export default Preferences
