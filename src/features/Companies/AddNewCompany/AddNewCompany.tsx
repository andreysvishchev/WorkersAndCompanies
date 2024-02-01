import classes from "./AddNewCompany.module.scss"
import Modal from "../../../shared/ui/Modal/Modal.tsx"
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/reduxHooks.ts"
import { closeModal, getModalName } from "../../../shared/ui/Modal/modalSlice.ts"
import Button from "../../../shared/ui/Button/Button.tsx"
import TextField from "../../../shared/ui/TextField/TextField.tsx"
import { ChangeEvent, useCallback, useState } from "react"
import { addNewCompany } from "../companiesSlice.ts"

const AddNewCompany = () => {
    const dispatch = useAppDispatch()
    const modalName = useAppSelector(getModalName)
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")

    const createNewCompany = useCallback(() => {
        if (name && address) {
            dispatch(addNewCompany({ address, name }))
            dispatch(closeModal())
            setError("")
        } else {
            setError("Заполните поля")
        }
    }, [address, name])

    const changeNameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }, [])

    const changeAddressHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.currentTarget.value)
    }, [])

    return (
        <Modal open={modalName === "new-company"}>
            <div className={classes.Content}>
                <div className={classes.Title}>Новая компания</div>
                {error && <div className={classes.Error}>{error}</div>}

                <TextField
                    onChange={changeNameHandler}
                    value={name}
                    label={"Имя компании"}
                />
                <TextField
                    onChange={changeAddressHandler}
                    value={address}
                    label={"Адресс компании"}
                />
                <Button
                    className={classes.Button}
                    onClick={createNewCompany}
                >
                    Создать
                </Button>
            </div>
        </Modal>
    )
}

export default AddNewCompany
