import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="log-container" to='/'>
                    <div>Logo</div>
                </Link>

                <div className="links-container">
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Navigation