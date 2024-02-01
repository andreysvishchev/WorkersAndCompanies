import classes from "./Input.module.scss"
import { InputHTMLAttributes, memo } from "react"
import cn from "classnames"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

const Input = memo(({ className, onChange, value, ...otherProps }: InputProps) => {
    return (
        <div className={cn(classes.Wrap, className)}>
            <input
                value={value}
                onChange={onChange}
                className={cn(classes.Input)}
                {...otherProps}
            />
        </div>
    )
})

export default Input
