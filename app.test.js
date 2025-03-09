const { filterAnimals, formatWithCount } = require('./app');
const { data } = require('./data');

describe("filterAnimals", () => {

    test("Filter for value 'Duck'", () => {

        const result = filterAnimals({ data }, "Duck");

        expect(result).toEqual([
            {
                name: "Dillauti",
                people: [
                    { name: "Winifred Graham", animals: [{ name: "Duck" }] },
                    { name: "Louise Pinzauti", animals: [{ name: "Duck" }] }
                ]
            },
            {
                name: "Tohabdal",
                people: [
                    { name: "Alexander Fleury", animals: [{ name: "Duck" }] }
                ]
            },
            {
                name: "Uzuzozne",
                people: [
                    { name: "Lina Allen", animals: [{ name: "Duck" }] }
                ]
            }
        ]);
    });

    test("Filter for 'Zebra'", () => {
        const result = filterAnimals({ data }, "Zebra");
        expect(result).toEqual([
                {
                    "name": "Tohabdal",
                    "people": [
                        {
                            "name": "Effie Houghton",
                            "animals": [
                                {
                                    "name": "Zebra"
                                }
                            ]
                        },
                        {
                            "name": "Owen Bongini",
                            "animals": [
                                {
                                    "name": "Zebrashark"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Uzuzozne",
                    "people": [
                        {
                            "name": "Philip Davis",
                            "animals": [
                                {
                                    "name": "Zebra"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Zuhackog",
                    "people": [
                        {
                            "name": "Elva Baroni",
                            "animals": [
                                {
                                    "name": "Zebrashark"
                                }
                            ]
                        }
                    ]
                }
            ]
        );
    });

    test("Filter for 'Unicorn' return empty array", () => {
        const result = filterAnimals({ data }, "Unicorn");
        expect(result).toEqual([]);
    });

    test("Filter for 'Duck' with empty data return empty array", () => {
        const result = filterAnimals({ data: [] }, "Duck");
        expect(result).toEqual([]);
    });
});

describe("formatWithCount", () => {
    test("Animal count add in names", () => {
        const result = formatWithCount({ data });
        expect(result).toEqual([
            {
                name: "Dillauti [5]",
                people: [
                    { name: "Winifred Graham [6]", animals: expect.any(Array) },
                    { name: "Blanche Viciani [8]", animals: expect.any(Array) },
                    { name: "Philip Murray [7]", animals: expect.any(Array) },
                    { name: "Bobby Ristori [9]", animals: expect.any(Array) },
                    { name: "Louise Pinzauti [5]", animals: expect.any(Array) }
                ]
            },
            {
                name: "Tohabdal [8]",
                people: [
                    { name: "Effie Houghton [7]", animals: expect.any(Array) },
                    { name: "Essie Bennett [7]", animals: expect.any(Array) },
                    { name: "Owen Bongini [5]", animals: expect.any(Array) },
                    { name: "Alexander Fleury [7]", animals: expect.any(Array) },
                    { name: "Curtis Fuchs [6]", animals: expect.any(Array) },
                    { name: "Maud Lorenzo [7]", animals: expect.any(Array) },
                    { name: "Linnie Lamb [7]", animals: expect.any(Array) },
                    { name: "Randall Benoît [5]", animals: expect.any(Array) }
                ]
            },
            {
                name: "Uzuzozne [7]",
                people: [
                    { name: "Harold Patton [8]", animals: expect.any(Array) },
                    { name: "Millie Lapini [8]", animals: expect.any(Array) },
                    { name: "Lillian Calamandrei [8]", animals: expect.any(Array) },
                    { name: "Lina Allen [7]", animals: expect.any(Array) },
                    { name: "Georgia Hooper [8]", animals: expect.any(Array) },
                    { name: "Lillie Abbott [6]", animals: expect.any(Array) },
                    { name: "Philip Davis [8]", animals: expect.any(Array) }
                ]
            },
            {
                name: "Zuhackog [7]",
                people: [
                    { name: "Elva Baroni [6]", animals: expect.any(Array) },
                    { name: "Johnny Graziani [7]", animals: expect.any(Array) },
                    { name: "Herman Christensen [7]", animals: expect.any(Array) },
                    { name: "Fannie Ancillotti [8]", animals: expect.any(Array) },
                    { name: "Lawrence Camiciottoli [9]", animals: expect.any(Array) },
                    { name: "Marion Landi [6]", animals: expect.any(Array) },
                    { name: "Lou de Bruin [5]", animals: expect.any(Array) }
                ]
            },
            {
                name: "Satanwi [5]",
                people: [
                    { name: "Elmer Kinoshita [7]", animals: expect.any(Array) },
                    { name: "Cora Howell [7]", animals: expect.any(Array) },
                    { name: "Ernest Conte [5]", animals: expect.any(Array) },
                    { name: "Dennis Franci [9]", animals: expect.any(Array) },
                    { name: "Anthony Bruno [6]", animals: expect.any(Array) }
                ]
            }
        ]);
    });

    test("Format count with empty data return empty array", () => {
        const result = formatWithCount({ data: [] });
        expect(result).toEqual([]);
    });
});

describe("Test data order", () => {

    test("Test on formatWithCount()", () => {

        // -- Exec
        const result = formatWithCount({ data });

        // -- Extract country and people names
        const originalCountryNames = data.map(country => country.name);

        // -- Remove count
        const formattedCountryNames = result.map(country => country.name.split(" [")[0]);

        const originalPeopleNames = data.map(country => country.people.map(person => person.name));
        const formattedPeopleNames = result.map(country => country.people.map(person => person.name.split(" [")[0]));

        // -- As this method just reformat data, after unformat it, should be the same
        expect(formattedCountryNames).toEqual(originalCountryNames);
        expect(formattedPeopleNames).toEqual(originalPeopleNames);

    });

    test("Test on filterAnimals()", () => {

        const pattern = "Duck";

        // -- Exec
        const result = filterAnimals({ data }, pattern);

        // -- Extraction of original country names and after filtering
        const originalCountryOrder = data
            .map(country => country.name)
            .filter(name => result.some(resCountry => resCountry.name === name)); // -- We only keep countries that have been filtered

        const resultCountryOrder = result.map(country => country.name);

        // -- Strict verification of the order of remaining countries after filtering
        expect(resultCountryOrder).toStrictEqual(originalCountryOrder);

        // -- Strict verification of the order of people in each filtered country
        result.forEach((filteredCountry) => {

            // -- Retrieve the original list of people from the filtered country
            const originalPeopleInCountry = data.find(c => c.name === filteredCountry.name).people
                .map(person => person.name)
                .filter(name => filteredCountry.people.some(p => p.name === name)); // -- We only keep countries that have been filtered

            // -- Checking that people in each country are in the same order as before
            expect(filteredCountry.people.map(p => p.name)).toStrictEqual(originalPeopleInCountry);

        });

    });
});

describe("Check empty country after filter not beging returned", () => {

    test("Check empty country after filter not beging returned", () => {

        // -- Init with a animal only present in 'Dillauti'
        const pattern = "Narwhal";

        // -- Exec
        const result = filterAnimals({ data }, pattern);

        // -- Check if no empty country is returned
        result.forEach(country => {
            expect(country.people.length).toBeGreaterThan(0);
        });

    });
});
