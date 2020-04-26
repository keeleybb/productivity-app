const db = require("../models");
const userModel = require("../controllers/userController")


// Defining methods for the GoalsController
module.exports = {
    findAll: function (req, res) {
        db.Goal
            .find()
            .sort({ createdAt: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        // // console.log("req.user", req.user)
        db.Goal
            .find({ author: req.user._id })
            .sort({ createdAt: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        req.body.author = req.user._id
        db.Goal.create(req.body)
            .then((dbModel) => {
                res.json(dbModel);
            })
            .catch(err => {
                res.json(err);
            });
    },
    update: function (req, res) {
        db.Goal
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updateTask: function (req, res) {
        db.Goal
            .findOneAndUpdate({ "_id": req.body._id }, // Filter
                { $push: { Tasks: req.body.Tasks } }, // Update
                { new: true }
            )
            .then(dbModel => {
                console.log(dbModel)
                res.json(dbModel);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    updateTask: function (req, res) {
        db.Goal
            .findOneAndUpdate({ "_id": req.body._id }, // Filter
                { $push: { Tasks: req.body.Tasks } }, // Update
                { new: true }
            )
            .then(dbModel => {
                console.log(dbModel)
                res.json(dbModel);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    updateTaskDate: function (req, res) {
        console.log(req.body.data)
        console.log(req.body.data._id)
        db.Goal.updateOne({ "_id": req.params.id, "Tasks._id": req.body.data._id }, { $set: { "Tasks.$": req.body.data } })
            .then(data => console.log(data))
    },
    completeTask: function (req, res) {
        console.log("complete task: ", req.body, " ", req.params.id)
        db.Goal
            .findOneAndUpdate({ _id: req.params.id }, { completeTime: Date.now() })
            .updateOne({ "_id": req.params.id, "Tasks._id": req.body._id }, { $set: { "Tasks.$": req.body.Tasks } })
            .then(dbModel => {
                console.log("returned:", dbModel)
                res.json(dbModel);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    removeTask: function (req, res) {
        console.log("task ID: ", req.body._id)
        db.Goal
            .update(
                {},
                { $pull: { Tasks: { "_id": { $eq: req.body._id } } } },
                {
                    multi: true
                })
            .then(dbModel => {
                console.log(dbModel)
                res.json(dbModel);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    remove: function (req, res) {
        db.Goal
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};

