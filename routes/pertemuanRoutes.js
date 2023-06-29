const express = require('express');
const router = express.Router();
const { getPertemuan, getPertemuanById, postPertemuan, putPertemuan, deletePertemuan } = require('../controller/pertemuanController');

router.get('/pertemuan', (req, res) => {
  getPertemuan(res);
});

router.get('/pertemuan/:id', getPertemuanById);

router.post('/pertemuan', postPertemuan);

router.put('/pertemuan/:id', putPertemuan);

router.delete('/pertemuan/:id', deletePertemuan);

module.exports = router;
