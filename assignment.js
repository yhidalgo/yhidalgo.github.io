
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
});

