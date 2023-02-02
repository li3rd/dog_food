import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
function App() {
  return (
    <div className="App">
      <Header />
      <div className={classNames('container')}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
