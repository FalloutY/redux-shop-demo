import React, { Component } from "react";
import "./App.css";
import api from "./api";

class App extends Component {
  initialState = { services: [], error: null };
  state = this.initialState;

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case "ADD_SERVICES":
        return { ...state, ...{ services: action.data } };
      case "ADD_ERROR":
        return { ...state, ...{ error: action.error } };
      default:
        return state;
    }
  };

  dispatch = action => {
    this.setState(this.reducer(this.state, action));
  };

  componentDidMount = () => {
    api
      .getServices()
      .then(resp => resp.json())
      .then(data => this.dispatch({ type: "ADD_SERVICES", data }))
      .catch(err =>
        this.dispatch({ type: "ADD_ERROR", error: { message: "Server Error" } })
      );
  };

  render() {
    return (
      <div className="App">
        <pre>
          <code>{JSON.stringify(this.state, 2, 4)}</code>
        </pre>
      </div>
    );
  }
}

export default App;
