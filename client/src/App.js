import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import './App.css'

import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tools from './pages/Tools'
import YogaTrainer from './pages/YogaTrainer'
import ArticleList from './pages/ArticleList'
import ArticlePage from './pages/ArticlePage'
import ConsultantList from './pages/ConsultantList'
import Chat from './pages/Chat'

import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import NotFound from './layout/NotFound'
import ContactForm from './layout/ContactForm'
import AdminPage from "./pages/AdminPage"
import AddArticle from './components/admin/AddArticle'
import EditArticle from './components/admin/EditArticle'

function App() {
  return (
    <div className="App">
          <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/tools' component={Tools} />
        <Route exact path='/trainer' component={YogaTrainer} />
        <Route exact path='/articles' component={ArticleList} />
        <Route exact path='/articles/:slug/:id' component={ArticlePage} />
        <Route exact path='/consultant-list' component={ConsultantList} />
        <Route exact path='/chat' component={Chat} />
        <Route exact path='/admin' component={AdminPage} />
        <Route exact path='/admin/article/new' component={AddArticle} />
        <Route exact path='/admin/article/edit/:id' component={EditArticle} />
        <Route component={NotFound} />
      </Switch>
      <ContactForm />
      <Footer />
    </Router>
    </div>
  );
}

export default App;
