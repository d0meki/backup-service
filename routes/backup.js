const { Router } = require('express');
const { download,uploadFile } = require('../controllers/backup-controller');
const router = Router();
router.get('/download', download);
router.post('/upload', uploadFile);

module.exports = router;