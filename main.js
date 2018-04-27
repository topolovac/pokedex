$(document).ready(function(){
  console.log("Document ready!");
  var pokemonList = [];
  setPokemonList();

  $("#search-input").on("change paste keyup", function() {
   var value = $(this).val();
   if(value != ""){
     hideListItems();
     findPokemons(value);
   } else {
     showListItems();
     $(".search-alert").hide();
   }
 })

 $("#close-info").on("click",function(){
   $(".pokemon-info").hide();
 })

  function setPokemonList(){
    $.get({
      url:'https://pokeapi.co/api/v2/pokedex/1/',
      error:function(e){
        console.log("Error fetching pokemon list:",e);
      },
      success:function(data){
        for(var i=0;i<data.pokemon_entries.length;i++){
          pokemonList.push(data.pokemon_entries[i]);
          //var html = '<li id="' + i + '" >' + data.pokemon_entries[i].pokemon_species.name + '</li>';
          var html = `
            <li id="` + i + `" name="` + data.pokemon_entries[i].pokemon_species.name + `">
              <div class="list-item">
                <div class="item-title"><h4>` + capitalizeFirstLetter(data.pokemon_entries[i].pokemon_species.name) + `</h4></div>
                <div class="item-img"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`+(i+1)+`.png"></div>
                <div class="item-button"><button class="btn btn-primary">Add</button></div>
              </div>
            </li>`

          $("#pokelist").append(html);
        }
        setEventHandlers(i);
        $(".search").show();
        $(".loading").hide();
      }
    })
  }

  function setEventHandlers(id){
    $("li").on('click',function(){
      var id = $(this).attr('id');
      showPokemonInfo(id);
    })
  }

  function hideListItems() {
    var listLength = $("li").length;
    for(var i=0;i<listLength;i++){
      $("#" + i).hide();
    }
  }

  function showListItems() {
    var listLength = $("li").length;
    for(var i=0;i<listLength;i++){
      $("#" + i).show();
    }
  }

  function findPokemons(value){
    var found = false;
    var listLength = $("li").length;
    value = value.toLowerCase();
    for(var i=0;i<listLength;i++){
      var name = $("#" + i).attr('name');
      var part = name.slice(0,value.length);
      if(part == value){
        found = true;
        $("#" + i).show();
      }
    }

    if(!found){
      $(".search-alert").show();
      showListItems();
    } else {
      $(".search-alert").hide();
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function showPokemonInfo(id){
    console.log(pokemonList[id]);
    var name = pokemonList[id].pokemon_species.name;
    $.get({
      url:'https://pokeapi.co/api/v2/pokemon/'+name+"/",
      error:function(e){
        console.log("Error fetching pokemon info:",e);
      },
      success:function(data){
        console.log("Succes getting pokemon info:",data);
        $(".pokemon-info").show();
        $("#name").html("Name: "+data.name);
        $("#image").html('<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+data.id+'.png">');
        $("#height").html("Height: "+data.height);
        $("#weight").html("Weight: "+data.weight);
        var abilities = "";
        for(var d in data.abilities){
          var ext = ", ";
          if(d == data.abilities.length-1)ext = "";
          abilities += data.abilities[d].ability.name+ext;
        }
        $("#abilities").html("Abilities: "+abilities);

        var ahtml = '';
        for(var s in data.stats){
          var name = data.stats[s].stat.name;
          var stat = data.stats[s].base_stat;
          var html = '<h4>' + capitalizeFirstLetter(name) + ': ' + stat + '</h4><br>';
          ahtml += html;
        }
        $("#stats").html(ahtml);
      }
    })
  }
})
