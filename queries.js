const database = require('./database-connection');

module.exports = {
  list(table) {
    return database(table).select();
  },
  read(id, table) {
    return database(table)
      .where('id', id)
      .first();
  },
  getTrendsByName(name, table) {
    return database(table)
      .where('name', name)
      .returning('*')
      .first();
  },
  createTrends(hourlytrends) {
    return database('hourlytrends')
      .insert(hourlytrends)
      .returning('*')
      .then(record => record[0]);
  },
  updateTrends(time, request) {
    return database('hourlytrends')
      .update(request)
      .where('time', time)
      .returning('*')
      .then(record => record);
  },
  deleteTrends(id) {
    return database('hourlytrends')
      .delete()
      .where('id', id);
  }
};