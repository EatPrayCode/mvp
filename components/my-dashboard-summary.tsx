import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PacksListConcise from './packs-list-concise';

export default function MyDashboardSummary() {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div className="flex flex-col">
            <h2 className="mb-2 text-2xl font-bold">My Dashboard</h2>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                <div className="flex items-start rounded-xl border bg-white p-4 shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                    </div>

                    <div className="ml-4">
                        <h2 className="font-semibold">1000 Earnings</h2>
                        <p className="mt-2 text-sm text-gray-500">4 Packs</p>
                    </div>
                </div>

                <div className="flex items-start rounded-xl border bg-white p-4 shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>

                    <div className="ml-4">
                        <h2 className="font-semibold">10000 Spending</h2>
                        <p className="mt-2 text-sm text-gray-500">4 Packs</p>
                    </div>
                </div>

            </div>

        </div>
    );
}
