(function (){
  
  Parse.initialize("BEiVoA2Ecm0hX0it3pVC6dO5XRdzPLAVV3bwdCOO", "zYfjSH2F5Zt5k38aa2yZTMbu83TsAkLZhz9PnBJR");
  
  $(document)
    .on('click', '.btn-close', function (e){
    e.preventDefault();
    $('.about').hide();
  }).on('click', '.btn-about', function (e){
    e.preventDefault();
    $('.about').show();
  });
  
  var container = $('.content'),
      Link = Parse.Object.extend("Link"),
      LinkCollection = Parse.Collection.extend({
        model: Link
      }),
      links = new LinkCollection(),
      Category = Parse.Object.extend("Category"),
      CategoryCollection = Parse.Collection.extend({
        model: Category,
        query: (new Parse.Query(Category)).ascending("order")
      }),
      categories = new CategoryCollection(),
      cateTemplate = Handlebars.compile($("#category").html()),
      linkTemplate = Handlebars.compile($("#link").html());
  
  categories.fetch().then(function (result){
    result.each(function (category) {
      var section = cateTemplate({
            id: category.id,
            name: category.get("name"),
            icon: category.get("icon"),
          });
      container.append(section);
      var ul = $('#' + category.id),
          query = new Parse.Query(Link);
      query.equalTo("category", category);
      query.ascending("order");
      links = query.collection();
      
      links.fetch().then(function(result) {
        result.each(function(link) {
          var li = linkTemplate({
            name: link.get("name"),
            url: link.get("url"),
            desc: link.get("desc"),
            isPaid: link.get("isPaid"),
            price: link.get("price")
          });
          ul.append(li);
        });
      });
    });
  });
})();