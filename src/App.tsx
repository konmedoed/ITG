import './App.scss';
import Header from './components/header/header';

import photo from './assets/user.png';
import NavBlock from './components/nav/NavBlock';
import { TaskPage } from './components/task-page/TaskPage';

function App() {

  return (
    <>
      <Header userData={
        {
          src: photo,
          name: 'Максим Галактионов'
        }
      }/>
      <main className="main">
        <NavBlock/>
        <TaskPage/>
      </main>
    </>
  )
}

export default App
