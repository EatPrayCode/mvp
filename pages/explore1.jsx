import { ThreeCircles } from 'react-loader-spinner'
import useAuth from '../hooks/AuthContext'
// components
import { Player } from '@lottiefiles/react-lottie-player';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';

import { useRouter } from 'next/router';
import { withTranslation } from 'react-i18next';
import { DefaultLayout } from '../layouts';
import PacksCategories from '../components/PacksCategories'
import PreviewIcon from '@mui/icons-material/Preview';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const iframe = '<iframe height="265" style="width: 100%;" scrolling="no" title="fx." src="https://nconnect.vercel.app/neta2" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>';

function Iframe(props) {
    return (<div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }} />);
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ExplorePage = ({ t }) => {
    const { loading, user } = useAuth()
    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <ThreeCircles color="red" height={110} width={110} />
            </div>
        )
    }
    const router = useRouter();
    const GoToHome = () => {
        router.push(`/home`);
    };

    const packs = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},];

    let newsBody = packs.map((item, i) => {
        return (
            <option key={i} value={item}>
                {item}
            </option>
        );
    });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <DefaultLayout>
            <div role="main" className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-semibold leading-9 text-center ">Packs</h1>
                <h1 className="text-base leading-normal text-center dark:text-white mt-2 lg:w-1/2 md:w-10/12 w-11/12">All Packs</h1>
            </div>
            <PacksCategories />
            <h4 className="text-2xl font-semibold leading-9 mt-4">Money Saver</h4>
            <div>
                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                        <Iframe iframe={iframe} />
                    </Box>
                </Modal>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:mt-12 mt-4">
                {
                    packs.map(function (item, i) {
                        console.log(item);
                        return <div key={i} className="w-full h-64 flex flex-col justify-between dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                            <div>
                                <h4 className=" font-bold mb-3">13 things to work on 13 things to work on 13 things to work on </h4>
                                <p className=" text-sm">Our interior design experts work with you to create the space that you have been dreaming about. That you have been dreaming about.</p>
                            </div>
                            <div>
                                <div className="mb-3 mt-3 flex items-center">
                                    <div className="border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1 text-xs flex items-center" aria-label="due on" role="contentinfo">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alarm" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"></path>
                                            <circle cx="12" cy="13" r="7"></circle>
                                            <polyline points="12 10 12 13 14 13"></polyline>
                                            <line x1="7" y1="4" x2="4.25" y2="6"></line>
                                            <line x1="17" y1="4" x2="19.75" y2="6"></line>
                                        </svg>
                                        <p className="ml-2">#trending</p>
                                    </div>
                                    <div className="border border-gray-300 rounded-full px-3 py-1 text-xs flex items-center ml-2" aria-label="due on" role="contentinfo">
                                        <p className="ml-0">#justIn</p>
                                    </div>

                                    <div className="border border-gray-300 rounded-full px-3 py-1 text-xs flex items-center ml-2" aria-label="due on" role="contentinfo">
                                        <p className="ml-0">#national</p>
                                    </div>

                                </div>
                                <div className="flex items-center justify-between ">
                                    <p className="dark:text-gray-100 text-sm">March 28, 2020</p>

                                    <div className="flex items-center justify-between ">

                                        <button onClick={handleOpen} className="w-8 h-8 flex items-center justify-center" aria-label="save in starred items" role="button">
                                            <PreviewIcon />
                                        </button>

                                        <button className="w-8 h-8 flex items-center justify-center" aria-label="save in starred items" role="button">
                                            <BookmarkIcon />
                                        </button>

                                        <button onClick={() => window.open("https://in.mashable.com/tech/39681/samsung-galaxy-f23-5g-receives-41-price-cut-on-flipkart-available-at-just-rs-13999", "_blank")} className="w-8 h-8 rounded-full flex items-center justify-center" aria-label="edit note">
                                            <OpenInNewIcon />
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

        </DefaultLayout>
    )
}

export default withTranslation()(ExplorePage);
