const Footer = () => {
  return (
    <footer className="bg-light text-muted py-5">
      <div className="container">
        <ul className="list-inline text-center">
          <li className="list-inline-item">© Copright Shopping Website</li>
          <li className="list-inline-item">
            <a className="text-info" href="#">
              <i className="fa fa-facebook-square" aria-hidden="true"></i>{" "}
              Facebook
            </a>
          </li>
          <li className="list-inline-item">
            <a className="text-info" href="#">
              About Me
            </a>
          </li>
        </ul>
        <p className="text-center">Made with Bootstrap4</p>
      </div>
    </footer>
  );
};
export default Footer;
