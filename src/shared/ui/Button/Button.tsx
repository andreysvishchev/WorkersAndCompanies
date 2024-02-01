import classes from "./Button.module.scss"
import { ReactNode } from "react"
import cn from "classnames"

interface ButtonProps {
    children: ReactNode
    className?: string
    onClick: () => void
}

const Button = ({ className, children, onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} className={cn(classes.Wrap, className)}>
            {children}
        </button>
    )
}

export default Button