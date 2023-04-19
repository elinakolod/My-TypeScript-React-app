import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from 'store/rootReducer';

let store = configureStore({
	reducer: rootReducer,
});

const AllTheProviders = ({ children }) => {
	return (
		<Provider store={store}>
			<BrowserRouter>{children}</BrowserRouter>
		</Provider>
	);
};

const customRender = (ui, options) => {
	const preloadedState = options?.initialStore;

	if (preloadedState) {
		store = configureStore({ reducer: rootReducer, preloadedState });
	}

	return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';

export { customRender as render };
