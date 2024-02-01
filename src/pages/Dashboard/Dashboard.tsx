import classes from "./Dashboard.module.scss"
import Companies from "../../features/Companies/Companies.tsx"
import Workers from "../../features/Workers/Workers.tsx"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/reduxHooks.ts"
import { getCompaniesStatus, initState } from "../../features/Companies/companiesSlice.ts"
import Preloader from "../../shared/ui/Preloader/Preloader.tsx"

const Dashboard = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(getCompaniesStatus)

    useEffect(() => {
        setTimeout(() => {
            dispatch(initState())
        }, 1000)
    }, [])

    return (
        <div className={classes.Wrap}>
            {status === 'idle' ? (
                <>
                    <Companies />
                    <Workers />
                </>
            ) : (
                <Preloader />
            )}
        </div>
    )
}

export default Dashboard
