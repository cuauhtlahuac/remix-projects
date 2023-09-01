import { Outlet } from "@remix-run/react"

export const loader = () => {
    return null
}

export default function dashboard() {
    return (
        <div>
            <h2>Ruta papa,
                se necesita que sea export default siempre
                para que funcione un componente remix</h2>
            <Outlet />
        </div>
    )
}
