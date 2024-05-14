let liczbaProb = 5;
let numerProby = 0;
let czasStart;
let zarejestrowaneCzasy = [];
let liczbaPrzedklikniec = 0;
let najlepszyCzas = Infinity;

const obszarKlikniecia = document.getElementById('obszarKlikniecia');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const najkrotszyCzasElem = document.getElementById('najkrotszyCzas');
const najdluzszyCzasElem = document.getElementById('najdluzszyCzas');
const sredniaCzasowElem = document.getElementById('sredniaCzasow');
const liczbaPrzedklikniecElem = document.getElementById('liczbaPrzedklikniec');
const najlepszyCzasElem = document.getElementById('najlepszyCzas');

start.addEventListener('click', rozpocznijGre);
stop.addEventListener('click', zatrzymajGre);
obszarKlikniecia.addEventListener('click', obsluzKlikniecieUzytkownika);

function rozpocznijGre() {
    numerProby = 0;
    zarejestrowaneCzasy = [];
    liczbaPrzedklikniec = 0;
    zaktualizujStatystyki();
    start.disabled = true;
    stop.disabled = false;
    obszarKlikniecia.style.display = 'flex';
    nastepnaProba();
}

function zatrzymajGre() {
    clearTimeout(timeout);
    start.disabled = false;
    stop.disabled = true;
    obszarKlikniecia.style.display = 'none';
}

function nastepnaProba() {
    if (numerProby >= liczbaProb) {
        zakonczGre();
        return;
    }
    numerProby++;
    obszarKlikniecia.style.backgroundColor = 'lightgray';
    const opoznienie = Math.random() * 3000 + 1000; 
    timeout = setTimeout(zmienKolor, opoznienie);
}

function zmienKolor() {
    czasStart = performance.now();
    obszarKlikniecia.style.backgroundColor = 'green';
}

function obsluzKlikniecieUzytkownika() {
    if (obszarKlikniecia.style.backgroundColor === 'green') {
        const czasReakcji = performance.now() - czasStart;
        zarejestrowaneCzasy.push(czasReakcji);
        if (czasReakcji < najlepszyCzas) najlepszyCzas = czasReakcji;
        zaktualizujStatystyki();
        nastepnaProba();
    } else {
        liczbaPrzedklikniec++;
        zaktualizujStatystyki();
    }
}

function zakonczGre() {
    start.disabled = false;
    stop.disabled = true;
    obszarKlikniecia.style.display = 'none';
}

function zaktualizujStatystyki() {
    if (zarejestrowaneCzasy.length > 0) {
        const najkrotszyCzas = Math.min(...zarejestrowaneCzasy);
        const najdluzszyCzas = Math.max(...zarejestrowaneCzasy);
        const sredniaCzasow = zarejestrowaneCzasy.reduce((a, b) => a + b, 0) / zarejestrowaneCzasy.length;

        najkrotszyCzasElem.textContent = najkrotszyCzas.toFixed(2);
        najdluzszyCzasElem.textContent = najdluzszyCzas.toFixed(2);
        sredniaCzasowElem.textContent = sredniaCzasow.toFixed(2);
    }
    liczbaPrzedklikniecElem.textContent = liczbaPrzedklikniec;
    najlepszyCzasElem.textContent = najlepszyCzas === Infinity ? '-' : najlepszyCzas.toFixed(2);
    document.getElementById('statystyki').style.display = 'block';
}
