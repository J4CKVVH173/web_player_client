import { Box, Typography } from "@mui/material";

import Path from './Path';
import Dir from './Dir';

const FileSystem = ({ currentDir, dirPath, dirs, changeDir }) => {
  return (
    <Box style={{ marginTop: 80 }}>
      <Path paths={dirPath} changeDir={changeDir} />
      <Typography variant="h5">
      {currentDir.name}
      </Typography>

      {dirs.map((dir) => <Dir {...dir} changeDir={changeDir} key={dir.code} />)}
    </Box>
  )
}

export default FileSystem;
