const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <img width="38" src="" alt="Pizza logo" />
          <div>
            <h1>React SushiShop</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </div>
        <div className="header__cart"></div>
      </div>
    </div>
  );
};

export default Header;
