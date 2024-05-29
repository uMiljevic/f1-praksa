export function getAlphaCode(flags, value) {
    const flagsData = flags.filter(flag =>
        flag.en_short_name.toLowerCase() === value.toLowerCase() ||
        flag.nationality.toLowerCase() === value.toLowerCase()
    );
    return flagsData.length === 1 ? flagsData[0].alpha_2_code : value;

}