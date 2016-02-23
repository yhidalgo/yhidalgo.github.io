
var categoryTemplate, animalsTemplate, detailedAnimalTemplate;

var currentCategory = animals_data.category[0];
var currentAnimal = currentCategory.animals[0];
var currentAnimalCategory = currentCategory; //Necessary for the breadcrumbs navigation

function showTemplate(template, data) {
   var html = template(data);
   $("#content").html(html);
}

$(document).ready(function(){
   Handlebars.registerHelper('toLowerCase', function(str) {
      return str.toLowerCase();
   });
   Handlebars.registerHelper('ifRequiresN', function(word) {
  if(word[0] === 'a' || word[0] === 'A') {
    return 'n';
  } else {
      return '';
  }
});
   
   categoryTemplate = Handlebars.compile($("#categoryTemplate").html());
   animalsTemplate = Handlebars.compile($("#animalsTemplate").html());
   detailedAnimalTemplate = Handlebars.compile($("#detailedAnimalTemplate").html());
   
   function viewDetailedAnimal(currentAnimal) {
      showTemplate(detailedAnimalTemplate,currentAnimal);
      $(".my-js-navigationTab").removeClass("active");
      $("#my-js-detailedAnimalTab").addClass("active");
      $(".my-js-currentCategory").html(currentAnimalCategory.name);
      
      $(".my-js-categoryBreadcrumb").click(function() {
         currentCategory = currentAnimalCategory;
         viewAnimals(currentAnimalCategory);
      });
      $(".my-js-allCategoriesBreadcrumb").click(function () {
         $("#my-js-categoryTab").click();
      });
      
      /* Smooth scrolling */
      $('a.my-js-smoothScrolling').click(function(){
         $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top
         }, 3000);
         return false;
      });
   }
   
   $("#my-js-detailedAnimalTab").click(function(){
      viewDetailedAnimal(currentAnimal);
   });
   
   
   function viewAnimals(category){
      showTemplate(animalsTemplate,category);
      $(".my-js-navigationTab").removeClass("active");
      $("#my-js-animalsTab").addClass("active");
      $(".my-js-animal").click(function () {
         var currentAnimalIndex = $(this).data("id");
         currentAnimal = currentCategory.animals[currentAnimalIndex];
         currentAnimalCategory = currentCategory;
         viewDetailedAnimal(currentAnimal);
      });
      $(".my-js-allCategoriesBreadcrumb").click(function () {
         $("#my-js-categoryTab").click();
      });
   };
   $("#my-js-animalsTab").click(function() {
      viewAnimals(currentCategory);
   });
   
   
   $("#my-js-categoryTab").click(function () {
      showTemplate(categoryTemplate,animals_data);
      
      $(".my-js-navigationTab").removeClass("active");
      $("#my-js-categoryTab").addClass("active");
      
      $(".my-js-category").click(function () {
         var currentCategoryIndex = $(this).data("id");
         currentCategory = animals_data.category[currentCategoryIndex];
         viewAnimals(currentCategory);
      });
   });
   
   $("#my-js-categoryTab").click();
   
   
   /*  The cookiesdirective.js script provides compliance with the 'Cookies Directive' law passed on 2011 by the European Commission requiring european business websites to obtain consent to use cookies (even if implicit) from users.  http://cookiesdirective.com/ */
   function cookieController() {
      // Load Google Analytics to header
      $.cookiesDirective.loadScript({
         uri:'google.js',                 //TODO
         appendTo: 'header'
      });      
         // Load My Stats to body (default)
      $.cookiesDirective.loadScript({
         uri:'mystats.js'                //TODO
      });
   }   
   $.cookiesDirective({
      explicitConsent: false, // false allows implied consent; default is true
      position: 'bottom', // top or bottom of viewport; default is 'top'
      duration: 5, // display time in seconds; default is 10
      limit: 0, // limit disclosure appearances, 0 is forever; default is 0
      message: null, // customize the disclosure message; default is null             //TODO
      cookieScripts: null, // disclose cookie settings scripts; default is null       //TODO
      privacyPolicyUri: 'my-privacy-policy.html',                                      //TODO
      cookieScripts: 'Google Analytics,My Stats',                                      //TODO
      scriptWrapper: cookieController,
      fontFamily: 'helvetica', // font style for disclosure panel; default 'helvetica'
      fontColor: '#000000', // font color for disclosure panel; default '#FFFFFF'
      fontSize: '10px', // font size for disclosure panel; default '13px'
      backgroundColor: '#EEEEEE', // background color of disclosure panel; default '#000000'
      backgroundOpacity: '90', // opacity of disclosure panel; default '80'
      linkColor: '#CA0000' // link color in disclosure panel; default '#CA0000'
   });
   /* End of 'Cookies Directive' compliance code */
   
});

