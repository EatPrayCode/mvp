import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Avatar } from '@mui/material';

interface ChipData {
    key: number;
    label: string;
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function PacksListConcise(props: any) {

    const userServices = props.preferences.userServices;
    const userGoods = props.preferences.userGoods;
    const userFinances = props.preferences.userFinances;
    const packType = props.packType;
    const totalPcks = userServices + userGoods + userFinances;
    const chipData = props.preferences[packType] || [];
    const handleClick = (chipToDelete: ChipData) => () => {
        // setChipData((chips) =>
        //   chips.filter((chip) => chip.key !== chipToDelete.key),
        // );
    };
    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
            }}
            component="ul"
        >
            {chipData.map((data: any) => {
                let icon;
                if (data.label === '') {
                    icon = <TagFacesIcon />;
                }
                const url = data.imageUrl; //= `https://nextbootstrap.netlify.app/assets/images/profiles/3.jpg`;
                return (
                    <ListItem key={data.key}>
                        <Chip
                            avatar={<Avatar alt="Natacha" src={url} />}
                            label={data.title}
                            clickable
                            onClick={data.title === `` ? undefined : handleClick(data)}
                        />
                    </ListItem>
                );
            })}
        </Paper>
    );
}
