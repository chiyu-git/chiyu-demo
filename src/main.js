
import san from 'san';

// route
import App from './App.san';

import {router} from 'san-router';

router.add({rule: '/', Component: App, target: '#app'});

// start
router.start();
