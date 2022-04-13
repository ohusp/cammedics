import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ResetPasswordAssociate from './ResetPasswordAssociate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ResetPasswordAssociate/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
