import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Helmet from "react-helmet"

import useSpacexService from '../services/SpacexService';
import setContent from '../utils/setContent';

const ShipPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { process, setProcess, getShipById, clearError } = useSpacexService();

  useEffect(() => {
    onRequest();
  }, [id])

  const onRequest = () => {
    clearError();
    getShipById(id)
      .then(onDataLoaded)
      .then(() => setProcess('success'))
  }

  const onDataLoaded = (data) => {
    setData(data);
  }

  return (
    <section className='main__content'>
      <Link to="/" className="forward__link">
        <svg width="14" height="14" style={{ 'transform': 'rotate(180deg)', 'marginRight': '5px' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M4 13L16.17 13L10.58 18.59L12 20L20 12L12 4L10.59 5.41L16.17 11L4 11L4 13Z" fill="#2962FF" />
        </svg>
        Go back
      </Link>
      {setContent(process, View, data)}
    </section>
  )
}

const View = ({ data }) => {
  const { name, type, port, weight, year, missions } = data;

  const m = missions.length > 0 ? missions.map((item, idx) => {
    return (
      <a href="#" className='mission__link' key={idx}>{item}</a>
    )
  }) : '-';

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={`${name} - SpaceX Ship`}
        />
        <title>{name}</title>
      </Helmet>
      <div className="ship__block">
        <h1 className="ship__title">{name}</h1>
        <div className='ship__fields'>
          <div className="ship__field">
            <span>Type</span>
            {
              type ? <a href="#">{type}</a> : '-'
            }
          </div>
          <div className="ship__field">
            <span>Port</span>
            {
              port ? <a href="#">{port}</a> : '-'
            }
          </div>
          <div className="ship__field">
            <span>Weight</span>
            {
              weight ? <a href="#">{weight} кг</a> : '-'
            }
          </div>
          <div className="ship__field">
            <span>Year</span>
            {
              year ? <a href="#">{year}</a> : '-'
            }
          </div>
          <div className="ship__field">
            <span>Missions</span>
            <p>
              {m}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShipPage;