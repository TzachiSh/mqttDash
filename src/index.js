import express from 'express';

import constants from './config/constants';
import './config/db';
import middlewares from './config/middlewares';
import Routes from './modules';

// Check if is in dev mode.
global.isDev = process.env.NODE_ENV === 'development';
/////////////////////////////////////////////////////

const app = express();

middlewares(app);

app.use('/api/v1', Routes)


app.listen(constants.PORT, err => {
	if (err) {
		console.log('err: ', err);

	} else {
		console.log(`App listening on port ${constants.PORT}!`);
		console.log(`Enviroment ${process.env.NODE_ENV}`);
	}
});