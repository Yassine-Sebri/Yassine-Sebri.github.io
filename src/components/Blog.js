import { Link } from "react-router-dom";

const Writeups = () => {
  return (
    <div id="Writeups">
      2021-03-14 -{" "}
      <Link to="/Blog/Exploit-Education-Nebula-I" className="highlight">
        Exploit Education: Nebula - Part I
      </Link>
      <br />
      <br />
      2021-03-11 -{" "}
      <Link
        to="/Blog/Understanding-Docker-By-Writing-A-Custom-Container"
        className="highlight"
      >
        Understanding Docker By Writing A Custom Container
      </Link>
      <br />
      <br />
      2021-03-07 -{" "}
      <Link to="/Blog/Writing-A-Custom-Bootloader" className="highlight">
        Writing A Custom Bootloader
      </Link>
      <br />
      <br />
      2021-03-04 -{" "}
      <Link
        to="/Blog/Reverse-Engineering-Camera-Firmware"
        className="highlight"
      >
        Reverse-Engineering A Camera's Firmware
      </Link>
      <br />
      <br />
      2021-03-02 -{" "}
      <Link to="/Blog/Microcorruption-Hanoi" className="highlight">
        Microcorruption: Hanoi
      </Link>
      <br />
      <br />
      2021-03-01 -{" "}
      <Link to="/Blog/Microcorruption-Sydney" className="highlight">
        Microcorruption: Sydney
      </Link>
      <br />
      <br />
      2021-02-28 -{" "}
      <Link to="/Blog/Microcorruption-New-Orleans" className="highlight">
        Microcorruption: New Orleans
      </Link>
    </div>
  );
};

export default Writeups;
