/*
*   Author: Igor Silva Bento
*/


/*
 * Função AJAX base do tipo assíncrona.
 * type é o tipo de objeto que você quer recuperar.
 * value é o valor do parâmetro para filtrar os resultados dos tipos 2, 3 e 4.
 * [Importante!] Você não pode, em nenhuma hipótese, alterar a função xhttpAssincrono.
 */
function xhttpAssincrono(callBackFunction, type, value) {
    var xhttp = new XMLHttpRequest();;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Chama a função em callback e passa a resposta da requisição
            callBackFunction(this.responseText);
        }
    };
    // Path para a requisição AJAX.
    var url = "http://jsonplaceholder.typicode.com/";
    switch (type) {
        case 1:
            url += "users"
            break;
        case 2:
            url += "posts?userId=" + value;
            break;
        case 3:
            url += "todos?userId=" + value;
            break;
        case 4:
            url += "comments?postId=" + value;
            break;
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}


// Atualiza o texto exibido de acordo com o Filtro selecionado
function atualizar_tela(id_usuario, id_filtro){
    switch (id_filtro){
        // Filtro User Posts
        case '2':
            limpar_filtros_todos();
            xhttpAssincrono(atualizar_tela_post, 2, id_usuario);
            break;
        // Filtro User TODOs
        case '3':
            mostrar_filtros_todos();
            xhttpAssincrono(atualizar_tela_todos, 3, id_usuario);
            break;
        // Status Todas as Tarefas
        case '4':
            mostrar_filtros_todos();
            xhttpAssincrono(atualizar_tela_todos, 3, id_usuario);
            break;
        // Status Tarefas Finalizadas
        case '5':
            mostrar_filtros_todos();
            xhttpAssincrono(atualizar_tela_todos_finalizadas, 3, id_usuario);
            break;
        // Status Tarefas Não Finalizadas
        case '6':
            mostrar_filtros_todos();
            xhttpAssincrono(atualizar_tela_todos_nao_finalizadas, 3, id_usuario);
            break;
    }   
}
// Variaveis Globais
var id_usuario_selecionado; // Guarda o ID do usuario selecionado
var id_radio_escolhido = null; // Guarda o ID do radio selecionado


// Funcao para atualizar o item Opcoes
function atualizar_filtro(){
    var radios = document.getElementsByName("filtros");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            id_radio_escolhido = radios[i].id;
            
            if(radios[i].id == '3'){ // Verifica as sub-opcoes (IDs: 4, 5 e 6)
                atualizar_status();
                break;
            }
        }
    }
    atualizar_tela(id_usuario_selecionado, id_radio_escolhido);
}


// Funcao para atualizar o Status do item Sub-Opcoes
function atualizar_status(){
    var radios = document.getElementsByName("sub-filtros");
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                id_radio_escolhido = radios[i].id;
            }
        }
    atualizar_tela(id_usuario_selecionado, id_radio_escolhido);

}



// Atualiza o item Select com o nome dos usuários assim que a página é carregada
function montar_select(response){
    let objeto_usuario = JSON.parse(response);
    for(i=0; i<objeto_usuario.length; i++){
        let nome = objeto_usuario[i].name;
        let id = objeto_usuario[i].id;
        let nova_opcao = new Option(nome, id);
        document.getElementById("usuario").appendChild(nova_opcao);
    }
} 

// Funcao que exibe todos os itens TODOs
function atualizar_tela_todos(response){
    limpar_tela();
    document.getElementById("titulo").innerHTML = "Tarefas do Usuário";

    let objeto_todos = JSON.parse(response);
    let listagem = document.getElementById("lista");
    for(i=0; i<objeto_todos.length; i++){
        let titulo = objeto_todos[i].title;
        let concluido = objeto_todos[i].completed;
        let novoItem = document.createElement('li');
        novoItem.innerText = "Concluída: " + concluido + " - " + titulo;
        listagem.appendChild(novoItem);
    }

}

// Funcao que filtra os itens TODOs, apenas os itens com a propriedade "completed" == true
function atualizar_tela_todos_finalizadas(response){
    limpar_tela();
    document.getElementById("titulo").innerHTML = "Tarefas do Usuário";

    let objeto_todos = JSON.parse(response);
    let listagem = document.getElementById("lista");

    for(i=0; i<objeto_todos.length; i++){
        let titulo = objeto_todos[i].title;
        let concluido = objeto_todos[i].completed;
        if(concluido == true){
            let novoItem = document.createElement('li');
            novoItem.innerText = "Concluída: " + concluido + " - " + titulo;
            listagem.appendChild(novoItem);
        }
    }
}

// Funcao que filtra os itens TODOs, apenas os itens com a propriedade "completed" == false
function atualizar_tela_todos_nao_finalizadas(response){
    limpar_tela();
    document.getElementById("titulo").innerHTML = "Tarefas do Usuário";

    let objeto_todos = JSON.parse(response);
    let listagem = document.getElementById("lista");
 
    for(i=0; i<objeto_todos.length; i++){
        let titulo = objeto_todos[i].title;
        let concluido = objeto_todos[i].completed;
        if(concluido == false){
            let novoItem = document.createElement('li');
            novoItem.innerText = "Concluída: " + concluido + " - " + titulo;
            listagem.appendChild(novoItem);
        }
    }
}




// Exibe o texto quando o filtro TODOs foi selecionado
function atualizar_tela_post(response){
    limpar_tela();
    document.getElementById("titulo").innerHTML = "Posts do Usuário";
    let objeto_post = JSON.parse(response);
    let listagem = document.getElementById("lista");

    for(i=0; i<objeto_post.length; i++){
        let post = objeto_post[i].title;
        let novoItem = document.createElement('li');
        novoItem.innerText = post;
        listagem.appendChild(novoItem);
    }
}

// Apaga o texto da tela, sempre que um novo filtro é selecionado
function limpar_tela(){
    let listagem = document.getElementById('lista');
	while(listagem.children.length > 0) {
		listagem.removeChild(listagem.children[0]);
	}
}

// Funcao que recupera o nomes do usuarios
function atualizar_menu(){
    xhttpAssincrono(montar_select, 1, null);
}


// Exibe os filtro de Status do item User TODOs
function mostrar_filtros_todos(){
    let opcoes = document.getElementById("sub-opcoes");
    opcoes.style.visibility = "visible";
}

// Remove os filtro de Status do item User TODOs
function limpar_filtros_todos(){
    let item = document.getElementById("sub-opcoes");
    item.style.visibility = "hidden";
}
