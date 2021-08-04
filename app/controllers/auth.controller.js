const Auth = require('../models/auth.model.js')

// Create and Save a new Auth
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userName) {
    return res.status(400).send({
      message: 'Auth content can not be empty'
    })
  }

  // Create a Auth
  const auth = new Auth({
    userName: req.body.userName || 'Untitled Auth',
    userPassword: req.body.userPassword,
    userId: req.body.userId,
    marks: req.body.marks
  })

  // Save Auth in the database
  auth.save()
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Auth.'
      })
    })
}

// Retrieve and return all auths from the database.
exports.findAll = (req, res) => {
  Auth.find()
    .then(auths => {
      res.send(auths)
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving auths.'
      })
    })
}

// Find a single auth with a authId
exports.findOne = (req, res) => {
  Auth.findById(req.params.authId)
    .then(auth => {
      if (!auth) {
        return res.status(404).send({
          message: 'Auth not found with id ' + req.params.authId
        })
      }
      res.send(auth)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Auth not found with id ' + req.params.authId
        })
      }
      return res.status(500).send({
        message: 'Error retrieving auth with id ' + req.params.authId
      })
    })
}

// Update a auth identified by the authId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.userName) {
    return res.status(400).send({
      message: 'Auth userName can not be empty'
    })
  }

  // Find auth and update it with the request body
  Auth.findByIdAndUpdate(req.params.authId, {
    userName: req.body.userName || 'Untitled Auth',
    userPassword: req.body.userPassword,
    userId: req.body.userId,
    marks: req.body.marks
  }, { new: true })
    .then(auth => {
      if (!auth) {
        return res.status(404).send({
          message: 'Auth not found with id ' + req.params.authId
        })
      }
      res.send(auth)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Auth not found with id ' + req.params.authId
        })
      }
      return res.status(500).send({
        message: 'Error updating auth with id ' + req.params.authId
      })
    })
}

// Delete a auth with the specified authId in the request
exports.delete = (req, res) => {
  Auth.findByIdAndRemove(req.params.authId)
    .then(auth => {
      if (!auth) {
        return res.status(404).send({
          message: 'Auth not found with id ' + req.params.authId
        })
      }
      res.send({ message: 'Auth deleted successfully!' })
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Auth not found with id ' + req.params.authId
        })
      }
      return res.status(500).send({
        message: 'Could not delete auth with id ' + req.params.authId
      })
    })
}
