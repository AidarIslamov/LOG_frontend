import type z from "zod/v3";
import type { roundFormSchema, signupFormSchema } from "./validators";

export type Round = {
    id: string;
    duration: number;
    cooldown: number;
    startAt: string;
    endAt: string;
    isActive: boolean;
    isInCoolDown: boolean;
    createdAt: string;
    updatedAt: string;
    users: RoundUser[]
}

export type User = {
    id: number;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}


export type RoundPlayer = {
    round_id: Round['id'];
    user_id: User['id'];
    createdAt: string;
    updatedAt: string;
}

export type RoundUser = User & {
    RoundPlayer: RoundPlayer
}

export type Constants = {
    ROUND_DURATION: number
    COOLDOWN_DURATION: number
    DEFAULT_TIME_OFFSET: number
}

export type Dictionary = {
    constants: Constants
}


export type RoundFormData = z.infer<typeof roundFormSchema>;
export type SignupFormData = z.infer<typeof signupFormSchema>;