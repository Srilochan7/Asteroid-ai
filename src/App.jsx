import { useState } from 'react';
import './App.css';
import './index.css';

import Navbar from './components/comp/Navbar';
import Hero from './components/pages/Hero'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

export default App;
