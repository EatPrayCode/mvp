import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useRouter } from 'next/router'

const LinkTab = (props) => {
    const router = useRouter()
    const handleTabChange = (e) => {
        e.preventDefault()
        router.push(e.target.href)
    }
    return (
        <Tab
            component='a'
            onClick={e => handleTabChange(e)}
            {...props} />
    )
}

const NavTabs = () => {
    const pages = ['/preferences/', '/preferences/Packs', '/preferences/Services', '/preferences/Finances'];
    const router = useRouter();
    const [value, setValue] = React.useState(pages.indexOf(router.route));

    const handleChange = (e, v) => {
        setValue(v)
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={(e, v) => handleChange(e, v)} centered>
                {/* <LinkTab label='Home' href={pages[0]} /> */}
                <LinkTab label='Account' href={pages[0]} />
                <LinkTab label='Packs' href={pages[1]} />
                <LinkTab label='Services' href={pages[2]} />
                <LinkTab label='Finances' href={pages[3]} />
            </Tabs>
        </Box>
    );
}

export default NavTabs;
