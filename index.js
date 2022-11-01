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
let boderArray = []; //Bordering Countries

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
      console.log(data);
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

        countryDetails.innerHTML = (
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
        );
      });
    });
};
