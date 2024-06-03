
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

    if(flagsData.length) return flagsData[0].alpha_2_code;
    
    const allCountriesFlags = getAllCountries.filter(flag =>
        flag.en_short_name.toLowerCase() === value.toLowerCase()
        ||
        flag.nationality.toLowerCase() === value.toLowerCase()
    );

    return allCountriesFlags.length === 1 ? allCountriesFlags[0].alpha_2_code : value;
}

// Position Colors


export function getPositionColor(value) {
    // console.log('value', value);

    switch(value){
        case "1":
            return "hsl(162, 73%, 46%, .2)";
        case "2":
            return "hsl(45, 100%, 51%, .2)";
        case "3":
            return "hsl(354, 70%, 54%, .2)";
        case "4": 
            return "hsl(27, 98%, 54%, .2)"
        case "5":
            return "hsl(27, 98%, 54%, .2)";
        case "6":
            return "hsl(27, 98%, 54%, .2)";
        case "7":
            return "hsl(27, 98%, 54%, .2)";
        case "8": 
            return "hsl(27, 98%, 54%, .2)";
        case "9":
            return "hsl(27, 98%, 54%, .2)";
        case "10":
            return "hsl(27, 98%, 54%, .2)";

        default: return "hsl(210, 11%, 71%, .2)";
    }

}