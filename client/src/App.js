import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

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
import Pedometer from "./pages/Pedometer"
import SoundTherapy from "./pages/SoundTherapy"
import QnA from "./pages/QnA"
import Thread from "./pages/Thread"

import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import NotFound from './layout/NotFound'
import ContactForm from './layout/ContactForm'
import AdminPage from "./pages/AdminPage"
import AddArticle from './components/admin/AddArticle'
import EditArticle from './components/admin/EditArticle'

import ScrollToTop from './layout/ScrollToTop'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <ScrollToTop />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/tools' component={Tools} />
        <Route exact path='/yoga' component={YogaTrainer} />
        <Route exact path='/articles' component={ArticleList} />
        <Route exact path='/footsteps' component={Pedometer} />
        <Route exact path='/sound-therapy' component={SoundTherapy} />
        <Route exact path='/articles/:slug/:id' component={ArticlePage} />
        <Route exact path='/qna' component={QnA} />
        <Route exact path='/qna/:id' component={Thread} />
        <Route exact path='/consultant-list' component={ConsultantList} />
        <Route exact path='/chat/:id' component={Chat} />
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
