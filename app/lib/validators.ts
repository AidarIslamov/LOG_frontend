import { addMinutes } from "date-fns";
import z from "zod/v3";

const roundFormSchema = z.object({
    duration: z.number().min(60).max(300),
    cooldown: z.number().min(10).max(60),
    startAt: z.date().min(addMinutes(new Date(), 1)),
    endAt: z.date()
});

const signupFormSchema = z.object({
    name: z.string().min(4).max(20),
    password: z.string().min(4).max(50),
    passwordConfirm: z.string().min(4).max(50),
    agreement: z.boolean().refine((value) => value === true, {
        message: "You must accept the terms and conditions",
    })
}).superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['passwordConfirm']
        })
    }
})

const loginFormSchema = z.object({
    name: z.string().min(4).max(20),
    password: z.string().min(4).max(50),
});



export { roundFormSchema, signupFormSchema, loginFormSchema }