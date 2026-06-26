import {useHttp} from '../hooks/http.hook';

const REMOTE_API = 'https://api.spacexdata.com/v4';
const LOCAL_DATA = `${process.env.PUBLIC_URL}/data/ships.json`;

let shipsCache = null;

const _fetchJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }

  return response.json();
};

const useSpacexService = () => {
  const {process, setProcess, clearError} = useHttp();

  const _fetchShips = async () => {
    if (shipsCache) {
      return shipsCache;
    }

    setProcess('loading');

    try {
      shipsCache = await _fetchJson(`${REMOTE_API}/ships`);
    } catch {
      shipsCache = await _fetchJson(LOCAL_DATA);
    }

    return shipsCache;
  };

  const getAllShips = async () => {
    try {
      const res = await _fetchShips();
      return res.map(_transformShips);
    } catch (error) {
      setProcess('failure');
      throw error;
    }
  };

  const getShipById = async (shipId) => {
    try {
      const res = await _fetchShips();
      const ship = res.find((item) => (item.id || item.ship_id) === shipId);

      if (!ship) {
        throw new Error(`Ship not found: ${shipId}`);
      }

      return _transformShips(ship);
    } catch (error) {
      setProcess('failure');
      throw error;
    }
  };

  const getShipByName = async (shipName) => {
    try {
      const res = await _fetchShips();
      const ship = res.find((item) => {
        const name = item.name || item.ship_name;
        return name && name.toLowerCase() === shipName.toLowerCase();
      });

      if (!ship) {
        throw new Error(`Ship not found: ${shipName}`);
      }

      return _transformShips(ship);
    } catch (error) {
      setProcess('failure');
      throw error;
    }
  };

  const getShipsByPort = async (port) => {
    try {
      const res = await _fetchShips();
      return res
        .filter((item) => item.home_port === port)
        .map(_transformShips);
    } catch (error) {
      setProcess('failure');
      throw error;
    }
  };

  const getShipsByType = async (type) => {
    try {
      const res = await _fetchShips();
      return res
        .filter((item) => (item.type || item.ship_type) === type)
        .map(_transformShips);
    } catch (error) {
      setProcess('failure');
      throw error;
    }
  };

  const _transformShips = (ship) => {
    const missions = ship.missions
      ? ship.missions.map((item) => (typeof item === 'string' ? item : item.name))
      : (ship.launches || []);

    return {
      id: ship.id || ship.ship_id,
      name: ship.name || ship.ship_name,
      type: ship.type || ship.ship_type,
      port: ship.home_port,
      weight: ship.mass_kg ?? ship.weight_kg,
      year: ship.year_built,
      missions,
    };
  };

  return {process, setProcess, clearError, getAllShips, getShipsByPort, getShipsByType, getShipById, getShipByName};
};

export default useSpacexService;
