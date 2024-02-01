import classes from "./AddNewWorker.module.scss"
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/reduxHooks.ts"
import { closeModal, getModalName } from "../../../shared/ui/Modal/modalSlice.ts"
import { ChangeEvent, useCallback, useState } from "react"
import Modal from "../../../shared/ui/Modal/Modal.tsx"
import TextField from "../../../shared/ui/TextField/TextField.tsx"
import Button from "../../../shared/ui/Button/Button.tsx"
import { addNewWorker, showSelectedWorkers } from "../workersSlice.ts"
import { SelectOption } from "../../../shared/types/types.ts"
import Select from "../../../shared/ui/Select/Select.tsx"
import { changeQuantityWorkers, getCompanies, selectCompany } from "../../Companies/companiesSlice.ts"

const AddNewWorker = () => {
    const dispatch = useAppDispatch()
    const modalName = useAppSelector(getModalName)
    const companies = useAppSelector(getCompanies)
    const options = companies.map((el) => ({ value: el.id, label: el.name }))
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [post, setPost] = useState("")
    const [company, setCompany] = useState<SelectOption>(options[0])
    const [error, setError] = useState("")

    const createNewWorker = () => {
        if (firstName && lastName && company) {
            const currentCompany = companies.find((el) => el.id === company.value)
            dispatch(addNewWorker({ lastName, firstName, post, companyId: company.value, company: company.label }))
            dispatch(changeQuantityWorkers({ id: company.value, length: currentCompany!.quantity + 1 }))
            dispatch(selectCompany({ id: company.value }))
            dispatch(showSelectedWorkers({ id: company.value }))
            dispatch(closeModal())
            setError("")
        } else {
            setError("Заполните поля")
        }
    }

    const changeCompanyHandler = useCallback(
        (value: SelectOption) => {
            setCompany(value)
        },
        [options]
    )

    const changeFirstNameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.currentTarget.value)
    }, [])

    const changeLastNameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLastName(e.currentTarget.value)
    }, [])

    const changePostHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPost(e.currentTarget.value)
    }, [])

    return (
        <Modal open={modalName === "new-worker"}>
            <div className={classes.Content}>
                <div className={classes.Title}>Новая сотрудник</div>
                {error && <div className={classes.Error}>{error}</div>}

                <TextField
                    onChange={changeFirstNameHandler}
                    value={firstName}
                    label={"Фамилия"}
                />

                <TextField
                    onChange={changeLastNameHandler}
                    value={lastName}
                    label={"Имя"}
                />

                <div className={classes.Caption}>Комания</div>

                <Select
                    value={company}
                    options={options}
                    onChange={changeCompanyHandler}
                />

                <TextField
                    onChange={changePostHandler}
                    value={post}
                    label={"Должность"}
                />
                <Button
                    className={classes.Button}
                    onClick={createNewWorker}
                >
                    Создать
                </Button>
            </div>
        </Modal>
    )
}

export default AddNewWorker
