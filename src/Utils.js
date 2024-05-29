export function getAlphaCode(flags, value) {
    const flagsData = flags.filter(flag =>
        flag.en_short.name.toLowerCase() === value.toLowerCase() ||
        flag.nationality.toLowerCase() === value.toLowerCase()
    );

    if(flagsData.length === 1) return flagsData[0].apha_2_code;
}