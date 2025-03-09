// -- IMPORTS
const data = require('./data');


// -- MAIN ------------------------------------------------------------------------------------------------------------

const arrayProgArgs = process.argv.slice(2);

if (arrayProgArgs.length > 0) {

    const [key, value] = arrayProgArgs[0].split('=');

    switch (key) {

        case '--filter':

            if (value) {

                console.log(JSON.stringify(filterAnimals(data, value), null, 2));

            } else {

                displayUsage();

            }

            break;

        case '--count':

            console.log(JSON.stringify(formatWithCount(data), null, 2));
            break;

        default:

            displayUsage();

    }

} else {

   displayUsage();

}


// -- FUNCTIONS --------------------------------------------------------------------------------------------------------

function displayUsage() {

    console.log('Usage: node app.js --filter=<pattern> | --count');

}

function filterAnimals(arrayData, patternToMatch) {

    return arrayData.data.map(country => {

        // -- Filter people with animals that match the pattern
        const filteredPeople = country.people.map(person => {

            const filteredAnimals = person.animals.filter(animal => animal.name.includes(patternToMatch));
            return filteredAnimals.length > 0 ? { name: person.name, animals: filteredAnimals } : null;

        }).filter(person => person !== null);

        // -- Check if there are people with animals that match the pattern
        return filteredPeople.length > 0 ? { name: country.name, people: filteredPeople } : null;

    }).filter(country => country !== null);

}

function formatWithCount(arrayData) {

    return arrayData.data.map(country => {

        // -- Build people string with the number of animals
        const peopleWithCount = country.people.map(person => {

            return {
                name: `${person.name} [${person.animals.length}]`,
                animals: person.animals
            };

        });

        // -- Merge people with the number of animals
        return {

            name: `${country.name} [${peopleWithCount.length}]`,
            people: peopleWithCount

        };

    });
}