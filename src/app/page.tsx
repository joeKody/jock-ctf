"use client";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

export default function Home() {
    const [inputText, setInputText] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [solved, setSolved] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        const postUsername = async (newUsername: string, newId: string) => {
            if (!newId || !newUsername) {
                console.log("No ID or Username!");
                return;
            }

            const req = await fetch(`/api/users`, {
                method: "POST",
                body: JSON.stringify({
                    username: newUsername,
                    id: newId,
                }),
            });

            if (!req.ok) {
                console.log(req.statusText);
                setLoading(false);
                return;
            }

            const data = await req.json();
            console.log(data);
            setLoading(false);
        };

        let tmp_id = localStorage.getItem("id");
        let tmp_username = localStorage.getItem("username");
        let tmp_solved = JSON.parse(localStorage.getItem("solved") ?? "[]");
        if (!tmp_id) {
            tmp_id = uuidv4();
            tmp_username = "wimpydick";
            tmp_solved = [];
            localStorage.setItem("id", tmp_id);
            localStorage.setItem("username", tmp_username);
            localStorage.setItem("solved", JSON.stringify(tmp_solved));
            postUsername(tmp_username, tmp_id);
        }
        setId(tmp_id);
        setUsername(tmp_username ?? "twinkcock");
        setSolved(tmp_solved);
        setLoading(false);
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        const req = await fetch(`/api/users`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                username: inputText,
            }),
        });

        if (!req.ok) {
            console.log(req.statusText);
            setLoading(false);
            return;
        }

        setUsername(inputText);
        localStorage.setItem("username", inputText);
        setLoading(false);
        const data = await req.json();
        console.log(data);
    };

    return (
        <>
            <main>
                <article>
                    <section>
                        <h2>About</h2>
                        <p>
                            i just wanna copy{" "}
                            <Link
                                href={"https://opsifiz.github.io/Mister-CTF/"}
                                target="_blank"
                            >
                                MisterCTF
                            </Link>{" "}
                            that&apos;s all
                        </p>
                        <p>
                            made with hatred, next.js, grief, pantry, and
                            maximum technical debt philosophy
                        </p>
                    </section>
                    <section>
                        <h2>Edit profile</h2>
                        <p>
                            your ass is named: <code>{username}</code>
                        </p>
                        <form
                            className="flex gap-1 *:px-2 *:border *:rounded *:border-[#aaa]"
                            onSubmit={handleSubmit}
                        >
                            <input
                                disabled={loading}
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setInputText(e.target.value)}
                                className={`${loading ? "text-[#aaa]" : ""}`}
                            />
                            <button
                                disabled={loading}
                                type="submit"
                                className={`${
                                    loading
                                        ? "text-[#aaa]"
                                        : "cursor-pointer hover:bg-[#f2f2f2]"
                                }`}
                            >
                                Save
                            </button>
                        </form>
                    </section>
                </article>
            </main>
        </>
    );
}
