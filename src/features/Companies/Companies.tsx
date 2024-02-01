import classes from "./Companies.module.scss"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/reduxHooks.ts"
import { getActiveAllStatus, getCompanies, removeSelectedCompany, toggleAllCompanies } from "./companiesSlice.ts"
import Company from "../../entities/Company/Company.tsx"
import cn from "classnames"
import Checkbox from "../../shared/ui/Checkbox/Checkbox.tsx"
import { hideAllWorkers, showAllWorkers } from "../Workers/workersSlice.ts"
import Button from "../../shared/ui/Button/Button.tsx"
import { openModal } from "../../shared/ui/Modal/modalSlice.ts"
import AddNewCompany from "./AddNewCompany/AddNewCompany.tsx"

const Companies = () => {
    const items = useAppSelector(getCompanies)
    const allSelected = useAppSelector(getActiveAllStatus)
    const dispatch = useAppDispatch()

    const toggleAllCompaniesHandler = () => {
        dispatch(toggleAllCompanies(!allSelected))
        if (!allSelected) dispatch(showAllWorkers())
        else dispatch(hideAllWorkers())
    }

    const openModalHandler = () => {
        dispatch(openModal("new-company"))
    }

    const removeSelected = () => {
        dispatch(removeSelectedCompany())
        dispatch(hideAllWorkers())
    }

    return (
        <div className={cn(classes.Wrap)}>
            <div className={classes.Head}>
                <div className={classes.Row}>
                    <div className={classes.Caption}>Компании</div>
                    <Button onClick={openModalHandler}>Добавить</Button>
                </div>

                <div className={classes.Row}>
                    <Checkbox
                        title={"Выбрать все"}
                        checked={allSelected}
                        onChange={toggleAllCompaniesHandler}
                    />
                    <button
                        onClick={removeSelected}
                        className={classes.Remove}
                    >
                        Удалить выбранные
                    </button>
                </div>
            </div>
            {items && items.length ? (
                <div className={classes.List}>
                    {items.map((el) => (
                        <Company
                            key={el.id}
                            data={el}
                        />
                    ))}
                </div>
            ) : (
                <div className={classes.Empty}>Список компаний пуст</div>
            )}
            <AddNewCompany />
        </div>
    )
}

export default Companies
