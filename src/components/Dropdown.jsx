/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import clsx from "classnames";
import React from "react";

const Dropdown = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors },
  meta,
  className,
  options,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={props.id} className="sr-only">
        {props.placeholder}
      </label>
      <select
        className={clsx(
          "    border   rounded-md text-base",
          {
            [className]: !!className,
          }
        )}
        {...field}
        {...props}
      >
        <option value="val">{props.placeholder}</option>
        {options.map((x, _index) => {
          return (
            <option key={x.value} value={x.cou}>
              {x.text}
            </option>
          );
        })}
        
      </select>
      {touched[field.name] && errors[field.name] && (
        <p className="text-red-500 text-sm">{errors[field.name]}</p>
      )}
    </div>
  );
};

export default Dropdown;
