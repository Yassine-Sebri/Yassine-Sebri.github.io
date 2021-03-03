import Header from "./components/Header";
import Title from "./components/Title";
import Writer from "./components/Writer";
import Footer from "./components/Footer";
import Writeups from "./components/Writeups";
import MCNO from "./components/Writeups/MCNO";
import MCS from "./components/Writeups/MCS";
import MCH from "./components/Writeups/MCH";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div id="container">
          <Header />
          <Title />
          <Route
            path="/"
            exact
            render={(props) => (
              <span id="type">
                <Writer />
              </span>
            )}
          />
          <Route path="/Writeups" exact component={Writeups} />
          <Route
            path="/Writeups/Microcorruption-New-Orleans"
            component={MCNO}
          />
          <Route path="/Writeups/Microcorruption-Sydney" component={MCS} />
          <Route path="/Writeups/Microcorruption-Hanoi" component={MCH} />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
