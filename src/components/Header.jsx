import logo from '../assets/images/sushiLogo.svg';

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <img width="38" src={logo} alt="logo" />
          <div>
            <h1>React SushiShop</h1>
          </div>
        </div>
        <div className="header__cart"></div>
      </div>
    </div>
  );
};

export default Header;
