import classes from "./Checkbox.module.scss"
import { ChangeEvent } from "react"
import cn from "classnames"

interface CheckboxProps {
    checked: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    title?: string
    className?: string
    disabled?: boolean
}

const Checkbox = ({ checked, disabled, onChange, title, className }: CheckboxProps) => {
    return (
        <label className={cn(classes.Wrap, className)}>
            <div className={classes.Label}>
                <input
                    disabled={disabled}
                    className={classes.Input}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                <div className={classes.Checkmark} />
            </div>
            {title && <div className={classes.Title}>{title}</div>}
        </label>
    )
}

export default Checkbox
