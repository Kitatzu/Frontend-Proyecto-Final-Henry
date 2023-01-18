import React from 'react'
import { Box, Button } from "@mui/material"
import {Icon} from "@iconify/react"
import Switch from '@mui/material/Switch';
// import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

const Nav = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Box padding={"10px"} >
      <Box display={"flex"} justifyContent="space-between"  >
        <Box  >
         <Button startIcon={<Icon icon="mdi:marketplace-outline" />} >Market</Button>
        </Box>
        <Box display={"flex"} gap="20px" >
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Button variant='contained' sx={{borderRadius:"20px"}} >Login</Button>
          <Button variant='contained' sx={{borderRadius:"20px"}} color="secondary" >Register</Button>
          
        </Box>
      </Box>
    </Box>
  )
}

export default Nav;
