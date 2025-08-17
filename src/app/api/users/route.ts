import { NextResponse } from "next/server";

const BASE_PANTRY_API = process.env.PANTRY_API;

// Get all Users
export async function GET() {
    const res = await fetch(`${BASE_PANTRY_API}`, {
        method: "GET",
    });
    if (!res.ok) {
        return NextResponse.json(res.statusText);
    }

    const data = await res.json();
    const users = [];
    for (let i = 0; i < data.users.length; i++) {
        users.push({
            username: data.users[i].username,
            score: data.users[i].score,
        });
    }

    return NextResponse.json({
        users: users,
    });

    return NextResponse.json(data);
}

// Create New User
export async function POST(req: Request) {
    const reqUser = await req.json();
    const users = await fetch(`${BASE_PANTRY_API}`, {
        method: "GET",
    });
    if (!users.ok) {
        return NextResponse.json(
            { error: users.statusText },
            { status: users.status }
        );
    }
    const usersList = await users.json();
    for (let i = 0; i < usersList.users.length; i++) {
        if (usersList.users[i].id === reqUser.id) {
            return NextResponse.json(
                { error: "User already exists." },
                { status: 400 }
            );
        }
    }

    const newUser = {
        id: reqUser.id,
        username: reqUser.username,
        score: 0,
        solved: [],
    };

    const res = await fetch(`${BASE_PANTRY_API}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            users: [newUser],
        }),
    });

    if (!res.ok) {
        return NextResponse.json(
            { error: res.statusText },
            { status: res.status }
        );
    }

    const data = await res.json();
    return NextResponse.json(data);
}

// Update existing user (username only)
export async function PUT(req: Request) {
    const res = await fetch(`${BASE_PANTRY_API}`, {
        method: "GET",
    });
    if (!res.ok) {
        return NextResponse.json(
            { error: res.statusText },
            { status: res.status }
        );
    }

    const user = await req.json();
    const data = await res.json();
    const newData = [];
    for (let i = 0; i < data.users.length; i++) {
        let tmp_username = data.users[i].username;
        if (user.id === data.users[i].id) {
            tmp_username = user.username;
        }
        newData.push({
            id: data.users[i].id,
            username: tmp_username,
            score: data.users[i].score,
            solved: data.users[i].solved,
        });
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
    return NextResponse.json({ success: true });
}
