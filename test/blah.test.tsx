import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FormikPersistExample from './FormikPersistExample';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FormikPersistExample />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
