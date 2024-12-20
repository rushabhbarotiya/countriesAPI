const countryContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector('#region-select')
const searchinput = document.querySelector('#search')
const themeChanger = document.querySelector('#themechange')
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
let allcountriesdata 

fetch("https://restcountries.com/v3.1/all")
  .then((Res) => Res.json())
  .then((data) => {
        renderCountries(data)
        allcountriesdata = data 
  })  

filterByRegion.addEventListener('change', (e)=> {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
  .then((Res) => Res.json())
  .then(renderCountries) 
})

function renderCountries(data){
  countryContainer.innerHTML=''
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country");
    countryCard.href = `./Country-info.html?name=${country.name.common}`
          countryCard.innerHTML = `
          <div class="img-box"><img class src="${country.flags.svg}" alt="${country.name.common}"/></div>        
          <div class="card-text">
            <h3 class="card-title"> ${country.name.common}</h3>
            <p><b>Population</b>: ${new Intl.NumberFormat('en-IN').format(country.population)}</p>
            <p><b>Region</b>: ${country.region}</p>
            <p><b>Capital</b>: ${country.capital}</p>
          </div>`
    countryContainer.append(countryCard);

  });
}

searchinput.addEventListener('input', (e)=>{
    console.log(e.target.value);
    const filterdata = allcountriesdata.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filterdata);
    
})

const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    themeText.textContent = 'Light Mode';
  } else {
    document.body.classList.remove('dark');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    themeText.textContent = 'Dark Mode';
  }
};

// Load theme from Local Storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
});

// Add event listener to toggle the theme
themeChanger.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Apply the new theme and save it to Local Storage
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});
