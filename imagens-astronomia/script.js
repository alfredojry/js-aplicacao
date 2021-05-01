let radioInputAle = document.getElementById('rb-ale');
let radioInputPer = document.getElementById('rb-per');
let select = document.querySelector('select');
let inputDateIni = document.querySelector('input[name=inicio]');
let inputDateFin = document.querySelector('input[name=final]');
let button = document.getElementById('pesquisar');

// ativar e desativar tipos de pesquisa
radioInputAle.addEventListener('change', function () {
    if (radioInputAle.checked) {
        select.disabled = false;
        inputDateIni.disabled = true;
        inputDateFin.disabled = true;
    }
});

radioInputPer.addEventListener('change', function () {
    if (radioInputPer.checked) {
        select.disabled = true;
        inputDateIni.disabled = false;
        inputDateFin.disabled = false;
    }
});

// consulta de API
button.addEventListener('click', consulta);

function consulta() {
    let urlApi = 'https://api.nasa.gov/planetary/apod?api_key=dqu7tTOST1PHLfTUv4L7emVSIB8rPFJdVfPONXQ2';
    let section = document.getElementById('conteudo');
    section.innerHTML = '<p>Carregando dados...</p>';
    if (radioInputAle.checked) {
        let quant = select.value;
        let urlQuery = `${urlApi}&count=${quant}`
        fetch(urlQuery)
            .then(resp => resp.json())
            .then(data => {
                section.innerHTML = '';
                for (let item of data) {
                    let article = document.createElement('article');
                    let h6 = document.createElement('h6');
                    let p = document.createElement('p');
                    let img = document.createElement('img');
                    h6.textContent = item.title;
                    p.textContent = item.explanation.slice(0, 100) + '...';
                    img.src = item.url;
                    article.append(img, h6, p);
                    section.appendChild(article);
                }
            })
            .catch(error => {
                section.innerHTML = '<p>Error ao carregar a informação</p>';
                console.log(error);
            });
    }
    if (radioInputPer.checked) {
        let dataIni = inputDateIni.value;
        let dataFin = inputDateFin.value;
        let msIni = Date.parse(dataIni);
        let msFin = Date.parse(dataFin);
        if (msIni > msFin) {
            section.innerHTML = '<p>Datas inicio depois da data final</p>';
        }
        else {
            let urlQuery = `${urlApi}&start_date=${dataIni}&end_date=${dataFin}`;
            console.log(dataIni, dataFin);
            console.log(urlQuery);
            fetch(urlQuery)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    section.innerHTML = '';
                for (let item of data) {
                    let article = document.createElement('article');
                    let h6 = document.createElement('h6');
                    let p = document.createElement('p');
                    let img = document.createElement('img');
                    h6.textContent = item.title;
                    p.textContent = item.explanation.slice(0, 100) + '...';
                    img.src = item.url;
                    article.append(img, h6, p);
                    section.appendChild(article);
                }
                })
                .catch(error => {
                    section.innerHTML = '<p>Error ao carregar a informação</p>';
                    console.log(error);
                });
        }
    }
}