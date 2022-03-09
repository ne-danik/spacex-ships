import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useSpacexService from '../../services/SpacexService';
import setContent from '../../utils/setContent';

import ShipItem from '../shipItem/ShipItem';

import './shipsList.scss';

const ShipsList = (props) => {
  const [shipsList, setShipsList] = useState([]);
  const [sortedShipsList, setSortedShipsList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const { process, setProcess, getAllShips, clearError } = useSpacexService();

  // Делаем запрос на получение данных при первом рендере
  // и в зависимости от изменения состояния в пропсах
  useEffect(() => {
    onRequest(props.selectedShipType, props.selectedPorts, props.shipName);
  }, [props.selectedShipType, props.selectedPorts, props.shipName])

  // Делаем запрос на получение всех данных, 
  // делаем копию полученных данных,
  // делаем фильтрацию по переданным аргументам,
  // устанавливаем отфильтрованные данные в state,
  // запускаем функцию по рендеру данных на странице с передачей offset,
  // меняем состояние процесса
  const onRequest = (shipType, selectedPorts, shipName) => {
    getAllShips()
      .then(data => {
        let arr = JSON.parse(JSON.stringify(data));

        if (shipType) {
          clearError();
          arr = filterByType(arr, shipType)
        }
        if (selectedPorts.length > 0) {
          clearError();
          arr = filterByPort(arr, selectedPorts)
        }
        if (shipName.length > 0) {
          clearError();
          arr = filterByName(arr, shipName)
        }

        setSortedShipsList(arr);
        onCurrentShipsListLoaded(arr, 0);
      })
      .then(() => setProcess('success'))
  }

  // Функция фильтрации по имени
  const filterByName = (data, shipName) => {
    const reg = new RegExp(shipName, 'ig')
    setOffset(0);
    setCurrentPage(1);
    return data.filter(item => item.name.match(reg))
  }

  // Функция фильтрации по типу
  const filterByType = (data, type) => {
    setOffset(0);
    setCurrentPage(1);
    return data.filter(item => item.type === type || 'All' === type)
  }

  // Функция фильтрации по порту
  const filterByPort = (data, ports) => {
    setOffset(0);
    setCurrentPage(1);
    return data.filter(item => ports.includes(item.port) ? item : null)
  }

  // Функция делает выборку данных по offset
  const onCurrentShipsListLoaded = (data, offset) => {
    const arr = [];
    for (let i = offset; i < (offset + limit) && i < data.length; i++) {
      arr.push(data[i])
    }
    setShipsList(arr);
  }

  const onMoveToPage = (offset) => {
    onCurrentShipsListLoaded(sortedShipsList, offset)
  }

  const nextPage = () => {
    if (shipsList.length < 5) return
    onMoveToPage(offset + limit);
    setOffset(offset + limit);
    setCurrentPage(currentPage + 1);
  }

  const prevPage = () => {
    if (offset <= 0) return
    onMoveToPage(offset - limit)
    setOffset(offset - limit)
    setCurrentPage(currentPage - 1)
  }

  function renderShipsList(arr) {
    const elements = arr.map((item, idx) => {
      return (
        <ShipItem setSearchParams={props.setSearchParams} searchParams={props.searchParams} typeValue={props.selectedShipType}  portValue={props.selectedPorts} key={idx} {...item} />
      )
    });

    return (
      <div className="items">
        {elements.length > 0 ? elements : 'No results... :('}
      </div>
    )
  }

  return (
    <>
      {setContent(process, () => renderShipsList(shipsList), shipsList)}
      <div className="pagination">
        <button
          className="prev"
          style={offset <= 0 ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
          onClick={prevPage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill={offset <= 0 ? '#3C474C' : '#347CFF'} />
          </svg>
        </button>
        <span>{currentPage}</span>
        <button
          className="next"
          style={shipsList.length < 5 ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}
          onClick={nextPage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill={shipsList.length < 5 ? '#3C474C' : '#347CFF'} />
          </svg>
        </button>
      </div>
    </>
  )
}

ShipsList.propTypes = {
  shipName: PropTypes.string,
  selectedShipType: PropTypes.string,
  selectedPorts: PropTypes.array,
}

export default ShipsList;