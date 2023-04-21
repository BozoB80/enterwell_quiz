import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Quizzes from './pages/Quizzes'
import NewQuiz from './pages/Quizzes/NewQuiz'
import EditQuiz from './pages/Quizzes/EditQuiz'
import StartQuiz from './pages/Quizzes/StartQuiz'
import StartQuiz2 from './pages/Quizzes/StartQuiz2'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/quizzes' element={<Quizzes />} />
          <Route path='/quizzes/newquiz' element={<NewQuiz />} />
          <Route path='/quizzes/editquiz/:id' element={<EditQuiz />} />
          <Route path='/quizzes/startquiz/:id' element={<StartQuiz2 />} />
        </Route>
      </Routes>      
    </BrowserRouter>
  )
}

export default App
