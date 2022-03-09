import Helmet from "react-helmet"
import { useSearchParams } from 'react-router-dom';

import ErrorBoundary from '../components/errorBoudary/ErrorBoundary';
import ShipsList from "../components/shipsList/ShipsList";
import AppFilter from '../components/appFilter/AppFilter';
import { useEffect } from "react";

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get('name') || '';
  const typeValue = searchParams.get('type') || 'All';
  const portValue = searchParams.getAll('port') || '';

  useEffect(() => {
    if (searchParams.get('name') === "" && !searchParams.getAll('port').length && searchParams.get('type') === 'All') setSearchParams('')
  }, [searchParams])

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
            <ShipsList
              shipName={searchValue}
              selectedShipType={typeValue}
              selectedPorts={portValue}
              setSearchParams={setSearchParams}
              searchParams={searchParams}
            />
          </ErrorBoundary>
        </section>

        <aside className="filter">
          <h2 className="filter__header">Filters</h2>
          <AppFilter
            searchValue={searchValue}
            typeValue={typeValue}
            portValue={portValue}
            setSearchParams={setSearchParams}
          />
        </aside>
      </div>
    </>
  )
}

export default MainPage;