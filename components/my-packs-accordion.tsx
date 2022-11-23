import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PacksListConcise from './packs-list-concise';

export default function MyPacksAccordion(props: any) {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const preferences = props.preferences;
    const userServices = preferences.userServices;
    const userGoods = preferences.userGoods;
    const userFinances = preferences.userFinances;
    const totalPcks = userServices.length + userGoods.length + userFinances.length;
    return (
        <div>
            <h2 className="mb-2 font-bold">My Packs ({totalPcks})</h2>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Goods</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        {userGoods.length} Packs
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PacksListConcise preferences={preferences} packType={'userGoods'} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Services
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        {userServices.length} Packs
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PacksListConcise preferences={preferences} packType={'userServices'} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Finances
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        {userFinances.length} Packs
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PacksListConcise preferences={preferences} packType={'userFinances'} />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
