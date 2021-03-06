import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/" className="underline">
          /About
        </Link>
        <Link to="/Projects" className="underline">
          /Projects
        </Link>
        <Link to="/Blog" className="underline">
          /Blog
        </Link>
        <a href="mailto:yassine.sebri@enetcom.u-sfax.tn " className="underline">
          /Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
