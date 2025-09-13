import { CreateRound } from "@pages/round/create";
import type { Route } from "../+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "The Last of Guss" },
        { name: "description", content: "Welcome to The Last of Guss" },
    ];
}

export default function Round() {

    return <CreateRound />
}
