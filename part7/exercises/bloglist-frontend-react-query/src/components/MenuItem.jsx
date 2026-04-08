import { Link } from "react-router-dom";
import "./../index.css";

const MenuItem = ({ linkPath, label, icon, children }) => {
  const contentInner = (
    <div className="menu-content">
      {icon && <img src={icon} className="menu-icon" alt="" />}
      {label && <span>{label}</span>}
      {children}
    </div>
  );

  return (
    <div className="menu-item">
      {linkPath ? (
        <div className="menu-button">
          <Link to={linkPath}>{contentInner}</Link>
        </div>
      ) : (
        <div className="menu-button">{contentInner}</div>
      )}
    </div>
  );
};

export default MenuItem;
