import React from 'react';
import { css } from '@stitches/react';
import View from '../../components/View/View';
import { StoreStateProvider } from '../../context/storeContext';
import Menu from '../Menu';
import PlayGround from '../PlayGround';
import { globalStyles } from './styles';

const styles = {
  container: css({
    display: 'flex',
    height: '100vh',
    width: '100vw',
  }),
}

function App() {
  globalStyles()
  return (
    <View classNames={styles.container()}>
      <StoreStateProvider>
        <PlayGround />
        <Menu />
      </StoreStateProvider>
    </View>
  );
}

export default App;
