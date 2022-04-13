import React from 'react';
import ReactDOM from 'react-dom';
import Concert from './Concert';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Concert />, div);
  ReactDOM.unmountComponentAtNode(div);
});
