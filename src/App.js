import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import SignUp from './signup';
import './App.css';
import { useState } from 'react';

function App() {
  const [userName , setUserName] = useState("")
  const [showAlert, setShowAlert] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp setLogin={setLogin} showAlert={showAlert} setShowAlert={setShowAlert}  setUserName={setUserName} userName={userName} />} />
          <Route path="/profile" element={<Home login={login} userName={userName}/>} />
          <Route path="/login" element={<Login setLogin={setLogin} showAlert={showAlert} setShowAlert={setShowAlert} setUserName={setUserName} userName={userName} />} />      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;