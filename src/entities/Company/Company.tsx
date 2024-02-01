import classes from "./Company.module.scss"
import { CompanyData } from "../../features/Companies/types.ts"
import Checkbox from "../../shared/ui/Checkbox/Checkbox.tsx"
import { useAppDispatch } from "../../shared/hooks/reduxHooks.ts"
import { changeAddressCompany, changeNameCompany, selectCompany } from "../../features/Companies/companiesSlice.ts"
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react"
import cn from "classnames"
import { changeCompanyNameForWorkers, hideSelectedWorkers, showSelectedWorkers } from "../../features/Workers/workersSlice.ts"
import Input from "../../shared/ui/Input/Input.tsx"

interface CompanyProps {
    data: CompanyData
}

const Company = memo(({ data }: CompanyProps) => {
    const dispatch = useAppDispatch()
    const [editAddress, setEditAddress] = useState(false)
    const [addressValue, setAddressValue] = useState(data.address)
    const [editName, setEditName] = useState(false)
    const [nameValue, setNameValue] = useState(data.name)

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!data.quantity) return
        dispatch(selectCompany({ id: data.id }))
        if (e.currentTarget.checked) dispatch(showSelectedWorkers({ id: data.id }))
        else dispatch(hideSelectedWorkers({ id: data.id }))
    }, [])

    const toggleAddressEdit = () => {
        setEditAddress(!editAddress)
        if (editAddress) dispatch(changeAddressCompany({ id: data.id, address: addressValue }))
    }

    const offAddressEdit = () => {
        setEditAddress(false)
        dispatch(changeAddressCompany({ id: data.id, address: addressValue }))
    }

    const changeAddressValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAddressValue(e.currentTarget.value)
    }, [])

    const toggleNameEdit = () => {
        setEditName(!editName)
        if (editName) {
            dispatch(changeNameCompany({ id: data.id, name: nameValue }))
            dispatch(changeCompanyNameForWorkers({ id: data.id, name: nameValue }))
        }
    }

    const offNameEdit = () => {
        setEditName(false)
        dispatch(changeNameCompany({ id: data.id, name: nameValue }))
        dispatch(changeCompanyNameForWorkers({ id: data.id, name: nameValue }))
    }

    const changeNameValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.currentTarget.value)
    }, [])

    useEffect(() => {
        function handleKeyUp(event: KeyboardEvent) {
            if (event.key === "Enter") {
                if (editAddress) offAddressEdit()
                if (editName) offNameEdit()
            }
        }

        window.addEventListener("keyup", handleKeyUp)
        return () => window.removeEventListener("keyup", handleKeyUp)
    }, [editAddress, addressValue, editName, nameValue])

    return (
        <div className={cn(classes.Wrap, { [classes.Active]: data.selected })}>
            {data.name && (
                <div
                    onDoubleClick={toggleNameEdit}
                    className={classes.Col}
                >
                    {editName ? (
                        <Input
                            onBlur={offNameEdit}
                            className={classes.Input}
                            onChange={changeNameValue}
                            value={nameValue}
                        />
                    ) : (
                        <div className={classes.Head}>
                            <div className={classes.Title}>{data.name}</div>
                            <div className={classes.Quantity}>Сотрудники {data.quantity}</div>
                        </div>
                    )}
                </div>
            )}

            {data.address && (
                <div
                    onDoubleClick={toggleAddressEdit}
                    className={classes.Col}
                >
                    {editAddress ? (
                        <Input
                            onBlur={offAddressEdit}
                            className={classes.Input}
                            onChange={changeAddressValue}
                            value={addressValue}
                        />
                    ) : (
                        <div className={classes.Address}>{data.address}</div>
                    )}
                </div>
            )}

            <Checkbox
                checked={data.selected}
                onChange={onChange}
                title={"Выбрать"}
            />
        </div>
    )
})

export default Company
