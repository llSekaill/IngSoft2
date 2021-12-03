const {Router} = require('express');
const router = Router();
const {selectpartLider, insertpartLider, loginpartLider, loginAdmin, loginOrg, selectConfirm, 
    perfilpartLider, modicarConfirm, modicarpartLider, selectIntegrantes, insertIntegrantes,
    deleteIntegrantes, getTorneo, createTorneo, searchtorneo, buscarTorneoEquipo, limiteTorneoEquipo,
    limiteIntegrante, insertTorneoEquipo, deleteIntegTorneo, getTorneo2, buscarTorneoEquipo2,getUserData, deleteUsers, updateUsers} = require('../controller/index.controller');

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
router.get('/mostrartorneo', getTorneo);
router.post('/creartorneo', createTorneo);
router.post('/searchtorneo', searchtorneo);
router.post('/buscarTorneoEquipo', buscarTorneoEquipo);
router.post('/limiteTorneoEquipo', limiteTorneoEquipo);
router.post('/limiteIntegrante', limiteIntegrante);
router.post('/insertTorneoEquipo', insertTorneoEquipo);
router.post('/deleteIntegTorneo', deleteIntegTorneo);
router.get('/getTorneo2', getTorneo2);
router.post('/buscarTorneoEquipo2', buscarTorneoEquipo2);
//router.get('/users/:id', getUserData);
//router.delete('/users/:id', deleteUsers);
//router.put('/users/:id', updateUsers);

module.exports = router;