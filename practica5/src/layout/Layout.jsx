import { Outlet } from "react-router";
import Header from "../Components/Header";

export default function Layout() {
    return (
        <>
            <Header />
            <main className="mx-auto container py-16">
                <Outlet/>
            </main>
        </>
    )
}