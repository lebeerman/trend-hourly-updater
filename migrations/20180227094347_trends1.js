exports.up = (knex, Promise) => {
  return knex.schema.createTable('hourlytrends', table => {
    table.increments('id').primary();
    table.timestamp('date').defaultTo(knex.fn.now());
    table.text('name');
    table.text('url');
    table.text('promoted_content');
    table.text('query');
    table.integer('tweet_volume');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('hourlytrends');
};
