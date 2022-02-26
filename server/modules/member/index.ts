// const { authenticateRequest } = require("../../common/middlewares");
import memberControler from '../../controllers/member';
import request from '../../common/request';
export default request((app) => {
    app.use('/api/member', memberControler);
});
