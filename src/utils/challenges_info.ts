import { md5 } from "js-md5";

export const challenge_lists: {
    [key: string]: {
        title: string;
        category: string;
        description: string;
        code: string | null | undefined;
        attachments: {
            name: string;
            link: string;
        }[];
        flag: string;
        score: number;
    };
} = {
    "Solve Me!": {
        title: "Solve Me!",
        category: "Misc.",
        description: "Sanity Check and for development testing",
        code: "U1lOVFRCR3tVUllZQl9KQkVZUX0=",
        attachments: [
            {
                name: "home",
                link: "/",
            },
            {
                name: "challenges",
                link: "/challenges",
            },
            {
                name: "scoreboard",
                link: "/scoreboard",
            },
        ],
        flag: md5("FLAGGOT{HELLO_WORLD}"),
        score: 100,
    },
    "Pasta Hai": {
        title: "Pasta Hai",
        category: "Crypto",
        description:
            "จอห์นมาเที่ยวเมืองไทย และเขาก็ได้อยากสื่อสารกับคนไทยด้วยเครื่องมืออิเล็กทรอนิกส์ ทว่าเขาไม่รู้ว่าจะต้องใช้มาตรฐานอะไร ช่วยจอห์นหน่อยได้ไหมว่าข้อมูลฐานสองต่อไปนี้แปลได้ว่าอะไรในภาษไทยที่เข้ารหัสตามมาตรฐานผลิตภัณฑ์อุตสาหกรรม\nHINT: This is 620. \nFlag format: FLAGGOT{ข้อความภาษาไทยที่ถูกถอดรหัสแล้ว}",
        code: "10111100 11000001 11000011 11010001 10100001 11100000 11000001 11010111 11001101 10100111 11100100 10110111 11000010 00100000 11000101 11101000 11010000 11000001 11010010 11001101 11000010 11011001 11101000 11100000 11000001 11010111 11001101 10100111 11100100 10110111 11000010 11001011 11000101 11010010 11000010 10111011 11010101 00100000 11100110",
        attachments: [],
        flag: md5("FLAGGOT{ผมรักเมืองไทย ล่ะมาอยู่เมืองไทยหลายปีหลายปี}"),
        score: 100,
    },
};
