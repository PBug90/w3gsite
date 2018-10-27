const jwt = require('jsonwebtoken');

module.exports = {
  tokenGenerator: (username = 'testuser', globalRoles = [], _id = '5b06c7040b129521244c6c88') =>
    jwt.sign(
      {
        _id,
        username: username,
        globalRoles
      },
      'secret'
    ),
  initDatabase: async (dbInstance) => {
    await dbInstance.dropDatabase();
  }
};
