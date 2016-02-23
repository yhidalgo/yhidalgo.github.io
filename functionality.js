var dataAboutMe = {
   myFace : "images/Face.jpg",
   education : [],
   projects : [
         {
            projectName : "Data Driven Website",
            projectDescription : "Data Driven Website made with Handlebars.js templates on the same page. ",
            projectUsed : ["JavaScript", "HTML", "CSS", "jQuery", "Handlebars.js"],
            projectUrl : "http://yhidalgo.github.io/projects/2_2_Data_Driven_Website/index.html"
         },
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

