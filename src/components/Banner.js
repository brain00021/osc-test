const Banner = () => {
  return (
    <div
      className="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end"
      style={{
        height: 350,
        background: `url('https://www.savethestudent.org/uploads/sell-clothes-online-2.jpg') no-repeat center`,
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="p-3 bg-lighter">
          <h1 className="display-3 font-weight-bold">Welcome to Shopping</h1>
          <p className="lead">
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
