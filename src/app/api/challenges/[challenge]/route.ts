import { checkAns } from "@/utils/checker";
import { challenge_lists } from "@/utils/challenges_info";
import { NextResponse, NextRequest } from "next/server";

const BASE_PANTRY_API = process.env.PANTRY_API;

export async function POST(
    req: Request,
    { params }: { params: { challenge: string } }
) {
    const { challenge } = await params;
    const {
        flag,
        id,
    }: {
        flag: string;
        id: string;
    } = await req.json();

    if (!checkAns(challenge, flag)) {
        return NextResponse.json({
            correct: false,
        });
    }

    const res = await fetch(`${BASE_PANTRY_API}`, {
        method: "GET",
    });
    if (!res.ok) {
        return NextResponse.json(
            { error: res.statusText },
            { status: res.status }
        );
    }

    const data = await res.json();
    const newData = [];
    let userData = {};
    for (let i = 0; i < data.users.length; i++) {
        const tmp_solved = data.users[i].solved;
        let tmp_score = data.users[i].score;
        console.log(tmp_score);
        if (id === data.users[i].id) {
            let isSolved = false;
            for (let j = 0; j < data.users[i].solved.length; j++) {
                if (data.users[i].solved[j] === challenge) {
                    isSolved = true;
                    console.log(challenge);
                    break;
                }
            }
            if (!isSolved) {
                tmp_solved.push(challenge);
                tmp_score += challenge_lists[challenge].score;
            }
            userData = {
                id: data.users[i].id,
                username: data.users[i].username,
                score: tmp_score,
                solved: tmp_solved,
            };
        }
        newData.push({
            id: data.users[i].id,
            username: data.users[i].username,
            score: tmp_score,
            solved: tmp_solved,
        });
        console.log(tmp_score);
        console.log("----------------------");
    }

    const updateReq = await fetch(`${BASE_PANTRY_API}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            users: newData,
        }),
    });

    if (!updateReq.ok) {
        return NextResponse.json(
            { error: updateReq.statusText },
            { status: updateReq.status }
        );
    }
    // const response = await updateReq.json();
    return NextResponse.json({
        correct: true,
        user: userData,
    });
}
