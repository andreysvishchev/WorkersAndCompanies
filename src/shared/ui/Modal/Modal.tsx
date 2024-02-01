import classes from "./Modal.module.scss"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../../hooks/reduxHooks.ts"
import { closeModal } from "./modalSlice.ts"
import { useOnClickOutside } from "../../hooks/useOnClickOutside.ts"
import { Portal } from "../Portal/Portal.tsx"
import cn from "classnames"

interface ModalProps {
    children: ReactNode
    open: boolean
}

const Modal = ({ children, open }: ModalProps) => {
    const [visible, setVisible] = useState(open)
    const [showNotice, setShowNotice] = useState(false)

    const modalRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    const handleCloseModal = useCallback(() => {
        dispatch(closeModal())
    }, [])

    useOnClickOutside(modalRef, () => {
        setShowNotice(false)
        handleCloseModal()
    })

    useEffect(() => {
        if (open) {
            // addPadding()
            setVisible(true)

            window.addEventListener("keyup", handleKeyUp)
            return () => window.removeEventListener("keyup", handleKeyUp)
        }

        if (!open) {
            setShowNotice(false)

            setTimeout(() => {
                setVisible(false)
                // removePadding()
            }, 310)
        }

        function handleKeyUp(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setShowNotice(false)
                handleCloseModal()
            }
        }
    }, [open])

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setShowNotice(true)
            }, 10)
        }
    }, [visible])

    return visible ? (
        <Portal>
            <div className={cn(classes.Wrap, { [classes.Visible]: showNotice })}>
                <div className={classes.FillBg} />

                <div
                    ref={modalRef}
                    className={classes.Content}
                >
                    <button
                        onClick={handleCloseModal}
                        className={classes.CloseButton}
                    >
                        X
                    </button>

                    {children}
                </div>
            </div>
        </Portal>
    ) : null
}

export default Modal
