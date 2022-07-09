export type Mention = {
    name: string;
    color: string;
};

export const getDefaultMentions = ():Mention[] =>{
    return [
        { name: "Excellent", color: "#3A9918" },
        { name: "Très Bien", color: "#A0CF1C" },
        { name: "Bien", color: "#D3D715" },
        { name: "Assez Bien", color: "#C2B113" },
        { name: "Passable", color: "#C27C13" },
        { name: "Insuffisant", color: "#C23D13" },
    ];
};

export const getDefaultMeritProfile = () => {
    const defaultMentions = getDefaultMentions();
    const amountPerMention = BigInt(Math.round(100 / defaultMentions.length));
    return defaultMentions.map((_) => amountPerMention);
};