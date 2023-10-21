import { useState, useEffect, useRef, useCallback } from 'react';

import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import Header from './Header/Header';
import FileSystem from './FileSystem/FileSystem';

import { theme } from './theme';
import { client, HOST } from './client';
import { Modal } from '@mui/material';

function App() {
  const firstLoad = useRef(true);
  const [dirs, setDirs] = useState([]);
  const [currentDir, setCurrentDir] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dirPath, setDirPath] = useState([]);

  const getDirPath = useCallback(async (code) => {
    const { data } = await client.get(`${HOST}/get_dir_path/${code}/`);
    setDirPath(data['path'])
  }, []);

  const updateNested = useCallback(async () => {
    client.get(`${HOST}/get_nested/${currentDir.code}/`).then(({ data }) => {
      setDirs(data['nested']);
      getDirPath(currentDir.code);
      setLoading(false);
    });
  }, [currentDir, getDirPath]);

  const changeCurrentDir = useCallback((name, code) => {
    setLoading(true);
    setCurrentDir({ name, code });
  }, []);

  const stepBack = useCallback(() => {
    if (dirPath.length > 1) {
      changeCurrentDir(dirPath[dirPath.length - 2].name, dirPath[dirPath.length - 2].code);
    }
  }, [changeCurrentDir, dirPath])

  useEffect(() => {
    if (currentDir) {
      updateNested();
    }
  }, [currentDir, updateNested])

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      client.get(`${HOST}/root_dir/`).then(({ data }) => {
        setCurrentDir({ name: data['name'], code: data['code'] });
      });
    };
  }, [firstLoad, updateNested]);

  return (
    <>
    <ThemeProvider theme={theme}>
    <Box>
      <Header currentDir={currentDir} refreshBody={updateNested} stepBack={stepBack} />

      {currentDir && <FileSystem currentDir={currentDir} dirPath={dirPath} dirs={dirs} changeDir={changeCurrentDir} />}
    </Box>
    </ThemeProvider>

    <Modal open={loading}><Box style={{ width: '100%', height: '100%' }}><CircularProgress style={{ position: 'absolute', left: '50%', top: '50%' }} /></Box></Modal>
    </>
  );
}

export default App;
