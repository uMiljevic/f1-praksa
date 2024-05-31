
const getAllCountries = [
    {
        alpha_2_code: "GB",
        en_short_name: "UK",
        nationality: "British"
    },
    {
        alpha_2_code: "NL",
        en_short_name: "Dutch",
        nationality: "Netherlandic"
    },
    {
        alpha_2_code: "AE",
        en_short_name: "UAE",
        nationality: "Emirian"
    },
    {
        alpha_2_code: "KR",
        en_short_name: "Korea",
        nationality: "Korean"
    },
    {
        alpha_2_code: "US",
        en_short_name: "USA",
        nationality: "United States"
    }
]

export function getAlphaCode(flags, value) {
    
    const flagsData = flags.filter(flag =>
        flag.en_short_name.toLowerCase() === value.toLowerCase()
        ||
        flag.nationality.toLowerCase() === value.toLowerCase()
    );

    if(flagsData.length === 1) return flagsData[0].alpha_2_code;
    
    const allCountriesFlags = getAllCountries.filter(flag =>
        flag.en_short_name.toLowerCase() === value.toLowerCase()
        ||
        flag.nationality.toLowerCase() === value.toLowerCase()
    );

    return allCountriesFlags.length === 1 ? allCountriesFlags[0].alpha_2_code : value;
}

// Position Colors


export function getPositionColor(value) {
    console.log('value', value);

    

    switch(value){
        case "1":
            return "green";
        case "2":
            return "yellow";
        case "3":
            return "red";
        case "4": 
            return "blue"
        case "5":
            return "purple";
        case "6":
            return "lightblue";
        case "7":
            return "lightgreen";
        case "8": 
            return "pink";
        case "9":
            return "lightpink";
        case "10":
            return "lightpurple";
    }

    if(value > "10"){
        return "grey";
    }
}