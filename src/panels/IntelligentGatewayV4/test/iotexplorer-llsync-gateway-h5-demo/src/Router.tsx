import { Routes, Route } from 'react-router-dom';
import { AddSubDevice } from './pages/AddSubDevice/AddSubDevice';
import { Index } from './pages/Index/Index';

export function Router() {
  return (
    <Routes>
      <Route path="/addSubDevice" element={<AddSubDevice />} />
      <Route element={<Index />} index />
    </Routes>
  );
}
