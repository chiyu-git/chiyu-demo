
import san from 'san';

// route
import App from './frame.js';

import {router} from 'san-router';

router.add({rule: '/', Component: App, target: '#app'});

// start
router.start();
