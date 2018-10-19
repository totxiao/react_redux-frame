import React from 'react'
import ReactDOM from 'react-dom'
import { Provider} from 'react-redux'
import AppStore from './framework/module/app-store';
import { AppContainer } from 'react-hot-loader';
import './framework/sass/entry.scss';
import Component from './module-local/module/component/_entry';
import reducer from './module-local/module/reducer/_entry';


const appStore = new AppStore({
    Component:Component,
    reducer:reducer
});
const store = appStore.createStore();
const App = appStore.createApp();

ReactDOM.render(
    <Provider store={store}>
        <AppContainer>
            {App}
        </AppContainer>
    </Provider>,
    document.getElementById('root')
);


if (module.hot) {
    module.hot.accept();
}
export default {
    getStore: ()=> {
        return store;
    }
};