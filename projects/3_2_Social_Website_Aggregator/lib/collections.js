Websites = new Mongo.Collection("websites");


Websites.allow({
   insert:function(userId, doc){
      console.log("Checking it is ok to insert website if user is logged in");
      if (Meteor.user()) {
         return true;
      } else {
         return false;
      }
   },
   update:function(userId,doc,fieldNames,modifier){
      var patternUpvodeModifier = { 
         $inc: { voteCount: 1
//            Match.Where(function(voteCount) {
//               check(voteCount, Number);
//               return voteCount == 1;
//            })
         }
      };
      var patternDownvodeModifier = { 
         $inc: { voteCount: 
            Match.Where(function(voteCount) {
               check(voteCount, Number);
               return voteCount == -1;
            })
         }
      };
      try{
         check(modifier,Match.OneOf( patternUpvodeModifier, patternDownvodeModifier, patternAddComment));
      } catch (e) {
         console.log("update denied");
         console.log(e);
         return false;
      }
      console.log("update allowed");
      return true;
   }, // End of update for upvote & downvote
   // Start allow update for adding comment to website
   update:function(userId,doc,fieldNames,modifier){
      var patternAddComment = { 
         $addToSet: { 
            comments: { 
               commenter: Match.Where(
                  function(commenter){
                     check(commenter,String);
                     return commenter == Meteor.user().username;
                  }
               ),
               title: String, 
               body: String 
            }
         }
      };
      try{
         check(modifier,patternAddComment);
      } catch (e) {
         console.log("update denied");
         console.log(e);
         return false;
      }
      console.log("update allowed");
      return true;
   } // End allow update for adding comment to website
});