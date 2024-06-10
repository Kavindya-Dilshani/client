import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './core/login/Login';
import SignUp from './core/signUp/SignUp';




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signUp' element={<SignUp/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
