let url = 'https://restcountries.com/v3.1/all';

async function fecthFunction(api) {
  const response = await fetch(api);
  let data = await response.json();
  console.log(data);
}

fecthFunction(url);
