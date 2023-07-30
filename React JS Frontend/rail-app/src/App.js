import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import AddTrain from './pages/AddTrain';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import AdminUpdate from './pages/AdminUpdate';
import BookingForm from './pages/BookingForm';
import CancelTicket from './pages/CancelTicket';
import Contact from './pages/Contact';
import FinalTicket from './pages/FinalTicket';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Testing from './pages/Testing';
import TrainDetails from './pages/TrainDetails';
import UpdatePage from './pages/UpdatePage';
import UpdateTrain from './pages/UpdateTrain';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={<Homepage />} />
                  <Route exact path="/testPage/demo" element={<Testing />} />
                  <Route exact path="/profile" element={<Profile />} />
                  <Route exact path='/final-ticket' element={<FinalTicket/>}/>
                  <Route exact path="/about" element={<About/>} />
                  <Route exact path='/update' element={<UpdatePage/>} />
                  <Route exact path='/updateTrain' element={<UpdateTrain/>} />
                  <Route exact path='/addNewTrain' element={<AddTrain/>} />
                  <Route exact path="/login" element={<Login/>} />
                  <Route exact path='/adminLoginPage/22982/login' element={<AdminLogin/>} />
                  <Route exact path='/adminPanel' element={<AdminPanel/>}/>
                  <Route exact path='/adminPanel/update' element={<AdminUpdate/>}/>
                  <Route exact path="/payment/payfare" element={<Payment/>} />
                  <Route exact path="/signup" element={<Signup/>} />
                  <Route exact path="/contact" element={<Contact/>} />
                  <Route exact path="/book-ticket/fillForm/:train_id/:train_class/:date/:seats" element={<BookingForm/>} />
                  <Route exact path='/cancel-ticket' element={<CancelTicket/>} />
                  <Route exact path="/book-ticket/trainDetails" element={<TrainDetails/>} />
                  <Route exact path="*" element={<PageNotFound/>} />
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
