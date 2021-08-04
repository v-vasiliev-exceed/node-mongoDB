module.exports = (app) => {
  const auth = require('../controllers/auth.controller.js')

  // Create a new Note
  app.post('/auth', auth.create)

  // Retrieve all Notes
  app.get('/auth', auth.findAll)

  // Retrieve a single Note with noteId
  app.get('/auth/:authId', auth.findOne)

  // Update a Note with noteId
  app.put('/auth/:authId', auth.update)

  // Delete a Note with noteId
  app.delete('/auth/:authId', auth.delete)
}
