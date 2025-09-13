import { Round as RoundPage } from "@pages/round/index";
import type { Route } from "./+types/round";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "The Last of Guss" },
        { name: "description", content: "Welcome to The Last of Guss" },
    ];
}

export default function Round({ params }: { params: { uid: string } }) {
    const { uid } = params

    return <RoundPage uid={uid} />
}
