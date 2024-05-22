import './App.scss';
import { SSUMenu } from './components/Menu';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Search from './components/Search';
import NFTListing from './pages/NFTListing';

function App () {
    return (
        <div className='App'>
            <BrowserRouter>
                <SSUMenu />
                <Switch>
                    <Route exact path='/index2' component={Home} />
                    <Route exact path='/' component={Shop} />
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/Search' component={Search} />
                    <Route exact path='/nftListing' component={NFTListing} />
                    <Redirect to='/' />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;
