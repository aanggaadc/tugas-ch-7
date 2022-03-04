const { portofolio, file, contactus, services } = require('../models')
const fs = require('fs')

const Home = async (req, res) => {
    const {success, error} = req.flash()
    const page = Number(req.query.page) || 1
    const itemPerpage = 6
    const daftarPortofolio = await portofolio.findAndCountAll({
        include: 'image',
        limit: itemPerpage,
        offset: (page-1) * itemPerpage
    })

    const daftarService = await services.findAll({
        include: 'icon'
    })

    // res.status(200).json({
    //     message: "SUCCESS",
    //     data_portofolio: daftarPortofolio,
    //     data_services: daftarService
    // })
    
    res.render('index', {
        title: "Tugas Kelompok CH7",
        data: daftarPortofolio.rows,
        dataServices: daftarService,
        currentPage: page,
        totalPage: Math.ceil(daftarPortofolio.count / itemPerpage),
        nextPage : page + 1,
        prevPage: (page - 1) == 0 ? 1 : (page - 1),
        success: success,
        error: error
    })
}


// ---------------- SERVICES ------------------------- //

const Services = (req, res) => {
    res.render('createServices', {
        title: "Create New Services"
    })
}

const CreateServices = (req,res) => {
    const {service_name, service_description} = req.body

    services.create({
        service_name,
        service_description
    }).then(async (data) => {
        if(req.file){
            await file.create({
                file_url: `/icons/${req.file.filename}`,
                file_name: req.file.filename,
                file_size: req.file.size,
                original_filename: req.file.originalname,
                services_uuid: data.uuid
            })
        }
        req.flash('success', 'Services Created')
        res.redirect('/')
    }).catch((error) => {
        req.flash('error', error.message)
        console.log(error)
        res.redirect('/')
    })
}

const EditServices = async (req, res, next) => {
    try {
        const findService = await services.findOne({
            where:{
                uuid: req.params.id
            }
        })

        if(findService){
            res.render('editServices' ,{
                data: findService,
                title: "Edit Service Data"
            })
        }else{
            next()
        }
    } catch (error) {
        next()
    }
}

const EditServicesFunction = async (req, res) => {
    const {service_name, service_description} = req.body
    try {
        const findServices = await services.findOne({
            where: {
                uuid :req.params.id
            },
            include: "icon"
        })

        if(req.file){
            await file.create({
                file_url: `/icons/${req.file.filename}`,
                file_name: req.file.filename,
                file_size: req.file.size,
                original_filename: req.file.originalname,
                services_uuid: findServices.uuid
            })

            if(findServices.icon){
                await file.destroy({
                    where: {
                        uuid: findServices.icon.uuid
                    }
                })
                fs.rmSync(__dirname + '/../public' + findServices.icon.file_url)
            }
        }

        const serviceUpdated = await findServices.update({
            service_name,
            service_description
        })

        if(serviceUpdated){
            req.flash('success', 'Services Edited')
            res.redirect('/')
        }
    } catch (error) {
        req.flash('error', error.message)
        console.log(error)
        res.redirect('/')
    }
}


const DeleteServices = async (req, res) => {
    try {
        const servicesToDelete = await services.findOne({
            where: {
                uuid: req.params.id
            },
            include: 'icon'
        })

        if(servicesToDelete.icon){
            await file.destroy({
                where: {
                    uuid: servicesToDelete.icon.uuid
                }
            })
            fs.rmSync(__dirname + '/../public' +servicesToDelete.icon.file_url)
        }

        await servicesToDelete.destroy()

        if(servicesToDelete){
            req.flash('success', 'Services Deleted')
            res.redirect('/')
        }
    } catch (error) {
        req.flash('error', error.message)
        console.log(error)
        res.redirect('/')
    }
}



// ---------------- PORTOFOLIO ------------------------- //

const Portofolio = (req, res) => {
    res.render('createPortofolio',{
        title: "Create New Portofolio"
    })
}

const EditPortofolio = async (req, res, next) => {
    try {
        const findPortofolio = await portofolio.findOne({
            where: {
                uuid: req.params.id
            }
        })
    
        if(findPortofolio){
            res.render('editPortofolio', {
                data: findPortofolio,
                title: "Edit Portofolio Data"
            })
        }else{
            next()
        }
    } catch (error) {
        next()
    }      
}

const CreatePortofolio = (req, res) => {
    const { category, project_name} = req.body

    portofolio.create({
        category,
        project_name
    }).then(async (data) => {
        if(req.file){
            await file.create({
                file_url: `/images/${req.file.filename}`,
                file_name: req.file.filename,
                file_size: req.file.size,
                original_filename: req.file.originalname,
                portofolio_uuid: data.uuid
            })
        }
        req.flash('success', 'Portofolio Created')
        res.redirect('/')
    }).catch((error) =>{
        req.flash('error', error.message)
        console.log(error)
        res.redirect('/')
    })
}

const EditPortofolioFunction = async (req, res) => {
    const { category, project_name} = req.body
    try {
        const findPortofolio = await portofolio.findOne({
            where: {
                uuid: req.params.id
            },
            include: 'image'
        })

        if(req.file){
            await file.create({
                file_url: `/images/${req.file.filename}`,
                file_name: req.file.filename,
                file_size: req.file.size,
                original_filename: req.file.originalname,
                portofolio_uuid: findPortofolio.uuid
            })
            
            if(findPortofolio.image){
                await file.destroy({
                    where: {
                      uuid: findPortofolio.image.uuid
                    }
                  })
                  fs.rmSync(__dirname + '/../public' + findPortofolio.image.file_url)
            }            
        }              

        const portofolioUpdated = await findPortofolio.update({
            category,
            project_name
        })

        if(portofolioUpdated){
            req.flash('success', 'Portofolio Edited')
            res.redirect('/')
        }
    } catch (error) {
        req.flash('error', error.message)
        console.log(error)
        res.redirect('/')
    }
}

const DeletePortofolio = async (req,res) => {
    try {
        const portofolioToDelete = await portofolio.findOne({
            where: {
                uuid: req.params.id
            },
            include: 'image'
        })

        if (portofolioToDelete.image) {
            await file.destroy({
              where: {
                uuid: portofolioToDelete.image.uuid
              }
            })
            fs.rmSync(__dirname + '/../public' + portofolioToDelete.image.file_url)
          }

         await portofolioToDelete.destroy()


        if(portofolioToDelete){
            req.flash('success', 'Portofolio Deleted')
            res.redirect('/')
        }
    } catch (error) {
        req.flash('error', error.message)
        console.log(error)
        res.redirect('/')
    }
}


// ---------------- CONTACT US ------------------------- //

const ContacUs = (req,res) =>{
    const {full_name, email, phone, message} = req.body

    contactus.create({
        full_name,
        email,
        phone,
        message
    }).then((data) =>{
        req.flash('success', 'Message Successfully Sent')
        res.redirect('/')
    }).catch((error) =>{
        req.flash('error', error.message)
        console.log(error)
        res.redirect('/')
    })

}


module.exports = {
    Home,
    Portofolio,
    CreatePortofolio,
    EditPortofolio,
    EditPortofolioFunction,
    DeletePortofolio,
    ContacUs,
    Services,
    CreateServices,
    EditServices,
    EditServicesFunction,
    DeleteServices
}