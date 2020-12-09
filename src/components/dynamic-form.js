import React, {useState, useEffect, useRef, useContext} from 'react';
import _ from 'lodash';

import './dynamic-form.css';


// Dynamic Form
function DynamicForm(props) {
  const [state, setState] = useState(props.defaultValues || {});
  
  const [isDebug, setDebug] = useState(true);

  const submitText = props.submitText || "SUBMIT";
  
  const onSubmit = e => {
    e.preventDefault();
    if (props.onSubmit) props.onSubmit(state);
  };

  const onChange = (e, key, type = "single") => {
    if (type === "single") {
      setState({
        ...state, 
        [key]: e.target.value
      });
    } else {
      // Array of values (e.g. checkbox): TODO: Optimization needed.
      let found = state[key]
        ? state[key].find(d => d === e.target.value)
        : false;

      if (found) {
        let data = state[key].filter(d => {
          return d !== found;
        });
        
        setState({
          ...state,
          [key]: data
        });
      } else {
        console.log("found", key, state[key]);
        
        let others = state[key] ? [...state[key]] : [];
        setState({
          ...state,
          [key]: [e.target.value, ...others]
        });
      }
    }
  };

  const renderForm = () => {
    let model = props.model;
    let defaultValues = props.defaultValues;


    const groupedByRow = _.groupBy(model, "row");
    console.log("ROW: ", groupedByRow);

    //let formUI = model.map(m => {
    let formUI = Object.keys(groupedByRow).map(k => {
      let row = groupedByRow[k];
      console.log("ROW ITEM: ", row);

      return <div className="form-row"> {Object.keys(row).map(item => {
        let m = row[item];

        let key = m.key;
        let type = m.type || "text";
        let props = m.props || {};
        let name = m.name;
        let value = m.value;

        let target = key;
        value = state[target] || "";

        let input = (
          <input
            {...props}
            className="form-input"
            type={type}
            key={key}
            name={name}
            value={value}
            onChange={e => {
              onChange(e, target);
            }}
          />
        );

        if (type == "radio") {
          input = m.options.map(o => {
            let checked = o.value == value;
            return (
              <React.Fragment key={"fr" + o.key}>
                <input
                  {...props}
                  className="form-input"
                  type={type}
                  key={o.key}
                  name={o.name}
                  checked={checked}
                  value={o.value}
                  onChange={e => {
                    onChange(e, o.name);
                  }}
                />
                <label key={"ll" + o.key}>{o.label}</label>
              </React.Fragment>
            );
          });
          input = <div className="form-group-radio">{input}</div>;
        }

        if (type == "select") {
          input = m.options.map(o => {
            let checked = o.value == value;
            
            return (
              <option
                {...props}
                className="form-input"
                key={o.key}
                value={o.value}
              >
                {o.value}
              </option>
            );
          });

          input = (
            <select
              value={value}
              onChange={e => {
                onChange(e, m.key);
              }}
            >
              {input}
            </select>
          );
        }

        if (type == "checkbox") {
          input = m.options.map(o => {
            let checked = false;
            if (value && value.length > 0) {
              checked = value.indexOf(o.value) > -1 ? true : false;
            }
            return (
              <React.Fragment key={"cfr" + o.key}>
                <input
                  {...props}
                  className="form-input"
                  type={type}
                  key={o.key}
                  name={o.name}
                  checked={checked}
                  value={o.value}
                  onChange={e => {
                    onChange(e, m.key, "multiple");
                  }}
                />
                <label key={"ll" + o.key}>{o.label}</label>
              </React.Fragment>
            );
          });

          input = <div className="form-group-checkbox">{input}</div>;
        }

        return (
          <div key={"g" + key} className="form-group">
            <label className="form-label" key={"l" + key} htmlFor={key}>
              {m.label}
            </label>
            {input}
          </div>
        );
      })}</div>;
    });
    return formUI;
  };

  let title = props.title || "Dynamic Form";

  return (
    <div className={props.className}>
      <h3 className="form-title">{title}</h3>
      {isDebug && 
        <pre>
          { JSON.stringify(state)}
        </pre>
      }
      <form
        className="dynamic-form"
        onSubmit={e => {
          onSubmit(e);
        }}
        >
        {renderForm()}
        <div className="form-actions">
          <button type="submit">{submitText}</button>
        </div>
      </form>
    </div>
  )
}


export default DynamicForm;