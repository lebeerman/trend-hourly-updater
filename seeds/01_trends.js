exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('hourlytrends')
    .del()
    .then(() => {
      return knex('hourlytrends').insert([
        {
          name: '#NationalPancakeDay',
          url: 'http://twitter.com/search?q=%23NationalPancakeDay',
          promoted_content: null,
          query: '%23NationalPancakeDay',
          tweet_volume: 21376
        },
        {
          name: '#FelizMartes',
          url: 'http://twitter.com/search?q=%23FelizMartes',
          promoted_content: null,
          query: '%23FelizMartes',
          tweet_volume: 38067
        },
        {
          name: '#27Feb',
          url: 'http://twitter.com/search?q=%2327Feb',
          promoted_content: null,
          query: '%2327Feb',
          tweet_volume: 33713
        },
        {
          name: '#Danilo27F',
          url: 'http://twitter.com/search?q=%23Danilo27F',
          promoted_content: null,
          query: '%23Danilo27F',
          tweet_volume: null
        }
      ]);
    });
};
