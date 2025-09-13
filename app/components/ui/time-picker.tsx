import {useMemo, type ChangeEvent, type ChangeEventHandler} from "react"
import { cn } from "@lib/utils"
import { add, addDays, format as dateFormat, isDate, set } from "date-fns";

interface TimePickerProps {
  value: Date | undefined;
  onChange: (value: any) => void;
  onBlur?: () => void;
  className?: string;
  type?: string;
  disabled?: boolean;
  name?: string;
  format?: string; 
}


export function TimePicker({ className, type, format='HH:mm', ...props }: TimePickerProps) {
  const {value = new Date, onChange, disabled=false} = props;

  const defaultValue = useMemo(()=> {
    return value && isDate(value) ? dateFormat(value, format) : dateFormat(new Date, 'HH:mm:ss');
  }, [value])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    onChange(set(value, {hours, minutes})) 
  }

  return (
    <input
      type='time'
      id='time-picker'
      value={defaultValue}
      onChange={handleChange}
      disabled={disabled}
      className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              className
            )}
    />
  )
}