import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Avatar } from '@mui/material';

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled(`li`)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function PacksCategories() {
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: `For you` },
    { key: 1, label: `India Trending` },
    { key: 2, label: `Twitter Trending` },
    { key: 3, label: `UP` },
    { key: 4, label: `Karnataka` },
    { key: 5, label: `Kerala` },
    { key: 6, label: `Maharastra` },
    { key: 7, label: `Telangana` },
    { key: 8, label: `AP` },
    { key: 9, label: `TN` },
    { key: 10, label: `MP` },
    { key: 11, label: `HP` },
    { key: 12, label: `Assam` },
    { key: 13, label: `WB` },
    { key: 14, label: `Top Curated` },
  ]);

  const handleClick = (chipToDelete: ChipData) => () => {
    // setChipData((chips) =>
    //   chips.filter((chip) => chip.key !== chipToDelete.key),
    // );
  };
  return (
    <Box
      sx={{
        display: `flex`,
        justifyContent: `flex-start`,
        flexWrap: `none`,
        listStyle: `none`,
        p: 0.5,
        m: 0,
        overflowY: `scroll`,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;
        if (data.label === `React`) {
          icon = <TagFacesIcon />;
        }
        const url = `https://nextbootstrap.netlify.app/assets/images/profiles/3.jpg`;
        return (
          <ListItem key={data.key}>
            <Chip
              avatar={<Avatar alt="Natacha" src={url} />}
              label={data.label}
              clickable
              onClick={data.label === `React` ? undefined : handleClick(data)}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}
