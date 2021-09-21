import mongoose from 'mongoose';


const URI = "mongodb+srv://monneyRunners:RIbb0wMDzo6xupmh@dev.4jkas.mongodb.net/monneyRunners?retryWrites=true&w=majority";

let options = {};

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
  .connect(URI, options)
  .then(() => console.log('DB started!'))
  .catch((err) => console.log(err));