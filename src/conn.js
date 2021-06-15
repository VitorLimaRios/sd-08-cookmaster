const {MongoClient} = require('mongodb')


const URL_DATADB = 'mongodb://localhost:27017'

const DB = 'Cookmaster'

const OPTIONS = {
  useNewUrlParser:true,
    useUnifiedTopology:true;
}
const connection = ()=>{
  MongoClient
  .connect(URL_DATADB,OPTIONS)
  .then(conn=>conn.db(DB))
  .catch(err=>{
    console.err(err);
    process.exit(1)
  })
}


module.exports = connection