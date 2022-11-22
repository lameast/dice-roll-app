import React from 'react';
import Diceroller from './components/Diceroller';
import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';

const App = () => {

  return (
    <div id='App'>
      <Header/>
      <Diceroller/>
      <Footer/>
    </div>
  );
}

export default App;
