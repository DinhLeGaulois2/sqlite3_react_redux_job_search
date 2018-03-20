const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const db = require("../models");

const cst = require('../constants/jobDBCsts.js');
const states = require('../constants/states.js');

module.exports = function (app) {
    app.post("/api/job/add", (req, res) => {
        if (req.body.company.name.length) {
            let source = req.body.company;
            db.company.findOrCreate({ where: { name: source.name, type: source.type } })
                .then(data => {
                    let companyId = data[0].id;

                    source = req.body.company.companyLocation;
                    if (source.town.length) {
                        db.companyLocation.findOrCreate({
                            where: {
                                town: source.town,
                                state: source.state,
                                companyId: companyId
                            }
                        })
                            .then(data => { // 'companyLocation' has been created successfully
                                source = req.body.job
                                db.job.findOrCreate({
                                    where: {
                                        title: source.title,
                                        description: source.description,
                                        appliedAt: source.appliedAt,
                                        status: source.status,
                                        comment: source.comment,
                                        url: source.url
                                    }
                                })
                                    .then(data => {
                                        let jobId = data[0].id;
                                        db.jobCompany.findOrCreate({
                                            where: {
                                                jobId: jobId,
                                                companyId: companyId
                                            }
                                        })
                                            .then(data => {
                                                source = req.body.contactPerson;
                                                if (source.name.length) {
                                                    db.contactPerson.findOrCreate({
                                                        where: {
                                                            name: source.name,
                                                            email: source.email,
                                                            phone: source.phone,
                                                            companyId: companyId
                                                        }
                                                    })
                                                        .then(data => { // 'contactPerson' has been created successfully
                                                            res.status(200).json(jobId);
                                                        })
                                                        .catch(err => res.status(400).json("'" + source.name + "' Couldn't not be Found/Created, err: " + err))
                                                }
                                                else res.status(200).json(jobId);
                                            })
                                            .catch(err => res.status(400).json("Couldn't not be Found/Created of 'jobCompany', err: " + err))
                                    })
                                    .catch(err => res.status(400).json("Couldn't not be Found/Created of 'job', err: " + err))
                            })
                            .catch(err => res.status(400).json("The location of the company'" + req.body.company.name + "' Couldn't not be Found/Created, err: " + err))
                    }
                })
                .catch(err => res.status(400).json("The Company '" + source.name + "' Couldn't not be Found/Created, err: " + err))
        }

    })

    app.get('/api/job/get/all', (req, res) => {
        db.job.findAll({
            attributes: ['id', 'title', 'description', 'status', 'appliedAt', 'comment', 'url']
        })
            .then(data => {
                let result = [];
                const listAllJobs = (lJob) => {
                    if (lJob.length) {
                        let aJob = {
                            job: lJob.shift(),
                            company: {}
                        }
                        db.jobCompany.findAll({ where: { jobId: aJob.job.id } })
                            .then(data => {
                                db.company.findAll({
                                    where: { id: data[0].companyId },
                                    attributes: ['name', 'type'],
                                    include: [
                                        {
                                            model: db.contactPerson,
                                            attributes: ['name', 'email', 'phone']
                                        },
                                        {
                                            model: db.companyLocation,
                                            attributes: ['town', 'state']
                                        }]
                                }).then(data => {
                                    aJob.company = data[0]
                                    result.push(aJob)
                                    listAllJobs(lJob)
                                })
                                    .catch(err => listAllJobs(lJob))
                            })
                            .catch(err => {
                                console.log("Could not do 'db.company.findAll', err: " + err)
                                listAllJobs(lJob)
                            })
                    } else {
                        res.status(200).json(result)
                    }
                }
                listAllJobs([...data])
            })
            .catch(err => res.status(400).json(err))
    })

    app.get('/api/job/get/recent', (req, res) => {
        db.job.findAll({
            order: [['appliedAt', 'DESC']],
            attributes: ['id', 'title', 'description', 'status', 'appliedAt', 'comment', 'url']
        })
            .then(data => {
                let result = [];
                const listAllJobs = (lJob) => {
                    if (lJob.length) {
                        let aJob = {
                            job: lJob.shift(),
                            company: {}
                        }
                        db.jobCompany.findAll({ where: { jobId: aJob.job.id } })
                            .then(data => {
                                db.company.findAll({
                                    where: { id: data[0].companyId },
                                    attributes: ['name', 'type'],
                                    include: [
                                        {
                                            model: db.contactPerson,
                                            attributes: ['name', 'email', 'phone']
                                        },
                                        {
                                            model: db.companyLocation,
                                            attributes: ['town', 'state']
                                        }]
                                }).then(data => {
                                    aJob.company = data[0]
                                    result.push(aJob)
                                    listAllJobs(lJob)
                                })
                                    .catch(err => listAllJobs(lJob))
                            })
                            .catch(err => {
                                console.log("Could not do 'db.company.findAll', err: " + err)
                                listAllJobs(lJob)
                            })
                    } else {
                        res.status(200).json(result)
                    }
                }
                listAllJobs([...data])
            })
            .catch(err => res.status(400).json(err))
    })

    app.put('/api/job/update/', (req, res) => {
        db.job.findOne({ where: { id: req.body.id } })
            .then(aJob => {
                aJob.updateAttributes({
                    comment: req.body.comment,
                    status: req.body.status
                })
                    .then(result => res.status(200).json("Update Successfully"))
                    .catch(err => res.status(400).json(err))
            })
            .catch(err => res.status(400).json(err))
    })
}