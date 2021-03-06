/*
 * This file is part of the React Oslo Meetup VR Demo application.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { PropTypes, Component } from 'react';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';

import Checkbox from './Checkbox/Checkbox';
import Text from './Text/Text';
import Select from './Select/Select';

import Message from '../Message/Message';

import './field.scss';

/**
 * This is the Field component.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export default class Field extends Component {

  /**
   * Create Field and set initial state.
   *
   * @param {Object} props
   *
   * @return void
   */
  constructor(props) {
    super(props);

    this.state = {
      focus: false,
    };
  }

  /**
   * Prevent component from doing unnecessary re-renders.
   *
   * @param {Object} nextProps
   * @param {Object} nextState
   *
   * @return {bool}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  /**
   * Event handler that passes values to parent component.
   *
   * @param {Object} e
   *
   * @return void
   */
  onChangeHandler = (e) => {
    const { type, name, label, required, constraints, confirm, validate } = this.props;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    validate(name, label, value, required, constraints, confirm);
  }

  /**
   * Event handler for when the input gains focus.
   *
   * @return void
   */
  onFocusHandler = () => {
    this.setState({ focus: true });
  }

  /**
   * Event handler for when the input looses focus.
   *
   * @return void
   */
  onBlurHandler = () => {
    const { name, label, value, required, constraints, confirm, validate } = this.props;

    this.setState({ focus: false });

    validate(name, label, value, required, constraints, confirm);
  }

  /**
   * Render field based on type.
   *
   * @return {Object}
   */
  createField() {
    const { focus } = this.state;

    const {
      type,
      name,
      label,
      placeholder,
      value,
      required,
      options,
      error,
    } = this.props;

    let field = null;

    switch (type) {
      case 'checkbox':
      case 'radio':
        field = (
          <Checkbox
            {...{
              name,
              label,
              value: !!value,
              required,
              error: !!error,
              onChange: this.onChangeHandler,
            }}
          />
        );
        break;

      case 'select':
        field = (
          <Select
            {...{
              name,
              label,
              placeholder,
              value,
              required,
              options,
              error: !!error && !focus,
              onFocus: this.onFocusHandler,
              onBlur: this.onBlurHandler,
              onChange: this.onChangeHandler,
            }}
          />
        );
        break;

      case 'text':
      case 'tel':
      case 'email':
      case 'password':
        field = (
          <Text
            {...{
              type,
              name,
              label,
              placeholder,
              value,
              required,
              error: !!error && !focus,
              onFocus: this.onFocusHandler,
              onBlur: this.onBlurHandler,
              onChange: this.onChangeHandler,
            }}
          />
        );
        break;

      default:
        // no-op
    }

    return field;
  }

  /**
   * Render react component.
   *
   * @return {Object}
   */
  render() {
    const { focus } = this.state;
    const { error, value, label } = this.props;

    let errorMessage = null;

    if (error && !focus) {
      errorMessage = <Message className="error-message" message={error} />;
    }

    return (
      <div className="form-field">
        <label className={classNames('form-label', { focus, value })}>
          <p>{label}</p>
          {this.createField()}
        </label>
        {errorMessage}
      </div>
    );
  }
}

/**
 * Declare expected property types.
 */
Field.propTypes = {
  type: PropTypes.oneOf(['select', 'text', 'email', 'password', 'tel', 'checkbox', 'radio']),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  required: PropTypes.bool,
  confirm: PropTypes.string,
  constraints: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    })
  ),
  error: PropTypes.string,
  validate: PropTypes.func,
};

/**
 * Set default properties.
 */
Field.defaultProps = {
  validate: () => {},
};
