import './App.css';
import Downloads from './components/downloads/Downloads';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Statistics from './components/statistics/Statistics';
import StudentTable from './components/studentstable/StudentTable';
import StudentData from './StudentData';

function App() {
  return (
    <div className="App">
      <Header />
      <Downloads data={StudentData} />
      <StudentTable data={StudentData} />
      <Statistics />
      <Footer />
    </div>
  );
}

export default App;
