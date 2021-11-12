const {Router} = require('express');
const router = Router();
const {selectpartLider, insertpartLider, loginpartLider, loginAdmin, loginOrg, selectConfirm, 
    perfilpartLider, modicarConfirm, modicarpartLider, selectIntegrantes, insertIntegrantes,
    deleteIntegrantes, getUserData, deleteUsers, updateUsers} = require('../controller/index.controller');

router.get('/selectpartLider', selectpartLider);
router.post('/insertpartLider', insertpartLider);
router.post('/loginpartLider', loginpartLider);
router.post('/loginAdmin', loginAdmin);
router.post('/loginOrg', loginOrg);
router.post('/selectConfirm', selectConfirm);
router.post('/perfilpartLider', perfilpartLider);
router.post('/modicarConfirm', modicarConfirm);
router.post('/modicarpartLider', modicarpartLider);
router.post('/selectIntegrantes', selectIntegrantes);
router.post('/insertIntegrantes', insertIntegrantes);
router.post('/deleteIntegrantes', deleteIntegrantes);
//router.get('/users/:id', getUserData);
//router.delete('/users/:id', deleteUsers);
//router.put('/users/:id', updateUsers);

module.exports = router;