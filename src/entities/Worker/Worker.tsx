import classes from "./Worker.module.scss"
import { WorkerData } from "../../features/Workers/types.ts"
import Checkbox from "../../shared/ui/Checkbox/Checkbox.tsx"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/reduxHooks.ts"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { changeFirstNameWorker, changeLastNameWorker, removeWorker, selectWorker } from "../../features/Workers/workersSlice.ts"
import cn from "classnames"
import Input from "../../shared/ui/Input/Input.tsx"
import { changeQuantityWorkers, getCompanies } from "../../features/Companies/companiesSlice.ts"

interface WorkerProps {
    data: WorkerData
    index: number
}

const Worker = ({ data, index }: WorkerProps) => {
    const dispatch = useAppDispatch()
    const companies = useAppSelector(getCompanies)
    const [editFirstName, setEditFirstName] = useState(false)
    const [firstNameValue, setFirstNameValue] = useState(data.firstName)
    const [editLastName, setEditLastName] = useState(false)
    const [lastNameValue, setLastNameValue] = useState(data.lastName)

    const changeFirstNameValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFirstNameValue(e.currentTarget.value)
    }, [])

    const changeLastNameValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLastNameValue(e.currentTarget.value)
    }, [])

    const toggleFirstNameEdit = () => {
        setEditFirstName(!editFirstName)
        if (editFirstName) {
            dispatch(changeFirstNameWorker({ id: data.id, name: firstNameValue }))
        }
    }

    const offFirstNameEdit = () => {
        setEditFirstName(false)
        dispatch(changeFirstNameWorker({ id: data.id, name: firstNameValue }))
    }

    const toggleLastNameEdit = () => {
        setEditLastName(!editLastName)
        if (editLastName) {
            dispatch(changeLastNameWorker({ id: data.id, name: lastNameValue }))
        }
    }

    const offLastNameEdit = () => {
        setEditLastName(false)
        dispatch(changeLastNameWorker({ id: data.id, name: lastNameValue }))
    }

    const onChange = useCallback(() => {
        dispatch(selectWorker({ id: data.id }))
    }, [])

    const removeHandler = useCallback(() => {
        const currentCompany = companies.find((el) => el.id === data.companyId)
        dispatch(removeWorker({ id: data.id }))
        dispatch(changeQuantityWorkers({ id: data.companyId, length: currentCompany!.quantity - 1 }))
    }, [])

    useEffect(() => {
        function handleKeyUp(event: KeyboardEvent) {
            if (event.key === "Enter") {
                if (editFirstName) offFirstNameEdit()
                if (editLastName) offLastNameEdit()
            }
        }

        window.addEventListener("keyup", handleKeyUp)
        return () => window.removeEventListener("keyup", handleKeyUp)
    }, [editLastName, lastNameValue, editFirstName, firstNameValue])

    return (
        <div className={cn(classes.Wrap, { [classes.Active]: data.selected })}>
            <div className={classes.Index}>{index + 1}</div>

            {data.firstName && (
                <div
                    onDoubleClick={toggleFirstNameEdit}
                    className={classes.Col}
                >
                    {editFirstName ? (
                        <Input
                            onBlur={offFirstNameEdit}
                            className={classes.Input}
                            onChange={changeFirstNameValue}
                            value={firstNameValue}
                        />
                    ) : (
                        <div className={classes.Name}>{data.firstName}</div>
                    )}
                </div>
            )}

            {data.lastName && (
                <div
                    onDoubleClick={toggleLastNameEdit}
                    className={classes.Col}
                >
                    {editLastName ? (
                        <Input
                            onBlur={offLastNameEdit}
                            className={classes.Input}
                            onChange={changeLastNameValue}
                            value={lastNameValue}
                        />
                    ) : (
                        <div className={classes.Name}>{data.lastName}</div>
                    )}
                </div>
            )}

            <div className={classes.Col}>{data.company && <div className={classes.Company}>{data.company}</div>}</div>
            <div className={classes.Col}>
                <button
                    className={classes.Remove}
                    onClick={removeHandler}
                >
                    Удалить
                </button>
            </div>
            <div className={classes.Col}>
                <Checkbox
                    checked={data.selected}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default Worker
