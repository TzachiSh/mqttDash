import bodyParser from 'body-parser';

export default app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    if (global.isDev) {
        const morgan = require ('morgan');

        app.use(morgan('dev'));
    }
}