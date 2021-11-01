import { connect } from 'mongoose';

export default mainApp => {
  const { mongoURL } = mainApp.config.databases;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  connect(mongoURL, options, err => {
    if (err) throw err;
    console.log('[Mongo] База данных Mongo успешно подключена.');
  });
};
