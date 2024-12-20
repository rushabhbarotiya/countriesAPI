const countryName = new URLSearchParams(location.search).get("name")
const flagimg = document.querySelector(".box-detailsimg img")
const CountName = document.querySelector(".box-detailsimg .card-title")
const nativeName = document.querySelector(".nativeName")
const population = document.querySelector(".population")
const region = document.querySelector(".region")
const subRegion = document.querySelector(".subRegion")
const capital = document.querySelector(".capital")
const tlD = document.querySelector(".tlD")
const currencies = document.querySelector(".currencies")
const languages = document.querySelector(".languages")
const borderbox = document.querySelector(".brdrbox")
const btnback = document.querySelector('#bt-back')
const themechanger = document.querySelector('#themechange')
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=> res.json()).
then((Countrycode)=> {
   
    flagimg.src = Countrycode[0].flags.svg
    CountName.innerText = Countrycode[0].name.common
    population.innerText = Countrycode[0].population.toLocaleString("en-IN")
    region.innerText = Countrycode[0].region
 
    
    tlD.innerText = Countrycode[0].tld.join(', ')
    languages.innerText = Object.values(Countrycode[0].languages).join(', ')

    // console.log(Countrycode[0]);
    if(Countrycode[0].subregion){
        subRegion.innerText = Countrycode[0].subregion
    }
    if(Countrycode[0].capital){
        capital.innerText = Countrycode[0].capital?.[0]
    }

    if(Countrycode[0].name.nativeName){
        nativeName.innerText = Object.values(Countrycode[0].name.nativeName)[0].common
    } else{
         nativeName.innerText = Countrycode[0].name.common
    }
    if(Countrycode[0].currencies){
        currencies.innerText = Object.values(Countrycode[0].currencies).map((currency) => currency.name).join(', ')
     }
    // languages.innerText = Countrycode[0].languages
    if(Countrycode[0].borders){
        Countrycode[0].borders.forEach((border) => {
            // console.log(border);
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).
            then((res)=> res.json())
            .then((bordercountry)=> {
                // console.log(bordercountry[0].name.common);
                const bordertag = document.createElement('a')
                bordertag.innerText = border
                bordertag.href = `Country-info.html?name=${bordercountry[0].name.common}`
                console.log(bordertag);
                borderbox.append(bordertag)
            }) 
        });
     }
})

themechanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark')

    if (document.body.classList.contains('dark')) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      themeText.textContent = 'Light Mode';
    } else {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      themeText.textContent = 'Dark Mode';
    }
})

