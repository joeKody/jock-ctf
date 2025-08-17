export default async function Scoreboard() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
    });

    if (!req.ok) {
        console.log(req.text);
    }
    const data = await req.json();
    const users: {
        username: string;
        score: number;
    }[] = data.users;

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
