(function(){
    let destinies;

    fetch('travel.json')
        .then(response => response.json())
        .then(jsonData => {
            destinies = jsonData;
            console.log(destinies)
        })
        .catch(error => console.error('Error fetching destinies:', error));

    document.getElementById('btnSearch').addEventListener('click', function() {
        const input = document.getElementById('q').value.toLowerCase();
        
        let results = [];

        if (!destinies) {
            console.error('destinies not yet fetched');
            return;
        }

        if(input == "beach" || input == "beaches"){
            destinies.beaches.forEach(beach => {
                results.push(beach)
            });
        }else if(input == "temples" || input == "temple"){
            destinies.temples.forEach(temple => {
                results.push(temple);
            });
        }else if(input == "country" || input == "countries"){
            destinies.countries.forEach(country => {
                country.cities.forEach(city => {
                    results.push(city);
                });
            });
        }

        show(results);
    });

})();


function receiveMail(){
    alert('Thank you for contacting us!')
}

document.getElementById('btnReset').addEventListener('click', function() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('q').value = '';
});

function show(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = 'No results found.';
        return;
    }

    results.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.innerHTML = `
         <div class="card">
            <img src="${result.imageUrl}" alt="${result.name}" style="width:100%">
            <div class="cardcontainer">
                <h4>${result.name}</h4>
                <p>${result.description}  <a class="button" href=\"${result.imageUrl}\">Visit</a></p>
                
            </div>
        </div>
        `;
        resultsDiv.appendChild(item);
    });
}