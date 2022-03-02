const router = require('express').Router()
const uploadImage = require('../utils/uploadImage')
const {
    Home, 
    Portofolio,
    createPortofolio,
    editPortofolio,
    editPortofolioFunction,
    deletePortofolio,
    contacUs
} = require('../controller')


router.get('/', Home)
router.get('/create', Portofolio)
router.post('/create', uploadImage.single('image'), createPortofolio)
router.get('/edit/:id', editPortofolio)
router.post('/edit/:id',uploadImage.single('image'), editPortofolioFunction)
router.post('/delete/:id', deletePortofolio)
router.post('/contactus', contacUs)



module.exports = router