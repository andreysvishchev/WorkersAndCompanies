import classes from "./TextField.module.scss"
import { InputHTMLAttributes, memo } from "react"
import cn from "classnames"

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    label?: string
}

const TextField = memo(({ className, value, onChange, label, ...otherProps }: TextFieldProps) => {
    return (
        <label className={cn(classes.Wrap, className)}>
            <span className={classes.Caption}>{label}</span>
            <input
                value={value}
                onChange={onChange}
                className={cn(classes.Input)}
                {...otherProps}
            />
        </label>
    )
})

export default TextField
