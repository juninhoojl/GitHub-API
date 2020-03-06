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
        
        var outhtml = '<h2>'+nomeTodo+'<p><img src="'+aviurl+'" width="100" height="100" alt="'+'"></a></div>';
        
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
          $('#seguidores').html(followersnum);
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



