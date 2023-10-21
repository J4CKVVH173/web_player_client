import './styles.css';

import Icon from './img/dir.svg';
import SVG from 'react-inlinesvg';
import { Typography } from '@mui/material';

const Dir = ({ name, updated, code, changeDir }) => {
  return (
    <div className='dir' onDoubleClick={() => changeDir(name, code)}>
      <span className='name'>
      <SVG src={Icon} className='icon' />
      <Typography component='span'>{name}</Typography>
      </span>
      <Typography component='span'>{new Date(updated).toLocaleString()}</Typography>
    </div>
  )
}

export default Dir;
