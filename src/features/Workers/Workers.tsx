import classes from "./Workers.module.scss"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/reduxHooks.ts"
import { getActiveAllStatus, getMoreWorkers, getPagination, getWorkers, removerSelectedWorkers, toggleAllWorkers } from "./workersSlice.ts"
import Worker from "../../entities/Worker/Worker.tsx"
import { useEffect, useRef } from "react"
import Button from "../../shared/ui/Button/Button.tsx"
import Checkbox from "../../shared/ui/Checkbox/Checkbox.tsx"
import AddNewWorker from "./AddNewWorker/AddNewWorker.tsx"
import { openModal } from "../../shared/ui/Modal/modalSlice.ts"
import { changeQuantityWorkers, removeAllWorkers } from "../Companies/companiesSlice.ts"

const Workers = () => {
    const workers = useAppSelector(getWorkers)
    const ref = useRef<HTMLDivElement>(null)
    const pagination = useAppSelector(getPagination)
    const allSelected = useAppSelector(getActiveAllStatus)
    const dispatch = useAppDispatch()

    const openModalHandler = () => {
        dispatch(openModal("new-worker"))
    }

    const toggleAllWorkersHandler = () => {
        dispatch(toggleAllWorkers(!allSelected))
    }

    const removeAllWorkersHandler = () => {
        if (allSelected) dispatch(removeAllWorkers())
        dispatch(removerSelectedWorkers())
    }

    useEffect(() => {
        if (!pagination.items.length) return
        if (pagination.page >= pagination.pageCount) return

        const observer = new IntersectionObserver((entries) => {
            const target = entries[0]
            if (target.isIntersecting) {
                dispatch(getMoreWorkers(pagination.page + 1))
            }
        })

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [pagination])

    useEffect(() => {
        // это ужасный костыль который мне пришлось сделать что бы отслеживать количство сотрудников в компаниях
        // потому что изначально я выбрал неверную структуру, а заметил только в конце а преписывать все было лень
        // но в продакшене я бы такого не сделал :)

        if (!workers.length) return
        const arr: string[] = []
        for (let i = 0; i < workers.length; i++) {
            const el = workers[i].companyId
            if (!arr.includes(el)) arr.push(el)
        }

        for (let i = 0; i < arr.length; i++) {
            const item = workers.filter((el) => el.companyId === arr[i])
            dispatch(changeQuantityWorkers({ id: arr[i], length: item.length }))
        }
    }, [removeAllWorkersHandler])

    return (
        <div className={classes.Wrap}>
            <div className={classes.Head}>
                <div className={classes.Row}>
                    <div className={classes.Caption}>{workers.length ? `Сотрудники: ${workers.length}` : ""}</div>
                    <div className={classes.Block}>
                        {pagination.items.length ? (
                            <>
                                <Checkbox
                                    className={classes.Checkbox}
                                    title={"Выбрать всех"}
                                    checked={allSelected}
                                    onChange={toggleAllWorkersHandler}
                                />
                                <Button
                                    className={classes.Button}
                                    onClick={removeAllWorkersHandler}
                                >
                                    Удалить выбранных
                                </Button>
                            </>
                        ) : null}

                        <Button onClick={openModalHandler}>Добавить</Button>
                    </div>
                </div>
            </div>
            {pagination.items && pagination.items.length ? (
                <div className={classes.List}>
                    {pagination.items.map((el, i) => (
                        <Worker
                            key={el.id}
                            index={i}
                            data={el}
                        />
                    ))}
                </div>
            ) : (
                <div className={classes.Empty}>Для получения списка сотрудников выберете компанию</div>
            )}
            <div
                ref={ref}
                className={classes.End}
            ></div>
            <AddNewWorker />
        </div>
    )
}

export default Workers
