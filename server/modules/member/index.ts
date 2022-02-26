// const { authenticateRequest } = require("../../common/middlewares");

import modulesWraper from '../../common/modulesWraper';
export default modulesWraper(async (app) => {
    app.get('/api/products', (req, res) => {
        res.send('tusher');
    });
});


