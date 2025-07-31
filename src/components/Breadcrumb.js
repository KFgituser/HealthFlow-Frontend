
import { Link } from 'react-router-dom';
import '../styles/Breadcrumb.css';
const Breadcrumb = ({ items }) => {
  return (
    <nav className="breadcrumb-nav">
      {items.map((item, index) => (
        <span key={index}>
          {item.link ? (
            <Link to={item.link} className="breadcrumb-link">{item.label}</Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="breadcrumb-separator">›</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
