import React, { Component } from 'react'
import PropTypes from "prop-types";
import hoistNonReactStatics from 'hoist-non-react-statics';

export const APP_CONTEXT = '__app__state__';


export default function Connect(Component, mapStateToProps) {
  function Wrapper({ innerRef, ...props }, context) {
    const appContext = context[APP_CONTEXT];
    const mappedProps = mapStateToProps(appContext);
    console.log(mappedProps, appContext);
    return <Component ref={innerRef} {...props} {...mappedProps} />;
  }
  Wrapper.contextTypes = {
    [APP_CONTEXT]: PropTypes.object.isRequired
  };

  Wrapper.displayName = `Connect(${Component.displayName ||
    Component.name})`;
  Wrapper.WrappedComponent = Component;
  return hoistNonReactStatics(Wrapper, Component);
}
