import { FunctionComponent } from 'react';

const App: FunctionComponent<{}> = props => (
  <div>
    <header>
      <h1>Header Header</h1>
    </header>
    <main {...props}>
      <h1 className="title">Playwright Testing Library</h1>
      <h2>Experimental Component Support</h2>
    </main>
  </div>
);

export default App;
