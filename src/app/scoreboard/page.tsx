export default async function Scoreboard() {
    const res = await fetch(`${process.env.PANTRY_API}`, {
        method: "GET",
    });
    if (!res.ok) {
        return console.error(res.statusText);
    }

    const data = await res.json();
    const users: {
        id: string;
        username: string;
        score: number;
        solved: string[];
    }[] = data.users;
    console.log(users);

    return (
        <main>
            <article>
                <section className="flex flex-col items-center justify-center gap-6">
                    <h2>Scoreboard</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Username</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users
                                .sort((a, b) => b.score - a.score)
                                .map((user, index) => (
                                    <tr key={index}>
                                        <td>
                                            <code>{index + 1}</code>
                                        </td>
                                        <td>{user.username}</td>
                                        <td>
                                            <code>{user.score}</code>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </section>
            </article>
        </main>
    );
}
