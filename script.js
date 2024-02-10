function getInfos(){
    const opcao = document.getElementById("opcao").value;
    const busca = document.getElementById("busca").value;
    const show = document.getElementById('showInfos');
    const url = `https://swapi.dev/api/${opcao}/?search=${busca}`;
    
    fetch(url, {
        method: 'GET',

        headers:{
            'Content-Type': 'application/json'
        },
    })
    .then(response =>{
         if(!response.ok){
            throw new Error('Não encontrado')
         }
        return response.json();
    })
    .then(data => {
        showInfos(data);
    })
    .catch(error => {
        alert(error.message);
    })


    function showInfos(data) {
        const opcao = document.getElementById("opcao").value;
        show.innerHTML = '';
        data.results.forEach(item => {
            const resultItem = document.createElement('div');
            if(opcao == 'films'){
                resultItem.textContent = item.title;
            }else{
                resultItem.textContent = item.name;
            }
            resultItem.className = 'resultados'
            if(opcao == 'people'){
                resultItem.onclick = function(){
                    fetch(item.homeworld, {
                        method: "GET",

                        headers:{
                            'Content-Type': 'application/json'
                        },
                    })
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Não encontrado');
                        }
                        return response.json()
                    })
                    .then(data => {
                        const planeta_natal = data.name;

                        show.innerHTML = `
                        <h1>${item.name}<h1>
                        <table class='table-resultados'>
                            <tr>
                                <td>Ano de aniversario</td>
                                <td> ${item.birth_year}</td>
                            </tr>
                            <tr>
                                <td>Genero</td>
                                <td> ${item.gender}</td>
                            </tr>
                            <tr>
                                <td>Altura</td>
                                <td> ${item.height}</td>
                            </tr>
                            <tr>
                                <td>Peso</td>
                                <td> ${item.mass}</td>
                            </tr>
                            <tr>
                                <td>Planete natal</td>
                                <td> ${planeta_natal}</td>
                            </tr>
                        </table>
                    `
                    })
                    .catch(error => {
                        alert(error.message);
                    })
                }   
            }
            if(opcao == 'planets'){
                resultItem.onclick = function(){
                    show.innerHTML = `
                    <h1>${item.name}<h1>
                    <table class='table-resultados'>
                        <tr>
                            <td>Clima</td>
                            <td> ${item.climate}</td>
                        </tr>
                        <tr>
                            <td>Duração do ano</td>
                            <td> ${item.orbital_period} dias</td>
                        </tr>
                        <tr>
                            <td>Força da gravidade</td>
                            <td> ${item.gravity}</td>
                        </tr>
                        <tr>
                            <td>Terreno</td>
                            <td> ${item.terrain}</td>
                        </tr>
                    </table>
                    `
                }
            }
            if(opcao == 'films'){
                resultItem.onclick = function(){
                    show.innerHTML = `
                    <h1>${item.title}<h1>
                    <table class='table-resultados'>
                        <tr>
                            <td>Texto de abertura</td>
                            <td><button id="abertura" class="abertura">Clique aqui para ler</button></td>
                        </tr>
                        <tr>
                            <td>Episodio:</td>
                            <td> ${item.episode_id}</td>
                        </tr>
                        <tr>
                            <td>Diretor:</td>
                            <td> ${item.director}</td>
                        </tr>
                        <tr>
                            <td>Produtor:</td>
                            <td> ${item.producer}</td>
                        </tr>
                        <tr>
                            <td>Data de lançamento:</td>
                            <td> ${item.release_date}</td>
                        </tr>
                    </table>
                    
                    `;
                    document.getElementById("abertura").onclick = function() {
                        alert(item.opening_crawl);
                    }
                }
            }
            if(opcao == 'starships'){
                resultItem.onclick = function(){
                    show.innerHTML = `
                        <h1>${item.name}<h1>
                            <table class='table-resultados'>
                                <tr>
                                    <td>Modelo</td>
                                    <td> ${item.model}</td>
                                </tr>
                                <tr>
                                    <td>Classe</td>
                                    <td> ${item.starship_class}</td>
                                </tr>
                        `
            }
        }
            if(opcao == 'vehicles'){
                resultItem.onclick = function(){
                    show.innerHTML = `
                        <h1>${item.name}<h1>
                            <table class='table-resultados'>
                                <tr>
                                    <td>Modelo</td>
                                    <td> ${item.model}</td>
                                </tr>
                                <tr>
                                    <td>Classe</td>
                                    <td> ${item.vehicle_class}</td>
                                </tr>
                        `
            }
        }
        if(opcao == 'species'){
            resultItem.onclick = function(){
                fetch(item.homeworld, {
                    method: "GET",

                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const planeta_origem = data.name;

                    show.innerHTML = `
                    <h1>${item.name}<h1>
                    <table class='table-resultados'>
                        <tr>
                            <td>Altura média</td>
                            <td> ${item.average_height} cm</td>
                        </tr>
                        <tr>
                            <td>Estimativa de vida</td>
                            <td> ${item.average_lifespan} anos</td>
                        </tr>
                        <tr>
                            <td>Classificação</td>
                            <td> ${item.classification}</td>
                        </tr>
                        <tr>
                            <td>Linguagem</td>
                            <td> ${item.language}</td>
                        </tr>
                        <tr>
                            <td>Planete de origem</td>
                            <td> ${planeta_origem}</td>
                        </tr>
                        <tr>
                            <td>Linguagem</td>
                            <td> ${item.language}</td>
                        </tr>
                        <tr>
                            <td>Cor de pele</td>
                            <td> ${item.skin_colors}</td>
                        </tr>
                    </table>
                `
                })
                .catch(error => {
                    alert(error.message);
                })
            }   
        }
            show.appendChild(resultItem);
        });
    }
}