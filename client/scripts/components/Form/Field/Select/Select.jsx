/*
 * This file is part of the React Oslo Meetup VR Demo application.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Arrow from './Arrow';

import './select.scss';

const renderOptions = (options = []) =>
  options.map(option => (typeof option.value === 'object'
    ? <optgroup key={option.title} label={option.title}>
      {renderOptions(option.value)}
    </optgroup>
    : <option key={option.value} value={option.value}>{option.title}</option>
  ));

/**
 * This is the Select component.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
const Select = ({
  name,
  placeholder,
  value,
  required,
  options,
  error,
  onFocus,
  onBlur,
  onChange,
}) =>
  <div className="form-select">
    <select
      className={classNames({ error })}
      {...{
        name,
        value,
        required,
        onFocus,
        onBlur,
        onChange,
      }}
    >
      <option value="" disabled>{placeholder}</option>
      {renderOptions(options)}
    </select>
    <Arrow className="form-select-arrow" />
  </div>;

/**
 * Declare expected property types.
 */
Select.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    })
  ),
  error: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

/**
 * Set default properties.
 */
Select.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
};

export default Select;
