import { HashRouter } from 'react-router-dom';
import { Router } from './Router';

import './App.css';

export function App() {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}
