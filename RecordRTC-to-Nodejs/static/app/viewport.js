import React from "react";
import Steps from "./steps.js";

export default React.createClass({
  getInitialState() {
    return {currentStep: 1}
  },
  render: function() {
    return (
      <div className="viewport">
        <Steps currentStep={this.state.currentStep}></Steps>
      </div>
    );
  },
});

