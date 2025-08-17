import Challenge_Card from "./challenge-card";

export default function Challenge_Category(props: {
    title: string;
    challenges: {
        title: string;
        description: string;
        code: string | null | undefined;
        attachments: {
            name: string;
            link: string;
        }[];
        score: number;
    }[];
}) {
    return (
        <article>
            <header>
                <h2>{props.title}</h2>
            </header>
            <section className="flex flex-wrap gap-4 mt-4">
                {props.challenges.map((challenge, index) => (
                    <Challenge_Card
                        key={index}
                        title={challenge.title}
                        description={challenge.description}
                        attachments={challenge.attachments}
                        score={challenge.score}
                        code={challenge.code}
                    />
                ))}
            </section>
        </article>
    );
}
