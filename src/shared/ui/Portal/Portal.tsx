import { ReactNode } from "react"
import { createPortal } from "react-dom"

type PortalProps = {
    children: ReactNode
    element?: HTMLElement
}

export const Portal = ({ children, element = document.body }: PortalProps) => createPortal(children, element)
