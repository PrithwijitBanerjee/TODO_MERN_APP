import Footer from "../commons/Footer"
import Header from "../commons/Header"
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <Header />
            <div style={{ minHeight: '70vh' }}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout