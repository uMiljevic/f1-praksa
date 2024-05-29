export function getAlphaCode(flags, value) {
    const flagsData = flags.filter(flag =>
        flag.en_short.name.toLowerCase() === value.toLowerCase() ||
        flag.nationality.toLowerCase() === value.toLowerCase()
    );

    return flagsData === 1 ? flagsData[0].apha_2_code : value ;
}