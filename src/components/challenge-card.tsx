"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Challenge_Card(props: {
    title: string;
    description: string;
    code: string | null | undefined;
    attachments: {
        name: string;
        link: string;
    }[];
    score: number;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSolved, setIsSolved] = useState(false);
    const [flag, setFlag] = useState("");
    const [isWrong, setIsWrong] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputFlag = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputFlag.current) {
            inputFlag.current.focus();
        }
    }, [isOpen]);

    const checkIfSolved = () => {
        const solved = JSON.parse(localStorage.getItem("solved") ?? "[]");
        for (let i = 0; i < solved.length; i++) {
            if (props.title === solved[i]) {
                setIsSolved(true);
                break;
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        console.log("Submitting...");
        const id = localStorage.getItem("id");
        if (!id) {
            console.error("No ID!");
            setLoading(false);
            return;
        }
        const req = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/challenges/${props.title}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    flag: flag,
                    id: id,
                }),
            }
        );
        if (!req.ok) {
            console.log(req.statusText);
            setLoading(false);
            return;
        }
        setLoading(false);
        const res = await req.json();
        console.log(res);

        if (res.correct) {
            const user = res.user;
            localStorage.setItem("solved", JSON.stringify(user.solved));
            setIsWrong(false);
        } else {
            setIsWrong(true);
        }
        checkIfSolved();
    };

    useEffect(() => {
        checkIfSolved();
        console.log(props.code);
    }, []);

    return (
        <>
            <button
                className={`w-1/3 flex flex-col items-center justify-center px-6 py-4
                border border-[#f2f2f2] cursor-pointer ${
                    isSolved ? "bg-green-200" : ""
                }`}
                onClick={() => setIsOpen(true)}
            >
                <h3 className="mt-0!">{props.title}</h3>
                <code>{props.score} pt</code>
            </button>
            <div
                data-backdrop
                className={`${isOpen ? "" : "hidden"}
                fixed top-0 left-0 z-40 flex justify-center items-center w-full h-full bg-neutral-900/25
                `}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setIsOpen(false);
                    }
                }}
            >
                <section
                    data-modal
                    className="flex flex-col z-50 relative p-4 bg-white min-w-2xl max-w-4xl min-h-96 max-h-max whitespace-pre-line"
                >
                    <header className="max-w-full! flex justify-between mx-0!">
                        <div className="flex gap-4 justify-center">
                            <h4 className="mt-0!">{props.title}</h4>
                            <code
                                className={`border border-[#aaa] rounded px-4 flex items-center text-sm ${
                                    isWrong
                                        ? "bg-red-200"
                                        : isSolved
                                        ? "bg-green-200"
                                        : ""
                                }`}
                            >
                                {props.score} pt
                            </code>
                        </div>
                        <div>
                            <button
                                className="px-2 rounded border border-[#f2f2f2] cursor-pointer"
                                onClick={() => setIsOpen(false)}
                            >
                                x
                            </button>
                        </div>
                    </header>
                    <hr className="mt-2! mb-0!" />
                    <p className="flex-8/12">{props.description}</p>
                    {props.code ? (
                        <pre className="p-2 py-4 text-base bg-neutral-[#f2f2f2]! border border-[#aaa]">
                            <code>{props.code}</code>
                        </pre>
                    ) : (
                        ""
                    )}
                    <ul className="pl-0! mt-2! flex! flex-wrap gap-4">
                        {props.attachments.map((attachment, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        target="_blank"
                                        href={attachment.link}
                                    >
                                        {attachment.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <hr className="mb-4! mt-2!" />
                    <form
                        className="flex gap-4 *:px-2 *:border *:rounded *:border-[#aaa]"
                        onSubmit={handleSubmit}
                    >
                        <input
                            disabled={loading}
                            type="text"
                            className={`w-full font-typo ${
                                loading ? "text-[#aaa]" : ""
                            }`}
                            placeholder="FLAGGOT{dogcockmogsyoursmallassdick}"
                            onChange={(e) => setFlag(e.target.value)}
                            ref={inputFlag}
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
                            Submit
                        </button>
                    </form>
                </section>
            </div>
        </>
    );
}
