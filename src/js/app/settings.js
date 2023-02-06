import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import * as Sentry from '@sentry/browser';
import AppProvider from './app-context';
import Options from './screens/Options';
// import ReactGA from 'react-ga';

// const trackingId = 'UA-180249192-1'; // Replace with your Google Analytics tracking ID
// ReactGA.initialize(trackingId);
// const ga = ReactGA.ga();
// ga('set', 'checkProtocolTask', null);

Sentry.init({
  dsn:
    'https://b0a7506230624a3dad748347da41f9e6@o405405.ingest.sentry.io/5273720',
});

function ErrorFallback({ error }) {
  return (
    <div>
      <p>There was an error</p>
      <pre style={{ maxWidth: 700 }}>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}

function App(props) {
  return (
    <AppProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Options />
      </ErrorBoundary>
    </AppProvider>
  );
}

export default App;
