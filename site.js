const countryContainer = document.querySelector(".countries-container");
fetch("https://restcountries.com/v3.1/all")
  .then((Res) => Res.json())
  .then((data) => {
 
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
  });
