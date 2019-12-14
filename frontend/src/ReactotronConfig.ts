import Reactotron, { trackGlobalErrors } from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (process.env.NODE_ENV !== 'production') {
  Reactotron.configure() // we can use plugins here -- more on this later
    .use(reactotronRedux())
    .use(trackGlobalErrors({ offline: false }))
    .use(sagaPlugin({}))
    .connect(); // let's connect!

  console.tron = Reactotron;
}
