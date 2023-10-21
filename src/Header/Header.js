import { memo, useState } from "react";

import AppBar from '@mui/material/AppBar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { client, HOST } from '../client';

const Header = ({ currentDir, refreshBody, stepBack }) => {
  const [openModal, setOpenModal ] = useState(false);
  const [newDirName, setNewDirName] = useState('');

  const createDir = async () => {
    await client.post(`${HOST}/add_dir/`, { name: newDirName, parent: currentDir.code });
    await refreshBody();
    setNewDirName('');
    setOpenModal(false);
  };

  return (
    <>
    <AppBar>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography variant="h4">
          Хранилище
        </Typography>

        <span>
          <IconButton onClick={stepBack}>
            <ExitToAppIcon style={{ color: 'black' }} />
          </IconButton>
          <IconButton onClick={() => setOpenModal(true)}>
            <AddCircleOutlineIcon style={{ color: 'black' }} />
          </IconButton>
        </span>
      </Toolbar>
    </AppBar>

    <Modal open={openModal} onClose={() => setOpenModal(false)} >
      <Box style={{ borderRadius: 10, width: '80%', height: '80%', background: 'white', padding: 10, position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
        <span>
        <TextField id="outlined-basic" label="Название" variant="outlined" value={newDirName} onChange={(event) => setNewDirName(event.target.value)} fullWidth />
        </span>
      <Button variant="contained" onClick={createDir}>Add</Button>
      </Box>
    </Modal>
    </>
  )
};

export default memo(Header);
