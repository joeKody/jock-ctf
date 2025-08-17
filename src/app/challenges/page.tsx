import Challenge_Category from "@/components/challenge-category";
import { challenge_lists } from "@/utils/challenges_info";

export default function Challenges() {
    return (
        <main>
            <Challenge_Category
                title="Crypto"
                challenges={Object.values(challenge_lists).filter(
                    (challenge) => challenge.category == "Crypto"
                )}
            />
            <Challenge_Category
                title="Misc."
                challenges={Object.values(challenge_lists).filter(
                    (challenge) => challenge.category == "Misc."
                )}
            />
        </main>
    );
}
