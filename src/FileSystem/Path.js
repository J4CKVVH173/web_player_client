import './styles.css';


const Path = ({ paths, changeDir }) => {
  return (
    <span>{paths.map(({ name, code }) => <span key={code}><span className='path' onClick={() => changeDir(name, code)}>{name === 'root' ? '..' : name}</span>/</span>)}</span>
  )
};

export default Path;
