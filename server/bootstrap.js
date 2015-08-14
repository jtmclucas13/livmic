// run this when the meteor app is started
Meteor.startup(function() {

  // if there are no video available create sample data
  if (Videos.find().count() === 0) {

    // create sample video
    var sampleVideos = [
      {
        title: 'Sample Video 1',
        createdAt: new Date(),
        isLive: true,
        viewers: 41,
        location: 'Philadlephia, PA',
        genres: ["Rock", "Metal", "Rap"],
        creator: 'LivMic' //this should be a User
        //data: data
      },
      {
        title: 'Sample Video 2',
        createdAt: new Date(),
        isLive: false,
        viewers: 5,
        location: 'Beijing, China',
        genres: ["Jazz"],
        creator: 'LivMic\'s Best Friend' //this should be a User
        //data: data
      }
    ];

    // loop over each sample videos and insert into database
    _.each(sampleVideos, function(video) {
      Videos.insert(video);
    });

  }

});