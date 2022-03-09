import { useState } from 'react';

import './appFilter.scss';

const checkboxData = [
  { value: 'port-canaveral', label: 'Port Canaveral', checked: false },
  { value: 'port-of-los-angeles', label: 'Port of Los Angeles', checked: false },
  { value: 'fort-lauderdale', label: 'Fort Lauderdale', checked: false }
]

const radiosData = [
  { value: 'all', label: 'All' },
  { value: 'barge', label: 'Barge' },
  { value: 'cargo', label: 'Cargo' },
  { value: 'high-speed-craft', label: 'High Speed Craft' },
  { value: 'tug', label: 'Tug' },
];

const AppFilter = ({ searchValue, typeValue, portValue, setSearchParams }) => {
  const [stateSearch, setStateSearch] = useState(searchValue);
  const [stateType, setStateType] = useState(typeValue);
  const [statePort, setStatePort] = useState(portValue);

  const params = {
    name: stateSearch,
    type: stateType,
    port: statePort,
  };

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setStateSearch(value)
    params.name = value;
    setSearchParams(params);
  }

  const handleChangeType = (e) => {
    const value = e.target.id;
    setStateType(value)
    params.type = value;
    setSearchParams(params);
  }

  const handleChangePort = (e) => {
    const value = e.target.id;
    if (params.port.includes(value)) {
      const str = params.port.filter(item => item !== value)
      params.port = str
      setStatePort(str)
    } else {
      const str = [...params.port, value]
      params.port = str
      setStatePort(str)
    }
    setSearchParams(params);
  }

  return (
    <>
      <form autoComplete='off' onSubmit={(e) => e.preventDefault()}>
        <div className='input__container'>
          <input
            className="input__field"
            id="name"
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Name"
            value={stateSearch}
            onChange={handleChangeSearch}
          />
          <label className="input__label" htmlFor="name">Name</label>
          <span className="focus-border" />
        </div>

        <br />

        <Select data={checkboxData} handleChangePort={handleChangePort} statePort={statePort} setStatePort={setStatePort} />

        <br />
        <br />

        <h3 className='filter__title'>Type</h3>
        {
          radiosData.map(({ value, label }) => {
            return (
              <label
                key={value}
                htmlFor={label}
                className="radio__container"
              >
                <input
                  id={label}
                  name="type"
                  type="radio"
                  checked={stateType === label}
                  onChange={handleChangeType}
                />
                <span className="checkmark" />
                {label}
              </label>
            )
          })
        }
      </form>
    </>
  )
}

const Select = ({ data, statePort, setStatePort, handleChangePort }) => {

  const onToggleOpen = (event) => {
    const select = event.currentTarget;
    select.classList.toggle('open');
  }

  const onChangeSelect = (event) => {
    const select = event.currentTarget;
    const list = select.querySelector('.multiselect__options');
    const inputs = list.querySelectorAll("input[type='checkbox']:checked");
    const checkedInputs = Array.from(inputs).map(el => el.id);
    setStatePort(checkedInputs);
  }

  const options = data.map(({ value, label }) => {
    return (
      <label
        key={value}
        htmlFor={label}
        className="checkbox__container"
      >
        <input
          id={label}
          name="port"
          type="checkbox"
          checked={statePort.includes(label) ? true : false}
          onChange={handleChangePort} />
        <span className="checkmark" />
        {label}
      </label>
    )
  });

  return (
    <div className="multiselect__container" onClick={onToggleOpen} onChange={onChangeSelect}>
      <span className={`multiselect__placeholder ${statePort.length ? 'active' : ''}`}>Port</span>
      <span className="multiselect__selected" style={(statePort.length) ? { 'opacity': '1' } : { 'opacity': '0' }}>
        {
          statePort.length ? statePort.join(', ') : ''
        }
      </span>
      <span className="focus-border" />
      <div className="multiselect__list" onClick={(e) => e.stopPropagation()}>
        <ul className='multiselect__options'>
          {options}
        </ul>
      </div>
    </div>
  )
}

export default AppFilter;