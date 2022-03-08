import { Link } from 'react-router-dom';

import './shipItem.scss';

const ShipItem = (props) => {
  const { id, name, port, type, onShipTypeSelected, onPortSelected } = props;

  return (
    <div className="item">
      <h2 className="item__title">
        <Link
          to={`/ship/${id}`}
          className="item__title-link">
          {name}
          <span className="item__title-icon"></span>
        </Link>
      </h2>
      <div className="item__descr">
        <div className="descr__item">
          <span>Type</span>
          <a href="#" onClick={() => onShipTypeSelected(type)}>{type}</a>
        </div>
        <div className="descr__item">
          <span>Port</span>
          <a href="#" onClick={() => onPortSelected([port])}>{port}</a>
        </div>
      </div>
    </div>
  )
}

export default ShipItem;