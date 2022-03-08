import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

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

const AppFilter = (props) => {
  
  return (
    <>
      <form autoComplete='off'>
        <div className='input__container'>
          <input
            className="input__field"
            id="name"
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Name"
            onChange={(e) => props.onShipNameSelected(e.target.value)} />
          <label className="input__label" htmlFor="name">Name</label>
          <span className="focus-border" />
        </div>

        <br />

        <Select data={checkboxData} selectedPorts={props.selectedPorts} onPortSelected={props.onPortSelected} />

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
                  name={label}
                  type="radio"
                  checked={props.selectedShipType === label}
                  onChange={() => props.onShipTypeSelected(label)}
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

const Select = ({ data, selectedPorts, onPortSelected }) => {

  const onToggleOpen = (event) => {
    const select = event.currentTarget;
    select.classList.toggle('open');
  }

  const onChangeSelect = (event) => {
    const select = event.currentTarget;
    const list = select.querySelector('.multiselect__options');
    const inputs = list.querySelectorAll("input[type='checkbox']:checked");
    const checkedInputs = Array.from(inputs).map(el => el.id);
    onPortSelected(checkedInputs);
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
          type="checkbox"
          checked={selectedPorts.includes(label) ? true : false} />
        <span className="checkmark" />
        {label}
      </label>
    )
  });

  return (
    <div className="multiselect__container" onClick={onToggleOpen} onChange={onChangeSelect}>
      <span className={`multiselect__placeholder ${selectedPorts.length ? 'active' : ''}`}>Port</span>
      <span className="multiselect__selected" style={(selectedPorts.length) ? { 'opacity': '1' } : { 'opacity': '0' }}>
        {
          selectedPorts.length ? `Выбраны: ${selectedPorts.length}` : ''
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

AppFilter.propTypes = {
  onShipNameSelected: PropTypes.func,
  onPortSelected: PropTypes.func,
  onShipTypeSelected: PropTypes.func,
}


export default AppFilter;