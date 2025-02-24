import './App.scss';
import Header from './components/header/header';
import NavBlock from './components/nav/NavBlock';
import { FormPage } from './components/form-page/FormPage';
import { taskData, userData } from './data-plug';

function App() {

  return (
    <>
      <Header userData={userData}/>
      <main className="main">
        <NavBlock/>
        <FormPage taskData={taskData()}/>
      </main>
    </>
  )
}

export default App
