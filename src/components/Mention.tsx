export type Mention = {
    name: string;
    color: string;
    backgroundImage?:string;
};

export const getDefaultMentions = ():Mention[] =>{
    return [
        { name: "Excellent", color: "#3A9918", backgroundImage:"mention_background_pattern_1.png" },
        { name: "Très Bien", color: "#A0CF1C", backgroundImage:"mention_background_pattern_2.png" },
        { name: "Bien", color: "#D3D715", backgroundImage:"mention_background_pattern_3.png" },
        { name: "Assez Bien", color: "#C2B113", backgroundImage:"mention_background_pattern_4.png" },
        { name: "Passable", color: "#C27C13", backgroundImage:"mention_background_pattern_5.png" },
        { name: "Insuffisant", color: "#C23D13", backgroundImage:"mention_background_pattern_6.png" },
    ];
};

export const getDefaultMeritProfile = () => {
    const defaultMentions = getDefaultMentions();
    const amountPerMention = BigInt(Math.round(100 / defaultMentions.length));
    return defaultMentions.map((_) => amountPerMention);
};