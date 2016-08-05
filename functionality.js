var dataAboutMe = {
   myFace : "images/Face.jpg",
   education : [],
   projects : [
         {
            projectName : "Data Driven Website",
            projectDescription : "Data Driven Website made with Handlebars.js templates on the same page. ",
            projectUsed : ["JavaScript", "HTML", "CSS", "jQuery", "Handlebars.js"],
            projectUrl : "http://yhidalgo.github.io/projects/2_2_Data_Driven_Website/index.html"
         },{
            projectName : "Social Website Aggregator",
            projectDescription : "Website with persistent data (MongoDB) shared among different users concurrently that gets updated without the user refreshing the page (Meteor framework functionality). It also has user authentication for extra features, like add a website to the list. This site is deployed in Heroku (because github pages wouldn't support it) for free, which has the the limitation of being accessible at most 18 hours per day, because the free account is not meant to be used for production. ",
            projectUsed : ["JavaScript", "HTML", "CSS", "jQuery", "MongoDB", "Meteor framework (which includes Node.js)", "Spacebars (template language inspired by Handlebars; used by default by Meteor)"],
            projectUrl : "https://social-website-aggregator.herokuapp.com/"
         }
      ]
};

var educationTemplate, projectsTemplate;

$(document).ready(function(){
   
   function showTemplate(template, data, contentName) {
      var html = template(data);
      $((contentName)).html(html);
   }
   
   /* Smooth scrolling */
   $('a.my-js-smoothScrolling').click(function(){
      $('html, body').animate({
         scrollTop: $( $(this).attr('href') ).offset().top
      }, 3000);
      return false;
   });
   
   
   educationTemplate = Handlebars.compile($("#educationTemplate").html());
   projectsTemplate = Handlebars.compile($("#projectsTemplate").html());
   
   showTemplate(educationTemplate,dataAboutMe,"#contentEducationTemplate");
   showTemplate(projectsTemplate,dataAboutMe,"#contentProjectsTemplate");
   
});

