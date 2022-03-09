import { Link } from 'react-router-dom';

import './shipItem.scss';

const ShipItem = (props) => {
  const { id, name, port, type, } = props;
  
  return (
    <div className="item">
      <h2 className="item__title">
        <Link
          to={`/ship/${id}`}
          state={{ from: window.location.search }}
          className="item__title-link"
        >
          {name}
          <span className="item__title-icon"></span>
        </Link>
      </h2>
      <div className="item__descr">
        <div className="descr__item">
          <span>Type</span>
          {type}
        </div>
        <div className="descr__item">
          <span>Port</span>
          {port}
        </div>
      </div>
    </div>
  )
}

export default ShipItem;