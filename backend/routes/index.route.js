const {Router} = require('express');
const router = Router();
const {selectpartLider, insertpartLider, loginpartLider, getUserData, deleteUsers, updateUsers} = require('../controller/index.controller')

router.get('/selectpartLider', selectpartLider);
router.post('/insertpartLider', insertpartLider);
router.post('/loginpartLider', loginpartLider);
//router.get('/users/:id', getUserData);
//router.delete('/users/:id', deleteUsers);
//router.put('/users/:id', updateUsers);

module.exports = router;