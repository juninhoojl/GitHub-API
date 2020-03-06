$(function(){


  $('#botao').on('click', function(e){
    e.preventDefault();

    $('#ghapidata').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');
    
    var username = $('#entrada').val();

    var requri   = 'https://api.github.com/users/'+username;

    var repouri  = requri+'/repos';
    
    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        $('#ghapidata').html("<h2>Usuario nao encontrado</h2>");
      }
      
      else {
        // else we have a user and we display their info
        var nomeTodo = json.name;
        var username = json.login;
        var aviurl = json.avatar_url;
        var profileurl = json.html_url;
        var location = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum = json.public_repos;
        
        if(nomeTodo == undefined) { 
          nomeTodo = username; 
        }
        
        //var outhtml = '<h2>'+nomeTodo+'<p><img class="foto" src="'+aviurl+'" width="200" height="200" alt="'+'"></a></div>';

        var outhtml = '<div id="perfiluser" class="row"><div class="perfil col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center"><img src="img/imgteste.jpeg" class="foto img-responsive"></div><div class="perfil col-xl-4 col-lg-4 col-md-4 col-sm-12 text-left"><div class="nome-completo"><p><p>José Luiz Corrêa Junior</div><div class="nome-usuario">juninhoojl<p></div><hr><div class="texto-perfil">TEXTO</div></div><div class="perfil col-xl-4 col-lg-4 col-md-4 col-sm-12 text-left"><p><p><div class="nome-usuario"><p><i class="fa fa-users" aria-hidden="true"></i> 13 Seguidores<p><i class="fa fa-folder" aria-hidden="true"></i> 33 Repositórios<p><i class="fa fa-clock" aria-hidden="true"></i> Ultima Atividade<p><i class="fa fa-map-marker" aria-hidden="true"></i> Location<p></div></div></div>';

        var repositories;
        $.getJSON(repouri, function(json){
          repositories = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {

        // Se nao tiver nenhum repositorio
          if(repositories.length == 0) {
           outhtml = outhtml + '<p>No repos!</p></div>'; 
         } else {

            
            // Inicia container cards

            outhtml += '<div class="card-columns">';
    
            $.each(repositories, function(index) {
              var repname = repositories[index].name;
              var linkd = repositories[index].html_url+'/archive/master.zip';
              var repdesc = repositories[index].description;

              faicon = '<a href="'+linkd+'"><i class="fa fa-download icone" aria-hidden="true"></i></a> ';

              outhtml += '<div class="card">';
              outhtml +=  '<div class="card-header">'+faicon+repname+'</div>';
              outhtml +=  '<div class="card-body">'+repdesc+'</div>'; 
              outhtml +=  '<div class="card-footer">'+linkd+'</div>';
              outhtml += '</div>';

            });

            outhtml += '</div>';
            
        }

        // Coloca dados na tela
          
          $('#ghapidata').html(outhtml);

        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call

  }); // end click event handler
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }


});



