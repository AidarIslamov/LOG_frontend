import { useDictionary } from '@/lib/hooks/useDictionary';
import { Button } from '@ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from "@ui/input";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TimePicker } from '@/components/ui/time-picker';
import { zodResolver } from "@hookform/resolvers/zod";
import { roundFormSchema } from '@/lib/validators';
import type { RoundFormData } from '@/lib/types';
import { addSeconds, setSeconds } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { createRound } from '@/lib/hooks/useRound';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

export function CreateRound() {
    const { data: dictionary, isLoading } = useDictionary();
    const queryClient = useQueryClient();
    let navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(roundFormSchema),
        defaultValues: {
            duration: 0,
            cooldown: 0,
            startAt: undefined,
            endAt: undefined
        },
        mode: 'onChange'
    });

    useEffect(() => {
        const { ROUND_DURATION = 0, COOLDOWN_DURATION = 0, DEFAULT_TIME_OFFSET = 0 } = dictionary?.constants ?? {};
        form.setValue('duration', ROUND_DURATION);
        form.setValue('cooldown', COOLDOWN_DURATION);

        const now = setSeconds(new Date(), 0);
        form.setValue('startAt', addSeconds(now, DEFAULT_TIME_OFFSET));
        form.setValue('endAt', addSeconds(now, DEFAULT_TIME_OFFSET + ROUND_DURATION))

        const subscription = form.watch((value, { name }) => {
            if(['startAt', 'duration', 'cooldown'].includes(name!)) {
                const [startAt, duration, cooldown] = form.getValues(['startAt', 'duration', 'cooldown']);
                const newVal = addSeconds(startAt, duration + cooldown);
                form.setValue('endAt', newVal)
            }
        });
        return () => subscription.unsubscribe();

    }, [dictionary?.constants, form])


    async function onSubmit(formData: RoundFormData) {
        await createRound(formData)
        queryClient.refetchQueries({ queryKey: ['rounds'] });
        navigate(`/`)
    }


    if (isLoading) {
        return <Loader />
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-5'>
                <div className='grid xl:grid-cols-4 md:grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='number'
                                        placeholder="Enter duration in seconds" 
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Duration (seconds)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cooldown"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cooldown</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='number'
                                        placeholder="Enter cooldown in seconds"
                                        
                                        onChange={(e) => field.onChange(Number(e.target.value))} />
                                </FormControl>
                                <FormDescription>
                                    Cooldown (seconds)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='grid xl:grid-cols-4 md:grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                        name="startAt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start at</FormLabel>
                                <FormControl>
                                    <TimePicker {...field} />
                                </FormControl>
                                <FormDescription>
                                    Round start time
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endAt"
                        disabled
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End at</FormLabel>
                                <FormControl>
                                    <TimePicker {...field} format='HH:mm:ss'/>
                                </FormControl>
                                <FormDescription>
                                    Round end time
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <Button type="submit" variant='success'>Create</Button>
                </div>

            </form>
        </Form>
    )
}

function Loader() {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-32" />
        </div>
    )
}