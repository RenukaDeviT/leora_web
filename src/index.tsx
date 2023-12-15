import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from "react-error-boundary";
import './index.css';
import { ThemeProvider } from 'styled-components';
import config from 'config';
import './ui/styles/globals.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SbCallsProvider } from './lib/sendbird-calls/SbCallsContext';
import Error from './Pages/Error/Error'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ErrorBoundary fallback={<Error />}>
    <SbCallsProvider appId={config.appId}>
      <ThemeProvider theme={{ isWidget: false }}>
        <App/>
      </ThemeProvider>
    </SbCallsProvider>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
