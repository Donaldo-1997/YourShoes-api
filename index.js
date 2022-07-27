const server = require('./src/app.js');
const { conn } = require('./src/db.js');


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  
    const PORT = process.env.PORT || 3001
    server.listen(PORT, () => {
    console.log("%s listening at 3000"); // eslint-disable-line no-console
  });
});
