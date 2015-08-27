//next:	duplicate genre with location search
//		implement Top Rated and Trending (review Prototype, update Video schema)
//		three types of accounts - free, premium, superior
//		website/viewer = almost no functionality
//		private GitHub repository for security? keep long-term security in mind
//		User Agreement when signing up for account

Template.home.helpers({
});

Template.genreSearch.helpers({
	genres: function(){
    	return Genres.find({}, {sort: { name: 1} });
    },
    selected: function(){
    	var sessionGenres = Session.get("genresSelected");
    	if( typeof sessionGenres != 'undefined'){
	    	for(var i = 0; i < sessionGenres.length; i++){
	    		if(sessionGenres[i] === this.name){
	    			return "selected";
	    		}
			}
		}
    }
});

Template.locationSearch.helpers({
	locations: function(){
    	return Locations.find({}, {sort: { name: 1} });
    },
    selected: function(){
    	var sessionLocations = Session.get("locationsSelected");
    	if( typeof sessionLocations != 'undefined'){
	    	for(var i = 0; i < sessionLocations.length; i++){
	    		if(sessionLocations[i] === this.name){
	    			return "selected";
	    		}
			}
		}
    }
});

Template.filterBar.events({
    'click .genreSearch': function(){
    	Session.set("sort", "genre");
    },
    'click .topRatedFilter': function(){
    	Session.set("sort", "topRated");
    },
    'click .locationSearch': function(){
    	Session.set("sort", "location");
    },
    'click .trendingFilter': function(){
    	Session.set("sort", "trending");
    },
});

Template.genreSearch.events({
	'click .selectable': function(event){
		Session.set("sort", "genre");
		var sessionGenres = Session.get("genresSelected");
		if( typeof sessionGenres === 'undefined'){
			sessionGenres = [];
			sessionGenres.push(this.name);
			Session.set("genresSelected", sessionGenres);
		}else{
			for(var i = 0; i < sessionGenres.length; i++){
				if(sessionGenres[i] === this.name){
					sessionGenres.splice(i, 1);
					Session.set("genresSelected", sessionGenres);
					return;
				}
			}
			sessionGenres.push(this.name);
			Session.set("genresSelected", sessionGenres);
		}
	}
});


Template.locationSearch.events({
	'click .selectable': function(event){
		Session.set("sort", "location");
		var sessionLocations = Session.get("locationsSelected");
		if( typeof sessionLocations === 'undefined'){
			sessionLocations = [];
			sessionLocations.push(this.name);
			Session.set("locationsSelected", sessionLocations);
		}else{
			for(var i = 0; i < sessionLocations.length; i++){
				if(sessionLocations[i] === this.name){
					sessionLocations.splice(i, 1);
					Session.set("locationsSelected", sessionLocations);
					return;
				}
			}
			sessionLocations.push(this.name);
			Session.set("locationsSelected", sessionLocations);
		}
	}
});