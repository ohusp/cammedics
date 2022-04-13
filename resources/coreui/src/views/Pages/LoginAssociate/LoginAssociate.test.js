import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginAssociate from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><LoginAssociate/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
