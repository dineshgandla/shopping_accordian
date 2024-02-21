import React, { useState } from 'react';
import data from "./data.json";
import "./Accordian.css";

const App = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let selectMultiple = [...multiple];
    const findIndexOfCurrentId = selectMultiple.indexOf(getCurrentId);
    if (findIndexOfCurrentId === -1) selectMultiple.push(getCurrentId);
    else selectMultiple.splice(findIndexOfCurrentId, 1);
    setMultiple(selectMultiple);
  }

  function isItemOpen(itemId) {
    return enableMultiSelection ? multiple.includes(itemId) : selected === itemId;
  }

  function toggleItem(itemId) {
    if (enableMultiSelection) {
      handleMultiSelection(itemId);
    } else {
      handleSingleSelection(itemId);
    }
  }

  return (
    <div className="acc-wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Select Multiple Accordian
      </button>
      <div className="accordian">
        {
          data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={() => toggleItem(dataItem.id)}
                className="title"
              >
                <h3>{dataItem.question}</h3>
                {isItemOpen(dataItem.id) ? <span className="icon">-</span> : <span className="icon">+</span>}
              </div>
              {isItemOpen(dataItem.id) && (
                <div className="acc-content">{dataItem.answer}</div>
              )}
            </div>
          ))
        ) : (
          <div>No data found !</div>
        )}
      </div>
    </div>
  );
};

export default App;


