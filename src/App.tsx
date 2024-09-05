import { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import CreateArticle from './pages/create-article.page'
import ResultPage from './pages/result.page'

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route index element={<ResultPage />} />
          <Route path="/create" element={<CreateArticle />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
