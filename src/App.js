import Header from "./components/Header";
import Title from "./components/Title";
import Writer from "./components/Writer";
import Footer from "./components/Footer";
import Writeups from "./components/Blog";
import MCNO from "./components/Blog/MCNO";
import MCS from "./components/Blog/MCS";
import MCH from "./components/Blog/MCH";
import RECF from "./components/Blog/RECF";
import WCB from "./components/Blog/WCB";
import UDWCC from "./components/Blog/UDWCC";
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
          <Route path="/Blog" exact component={Writeups} />
          {/*------------------------------posts-----------------------------*/}
          <Route path="/Blog/Microcorruption-New-Orleans" component={MCNO} />
          <Route path="/Blog/Microcorruption-Sydney" component={MCS} />
          <Route path="/Blog/Microcorruption-Hanoi" component={MCH} />
          <Route
            path="/Blog/Reverse-Engineering-Camera-Firmware"
            component={RECF}
          />
          <Route path="/Blog/Writing-A-Custom-Bootloader" component={WCB} />
          <Route
            path="/Blog/Understanding-Docker-By-Writing-A-Custom-Container"
            component={UDWCC}
          />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
