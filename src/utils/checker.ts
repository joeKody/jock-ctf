import { md5 } from "js-md5";
import { challenge_lists } from "./challenges_info";

export function checkAns(challenge: string, flag: string) {
    if (!challenge || !flag) {
        return false;
    }
    return challenge_lists[challenge].flag === md5(flag);
}
