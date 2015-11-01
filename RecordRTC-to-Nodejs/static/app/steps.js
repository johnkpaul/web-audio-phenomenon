import React from "react";

let steps = ['Accept video/audio recording', 'Position your face', 'Start recording'];

export default React.createClass({
  render: function() {
  debugger;
    return (
      <div className="steps">
        <ul>
          {steps.map((step,i) => {
             return <li key={i}>{step}</li>;
          })}
        </ul>
      </div>
    );
  },
});


