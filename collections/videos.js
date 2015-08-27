//this is a horrible mix of bullshit, separate routes from Collections
Videos = new Mongo.Collection('videos');
Genres = new Mongo.Collection('genres');
Locations = new Mongo.Collection('locations');
Router.configure({
	layoutTemplate: 'home',
	data: function(){ 
		if( Session.get("sort") == "genre" ){
      		if( Session.get("genresSelected").length === 0 ){
      			return Videos.find();
      		}else{
      			return Videos.find({genres: {$in: Session.get("genresSelected") }});
      		}
      	}else if( Session.get("sort") == "topRated"){
      		return Videos.find({}, {sort: {maxMicRating: -1}});
      	}else if( Session.get("sort") == "location"){
      		if( Session.get("locationsSelected").length === 0 ){
      			return Videos.find();
      		}else{
      			return Videos.find({location: {$in: Session.get("locationsSelected") }});
      		}
      	}else if( Session.get("sort") == "trending"){
      		return Videos.find({}, {sort: {micRating: -1}});
      	}
      	else{
      		return Videos.find();
      	}
    }
})
Router.route('/',{
	name: 'home',
	template: 'home',
	layoutTemplate: 'home',
	action: function(){
		this.render( '', {to: 'searchArea'}); //cannot possibly be correct
	}
});
Router.route('/genres',{
	name: 'genre',
	template: 'home',
	layoutTemplate: 'home',
	action: function(){
		this.render('genreSearch', {to: 'searchArea'});
	}
});
Router.route('/locations',{
	name: 'location',
	template: 'home',
	layoutTemplate: 'home',
	action: function(){
		this.render('locationSearch', {to: 'searchArea'});
	}
});