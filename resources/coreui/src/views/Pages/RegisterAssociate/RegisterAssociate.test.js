import React from 'react';
import ReactDOM from 'react-dom';
import RegisterAssociate from '../RegisterAssociate/RegisterAssociate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisterAssociate />, div);
  ReactDOM.unmountComponentAtNode(div);
});
