import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
        <Header />
        
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/MemberHome" element={<MemberHome />} />
          <Route path="/AdminHome" element={<AdminHome />} />
        </Routes>
       <Footer />
      </Router>
  );
}

export default App;
