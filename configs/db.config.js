 const mongoose = require ('mongoose');
const BD_NAME = 'ex-passport-roles';
const MONGODB_URI = `mongodb://localhost:27017/${BD_NAME}`;

mongoose.connect(MONGODB_URI)
    .then(()=> console.info(`${BD_NAME} conected to:${MONGODB_URI}`))

    .catch(error => console.error(error))
