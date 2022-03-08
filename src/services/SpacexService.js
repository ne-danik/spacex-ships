import {useHttp} from '../hooks/http.hook';

const useSpacexService = () => {
  const {process, setProcess, request, clearError} = useHttp();

  const _apiBase = 'https://api.spacexdata.com/v3';

  const getAllShips = async () => {
    const res = await request(`${_apiBase}/ships`);
    return res.map(_transformShips);
  };

  const getShipById = async (shipId) => {
    const res = await request(`${_apiBase}/ships/${shipId}`)
    return _transformShips(res);
  };
  
  const getShipByName = async (shipName) => {
    const res = await request(`${_apiBase}/ships?ship_name=${shipName}`)
    return _transformShips(res);
  };

  const getShipsByPort = async (port) => {
    const res = await request(`${_apiBase}/ships?home_port=${port}`)
    return res.map(_transformShips);
  };

  const getShipsByType = async (type) => {
    const res = await request(`${_apiBase}/ships?ship_type=${type}`)
    return res.map(_transformShips);
  };

  const _transformShips = (ship) => {
    return {
      id: ship.ship_id,
      name: ship.ship_name,
      type: ship.ship_type,
      port: ship.home_port,
      weight: ship.weight_kg,
      year: ship.year_built,
      missions: ship.missions.map(item => item.name),
    }
  }

  return {process, setProcess, clearError, getAllShips, getShipsByPort, getShipsByType, getShipById, getShipByName}
}

export default useSpacexService;