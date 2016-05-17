
Accounts.ui.config({
   passwordSignupFields:'USERNAME_AND_EMAIL'
});

	/////
	// iron:routing
	/////
	Router.configure({
	   layoutTemplate:'myApplicationLayout'
	});
	
	Router.route('/', function(){
	   this.render('navbarTemplate',{
	      to:"navbar"
	   });
	   this.render('website_list',{
	      to:"main"
	   });
	});
	
	Router.route('/singleWebsiteDetails/:_id', function(){
	   this.render('navbarTemplate',{
	      to:"navbar"
	   });
	   this.render('singleWebsiteDetails',{
	      to:"main", 
	      data:function(){
	         return Websites.findOne({_id:this.params._id});
	      }
	   });
	});
	
	/////
	// template helpers 
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({},{sort:{voteCount:-1, createdOn:-1}});
		}
	});
	
	Template.website_item.helpers({
		formatDate:function(date) {
		   var curr_date = date.getDate();
         var curr_month = date.getMonth() + 1; //Months are zero based
         var curr_year = date.getFullYear();
         return curr_year + "-" + curr_month + "-" + curr_date;
      }
	});

	/////
	// template events 
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);
			// put the code in here to add a vote to a website!
			console.log("Websites.update({_id:"+this._id+"},{$inc:{voteCount:1}});");
         Websites.update(
            {_id:this._id},
            {$inc:{voteCount:1}}
         );
			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Down voting website with id "+website_id);
			// put the code in here to remove a vote from a website!
         Websites.update(
            {_id:this._id},
            {$inc:{voteCount:-1}}
         );
			return false;// prevent the button from reloading the page
		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#js-website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){
			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			var title = event.target.title.value;
			var description = event.target.description.value;			
			//  put your website saving code in here!	
			var urlAlreadyExists = Websites.findOne({url:url});
			if(!urlAlreadyExists){
   			console.log("The url they entered is: "+url);
	   		Websites.insert({
          		title:title, 
    		      url:url, 
    	      	description:description, 
          		createdOn:new Date(),
          		voteCount:0
          	});
       	} else {
       	   console.log("The url already exists");
       	}
			return false;// stop the form submit from reloading the page
		}
	});
	
	Template.addCommentTemplate.events({
	   "click .js-toggle-comment-form":function(){
			$("#js-comment_form").toggle('slow');
		}, 
		"submit .js-save-comment-form":function(event){
			var commentTitle = event.target.commentTitle.value;
			var commentBody = event.target.commentBody.value;
			var website_id = event.target.website_id.value;
   		console.log("The website_id commented on is: "+website_id);
			var username = Meteor.user().username;
   		console.log("username is: "+username);
			var user_id = Meteor.userId();
   		console.log("user_id: "+user_id);
	   	Websites.update(
	   	   {_id:website_id},
			   {$addToSet:{comments: {commenter:username, title:commentTitle, body:commentBody} }}
   		);//Session.get("userFilter"
   		//Hide form after inserting comment
			$("#js-comment_form").toggle('slow');
			return false;// stop the form submit from reloading the page
		}
	});
	Template.addCommentTemplate.helpers({
	   username:function(){
         if (Meteor.user()){
           return Meteor.user().username;
         }
      }
   });
