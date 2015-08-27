// run this when the meteor app is started
Meteor.startup(function() {

  // if there are no video available create sample data
  if (Videos.find().count() === 0) {

    // create sample video
    var sampleVideos = [
      {
        title: 'Sample Video 1',
        createdAt: new Date('August 20, 2015 03:24:00'),
        isLive: true,
        views: 410,
        uniqueViewers: 41,
        facebookShares: 10,
        tweets: 10,
        location: 'Philadlephia, PA',
        genres: ["Rock", "Metal", "Rap"],
        creator: 'LivMic' //this should be a User
        //videodata: videodata
      },
      {
        title: 'Sample Video 2',
        createdAt: new Date('August 19, 2015 03:24:00'),
        isLive: false,
        views: 10,
        uniqueViewers: 5,
        facebookShares: 2,
        tweets: 1,
        location: 'Beijing, China',
        genres: ["Jazz"],
        creator: 'LivMic\'s Best Friend' //this should be a User
        //videodata: videodata
      },
      {
        title: 'Sample Video 3',
        createdAt: new Date('August 18, 2015 03:24:00'),
        isLive: false,
        views: 1029,
        uniqueViewers: 420,
        facebookShares: 100,
        tweets: 200,
        location: 'New York City, New York',
        genres: ["Rock"],
        creator: 'Some Guy' //this should be a User
        //videodata: videodata
      }
    ];

    // loop over each sample videos and insert into database
    _.each(sampleVideos, function(video) {
      var id = Videos.insert(video);
      generateMicRating(id);
    });

    var sampleGenres = [
      {
        name: "Acid Fusion"
      }, 
      {
        name: "Karaoke"
      }
    ];
    _.each(sampleGenres, function(genre) {
      Genres.insert(genre);
    });
    var sampleLocations = [
      {
        name: "Boston, MA"
      }, 
      {
        name: "Chambersburg, PA"
      }
    ];
    _.each(sampleLocations, function(location) {
      Locations.insert(location);
    });
  }

  //this should be called every time a video is viewed, shared, etc. - maybe even every minute? is that overkill?
  //algorithm: (shares * 2) + (1 view per every 5 viewers) * 1.5(if live) / hours since creation 
  //only downside = this gives absurd boost to immediately-published vids...maybe good?
  function generateMicRating(id){
    var video = Videos.findOne(id);
    var micRating = 0;
    var views = (video.views * (video.uniqueViewers / 5));
    var shares = (video.facebookShares + video.tweets) * 2;
    var multiplier = ( (Date.now() / 1000 / 60 / 60) - (video.createdAt.getTime() / 1000 / 60 / 60) );
    micRating += shares;
    micRating += views;
    if( video.isLive ){
      micRating *= 1.5;
    }
    micRating /= multiplier;
    Videos.update(id, {$set: {micRating: micRating}});
  }

  //populate genre and location list - NEEDS IMPROVEMENT: this is not efficient
  var genres = Genres.find();
  var locations = Locations.find();
  genres.forEach(function (genre){
    Genres.update(this._id, {$set: {hasVideo: false}});
  });
  locations.forEach(function (location){
    Locations.update(this._id, {$set: {hasVideo: false}});
  });
  var currentVideos = Videos.find();
  currentVideos.forEach(function (video) {
    video.genres.forEach(function (genre){
      if( Genres.findOne({name: genre}) ){
        Genres.update(this._id, {$set: {hasVideo: true}});
      }else{
        Genres.insert({name: genre, hasVideo: true});
      }
    });
    if( Locations.findOne({name: video.location}) ){
      Locations.update(this._id, {$set: {hasVideo: true}});
    }else{
      Locations.insert({name: video.location, hasVideo: true});
    }
  });

});