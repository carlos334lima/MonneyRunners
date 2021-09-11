//@libraries
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

//@middlewares
import rootReducer from "./modules/rootReducer";
import rootSagas from "./modules/rootSagas";
import Reactotron from "../config/ReactotronConfig";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), Reactotron.createEnhancer())
);

sagaMiddleware.run(rootSagas);

export default store;