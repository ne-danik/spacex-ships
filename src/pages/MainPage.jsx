import { useState } from 'react';
import Helmet from "react-helmet"

import ErrorBoundary from '../components/errorBoudary/ErrorBoundary';
import ShipsList from "../components/shipsList/ShipsList";
import AppFilter from '../components/appFilter/AppFilter';

const MainPage = () => {
  const [selectedShipName, setSelectedShipName] = useState('');
  const [selectedShipType, setSelectedShipType] = useState('All');
  const [selectedPorts, setSelectedPorts] = useState([]);

  const onShipTypeSelected = (shipType) => {
    setSelectedShipType(shipType);
  }

  const onShipNameSelected = (shipName) => {
    setSelectedShipName(shipName);
  }

  const onPortSelected = (port) => {
    setSelectedPorts(port);
  }

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="SpaceX Ships"
        />
        <title>SpaceX Ships</title>
      </Helmet>
      <div className='main__page'>
        <section className='main__content'>
          <h1 className="section__title">SpaceX Ships</h1>
          <ErrorBoundary>
            <ShipsList selectedPorts={selectedPorts} onPortSelected={onPortSelected} selectedShipType={selectedShipType} onShipTypeSelected={onShipTypeSelected} shipName={selectedShipName} />
          </ErrorBoundary>
        </section>

        <aside className="filter">
          <h2 className="filter__header">Filters</h2>
          <AppFilter selectedPorts={selectedPorts} onPortSelected={onPortSelected} selectedShipType={selectedShipType} onShipTypeSelected={onShipTypeSelected} onShipNameSelected={onShipNameSelected} />
        </aside>
      </div>
    </>
  )
}

export default MainPage;