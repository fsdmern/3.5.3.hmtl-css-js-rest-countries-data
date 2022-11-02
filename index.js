const mainWrapper = document.querySelector('.mainWrapper');

//Iterables
const filterContent = Array.from(document.querySelector('option'));

const modal = document.querySelector('.modal');
const backBtn = document.querySelector('.backBtn');
const continents = document.querySelector('.continents');
const searchCountry = document.querySelector("input[type='search']");

const modalWrapper = document.createElement('div');
let codeArray = []; //ISO Country Codes
let countryArray = []; //Names
let borderArray = []; //Bordering Countries

// async function fecthFunction(api) {
//   const response = await fetch(api);
//   let data = await response.json();
//   console.log(data);
// }

// fecthFunction(url);

const url = 'https://restcountries.com/v3.1/all';
const fetchCountry = async () => {
  const apiEndpoint = url;
  const countries = document.querySelector('.countries');

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      data.forEach((element) => {
        const {cca3, borders, flags, name, population, region, capital} =
          element;

        let country = document.createElement('div');
        let imageBtn = document.createElement('button');
        let countryDetails = document.createElement('div');
        let img = document.createElement('img');

        codeArray.push(cca3);
        countryArray.push(name.common);

        country.classList.add('allCountries');
        countryDetails.classList.add('paraName');

        img.classList.add('flags');
        img.alt = `${name.common}'s flag`;
        imageBtn.appendChild(img);
        imageBtn.classList.add('image-btn');

        countries.appendChild(country);
        country.appendChild(imageBtn);
        country.appendChild(countryDetails);

        countryDetails.innerHTML = `
          <div className="country-details-wrapper">
            <h2 className="country-details-title">${name.common}</h2>

            <div className="country-details-content">
              <p class="population">
                <span class="country-details-data-titles">Population:</span>
                <span class="country-details-data-content">${population}</span>
              </p>
              <p class="country-region">
                <span class="country-details-data-titles">Region:</span>
                <span class="country-details-data-content">${region}</span>
              </p>
              <p class="country-capital">
                <span class="country-details-data-titles">Capital:</span>
                <span class="country-details-data-content">${capital}</span>
              </p>
            </div>
          </div>
        )`;

        img.src = `${flags.svg}`;

        imageBtn.addEventListener('click', function () {
          modal.classList.remove('hide-modal');
          mainWrapper.classList.add('hide-main-wrapper');
          borderArray = [];
          if (typeof borders != 'undefined') {
            borders.map((country) => {
              codeArray.forEach((elem, index) => {
                if (country == elem) {
                  borderArray.push(countryArray[index]);
                }
              });
            });
          }

          modal.appendChild(modalWrapper);
          modalTemplate(element);
        });
      });
    });
};

backBtn.addEventListener('click', () => {
  mainWrapper.classList.remove('hide-main-wrapper');
  modal.classList.add('hide-modal');
});

fetchCountry();

const modalTemplate = (element) => {
  const {
    currencies,
    languages,
    borders,
    flags,
    name,
    population,
    region,
    capital,
    subregion,
    startOfWeek,
  } = element;

  const currencyObj = Object.keys(currencies);
  const currencyList = currencyObj.map((ccy) => currencies[ccy].name);
  const langs = Object.values(languages);
  const borderState = typeof borders !== 'undefined';
  modalWrapper.classList.add('modal-container');
  const borderBool = modal.classList.contains('darkMode');

  modalWrapper.innerHTML = `<div className="country-details">
    <img src=${flags.svg} alt="the flag of ${
    name.common
  }" className="country-details-img" />

    <div className="primary-seconday">
        <div className="primary">
          <h3 class="primary-title">${name.common}</h3>

          <p className="primary-message">
            <span class="hightLight">Official Name:</span>${name.official}
          </p>

          <p className="primary-message">
            <span class="hightLight">Population:</span>${population.toLocaleString()}
          </p>

           <p className="primary-message">
            <span class="hightLight">Region: </span>${region}
          </p>

           <p className="primary-message">
            <span class="hightLight">Sub Region: </span>${subregion}
          </p>

           <p className="primary-message">
            <span class="hightLight">Capital: </span>${capital}
          </p>

        </div>

        <div className="secondary">

           <p className="secondary-message">
            <span class="hightLight">Start of the Week: </span>${startOfWeek}
          </p>

           <p className="secondary-message">
            <span class="hightLight">Currencies: </span>
            <ul class="currency-list">
              ${currencyList.map(
                (ccy) => `<li class="currency-list-item">
                    <span class="secondary-currency">${ccy}</span>

                </li>`
              )}

            </ul>
          </p>

           <p className="secondary-message">
            <span class="hightLight">Languages: </span>
            <ul class="languages">
              ${langs
                .map(
                  (lang) =>
                    `<li class="lang-list-item">
                    <span class="secondary-lang">${lang}</span>
                </li>`
                )
                .join(' ')}

            </ul>
          </p>         
        </div>
        
        <div class="bordering-city"> 
            <p class="bordering-content">
            <span class="hightLight">Bordering Countries:</span> 
            </p>
            <ul class="bordering"> 
            ${
              borderState
                ? borderArray.map(
                    (border) => `<li>
                <button class="border btn ${
                  borderBool ? 'theme-light' : ''
                }">${border}</button>
              <li>`
                  )
                : `<li><span>No Bordering Countries</span></li>`
            }
            </ul>
        </div>
      
    </div>
  </div>`;

  const borderingCountries = document.querySelector('.bordering');
  borderingCountries.addEventListener('click', (e) => {
    const apiEndPoint = `https://restcountries.com/v3.1/name/{e.target.innerHTML.trim()}`;
    console.log('inside bordering countries:' + apiEndPoint);
    fetch(apiEndPoint)
      .then((response) => response.json())
      .then((data) => {
        borderArray = [];
        data[0].borders.map((country) => {
          codeArray.forEach((elem, index) => {
            if (country == elem) borderArray.push(countryArray[index]);
          });
        });
      });
    modalTemplate(data[0]);
  });
};
