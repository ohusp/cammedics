import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ForgetPasswordAssociate from './ForgetPasswordAssociate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ForgetPasswordAssociate/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
