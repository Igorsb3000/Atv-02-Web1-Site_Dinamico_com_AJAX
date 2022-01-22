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

function mostrar_filtros_todos(){
    let opcoes = document.getElementById("sub-opcoes");
    opcoes.style.visibility = "visible";

   /* let novoRadio = document.createElement('input');
    novoRadio.setAttribute("type", "radio");
    novoRadio.setAttribute("name", "sub-filtros");
    novoRadio.setAttribute("value", "Todas as tarefas");
    novoRadio.setAttribute("id", "4");
    let novoLabel = document.createElement('label');
    novoLabel.setAttribute("for", "4");
    novoLabel.textContent = "Todas as tarefas";
    opcoes.appendChild(novoRadio);
    opcoes.appendChild(novoLabel);

    var quebra_linha = document.createElement('br');
    opcoes.appendChild(quebra_linha);
    
    novoRadio = document.createElement('input');
    novoRadio.setAttribute("type", "radio");
    novoRadio.setAttribute("name", "sub-filtros");
    novoRadio.setAttribute("value", "Tarefas Finalizadas");
    novoRadio.setAttribute("id", "5");
    novoRadio.value = "TESTE";
    //novoLabel = document.createElement('label');
    //novoLabel.setAttribute("for", "5");
    //novoLabel.textContent = "Tarefas Finalizadas";
    opcoes.appendChild(novoRadio);
    //opcoes.appendChild(novoLabel);

    var quebra_linha = document.createElement('br');
    opcoes.appendChild(quebra_linha);
    
    novoRadio = document.createElement('input');
    novoRadio.setAttribute("type", "radio");
    novoRadio.setAttribute("name", "sub-filtros");
    novoRadio.setAttribute("value", "Tarefas Não Finalizadas");
    novoRadio.setAttribute("id", "6");
    novoLabel = document.createElement('label');
    novoLabel.setAttribute("for", "6");
    novoLabel.textContent = "Tarefas Não Finalizadas";
    opcoes.appendChild(novoRadio);
    opcoes.appendChild(novoLabel);*/


}

function limpar_filtros_todos(){
    let item = document.getElementById("sub-opcoes");
    item.style.visibility = "hidden";
    /*let item1 = document.getElementsByName("sub-filtros");
	listagem.removeChild(item1[0]);*/
}
// Minhas funcoes:
function montar_select(response){
    //let menu = document.getElementById("usuario");
    console.log(response);
    let objeto_usuario = JSON.parse(response);
    for(i=0; i<objeto_usuario.length; i++){
        let nome = objeto_usuario[i].name;
        let id = objeto_usuario[i].id;
        let nova_opcao = new Option(nome, id);
        document.getElementById("usuario").appendChild(nova_opcao);
    }
} 


function atualizar_tela(id_usuario, id_filtro){
    switch (id_filtro){
        case '2':
            limpar_filtros_todos();
            xhttpAssincrono(atualizar_tela_post, 2, id_usuario);
            break;
        case '3':
            mostrar_filtros_todos();
            xhttpAssincrono(atualizar_tela_todos, 3, id_usuario);
            break;

    }
    
    
}

function atualizar_tela_todos(response){
    document.getElementById("titulo").innerHTML = "Tarefas do usuário";

    let objeto_todos = JSON.parse(response);
    console.log(objeto_todos);
    let listagem = document.getElementById("lista");
    //console.log(objeto_todos[20].title);
    for(i=0; i<objeto_todos.length; i++){
        let titulo = objeto_todos[i].title;
        let concluido = objeto_todos[i].completed;
        let novoItem = document.createElement('li');
        novoItem.innerText = "Concluída: " + concluido + " - " + titulo;
        listagem.appendChild(novoItem);
    }

}


function atualizar_tela_post(response){
    document.getElementById("titulo").innerHTML = "Posts do usuário";
    let objeto_post = JSON.parse(response);
    let listagem = document.getElementById("lista");

    for(i=0; i<objeto_post.length; i++){
        let post = objeto_post[i].title;
        let novoItem = document.createElement('li');
        novoItem.innerText = post;
        listagem.appendChild(novoItem);
    }
    //console.log(objeto_usuario[0].title);
}


function limpar_tela(){
    let listagem = document.getElementById('lista');
	while(listagem.children.length > 0) {
		listagem.removeChild(listagem.children[0]);
	}
}


function buscar_usuario(nome){
    console.log("Selecionado: " + nome);
}


function atualizar_menu(){
    console.log("apertou");
    xhttpAssincrono(montar_select, 1, null);
}