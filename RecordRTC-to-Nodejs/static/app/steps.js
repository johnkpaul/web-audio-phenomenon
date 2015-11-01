import React from "react";

let steps = ['Position your face in the camera view. You\'ll need to stay still through this', 

`Click on start recording with your face in position. A metronome will start and you should say the word "vase" at every tick`,
`After 10 seconds of the word "vase", the background will flash red`,
`Click on start recording again and say the word "base" at the same regular interval`,
`After 10 seconds, your McGurk video will be processed and linked below`,

];

export default React.createClass({
  render: function() {
    return (
      <div className="steps">
        <h1>Steps to create your own McGurk video</h1>
        <ol>
          {steps.map((step,i) => {
             return <li key={i}>{step}</li>;
          })}
        </ol>
      </div>
    );
  },
});


