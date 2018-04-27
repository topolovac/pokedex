<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokedex</title>
    <link rel="stylesheet" href="https://bootswatch.com/4/minty/bootstrap.min.css">
    <link type="text/css" rel="stylesheet" href="main.css">
    <script
  src="http://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
  </head>
  <body>

    <div class="custom-container">
      <div class="main">
        <div><h1 id="main-title">Pokedex</h1></div>
        <div class="search">
          <div class="search-header">
            <input type="text" placeholder="search" id="search-input">
            <p class="search-alert">Pokemon not found!<p>
          </div>
          <div class="search-body scroll">
            <ul id="pokelist">
            </ul>
          </div>
        </div>
        <div class="loading">
          <h3>Loading pokemons...</h3>
        </div>
      </div>
    </div>

    <div class="pokemon-info">
      <div class="info">
        <button id="close-info" class="btn btn-success"><</button>
        <h3 id="name"></h3>
        <div id="image"></div>
        <h3 id="height"></h3>
        <h3 id="weight"></h3>
        <h3 id="abilities"></h3>
        <h3>Stats:</h3>
        <div id="stats">
        </div>
      </div>
    </div>
    <script type="text/javascript" src="main.js"></script>
  </body>
</html>
