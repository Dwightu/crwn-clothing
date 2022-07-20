import React from 'react';
import { createRoot } from "react-dom/client";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
// import { CategoriesProvider } from './contexts/categories.context';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import { stripePromise } from './utils/stripe/stripe.utils';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// const stripePromise = loadStripe('pk_test_51LNjn0FreB5ANJnIM7Ngj3HtsAh7H9OV2cN9XnkyI23a8vNUd8yM5TCwHHo84hYeH9bBEVOL7rPbIO7loONzddVe00xjGnRAgj');

const options = {
  // passing the client secret obtained from the server
  clientSecret: '{{CLIENT_SECRET}}',
};


const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
)

root.render(
  <React.StrictMode>
    <Provider store={store} options={options}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
