import cn from "classnames"
import React, { memo, useRef, useState } from "react"
import classes from "./Select.module.scss"
import { SelectOption } from "../../types/types.ts"
import { useOnClickOutside } from "../../hooks/useOnClickOutside.ts"

export interface SelectProps {
    value: SelectOption
    options: SelectOption[]
    onChange: (option: SelectOption) => void
    className?: string
}

const Select = memo(({ value, options, onChange, className }: SelectProps) => {
    const wrapRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const [open, setOpen] = useState(false)

    const toggleSelect = () => {
        setOpen(!open)
    }

    const onChangeHandler = (value: SelectOption) => {
        onChange(value)
        toggleSelect()
    }

    const closeSelect = () => {
        setOpen(false)
    }

    useOnClickOutside(wrapRef, () => closeSelect())

    return (
        <div
            ref={wrapRef}
            className={cn(classes.Wrap, className, { [classes.Open]: open })}
        >
            <div className={cn(classes.Inner, { [classes.Open]: open })}>
                <div
                    onClick={toggleSelect}
                    className={cn(classes.CurrentValue, { [classes.Open]: open })}
                >
                    <span>{value?.label}</span>
                </div>

                <div className={cn(classes.Options, { [classes.Open]: open })}>
                    {options.map((el, i) =>
                        el.value !== "" ? (
                            <div
                                key={i}
                                onClick={() => onChangeHandler(el)}
                                className={cn(classes.Option, {
                                    [classes.Active]: el.value === value.value
                                })}
                            >
                                <span>{el.label}</span>
                            </div>
                        ) : null
                    )}
                </div>
            </div>
        </div>
    )
})

export default Select
