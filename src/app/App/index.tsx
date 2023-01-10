import React from 'react';
import { StoreStateProvider } from '../../context/storeContext';
import Menu from '../Menu';
import PlayGround from '../PlayGround';

const style: React.CSSProperties = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
}

function App() {
  return (
    <div style={style}>
      <StoreStateProvider>
        <PlayGround />
        <Menu />
      </StoreStateProvider>
    </div>
  );
}

export default App;
