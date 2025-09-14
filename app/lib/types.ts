import type z from "zod/v3";
import type { loginFormSchema, roundFormSchema, signupFormSchema } from "./validators";

export type Round = {
    id: string;
    duration: number;
    cooldown: number;
    startAt: string;
    endAt: string;
    isActive: boolean;
    isInCoolDown: boolean;
    isFinished: boolean;
    createdAt: string;
    updatedAt: string;
    users: RoundUser[];
    roundPlayers: RoundPlayer[];
    totals?: RoundTotals; 
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
    score: number;
    user?: User
}

export type RoundUser = User & {
    RoundPlayer: RoundPlayer
}

export type RoundTotals = {
    totalScore: number;
    winner: {user: {name: string, score: number}}
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
export type LoginFormData = z.infer<typeof loginFormSchema>;