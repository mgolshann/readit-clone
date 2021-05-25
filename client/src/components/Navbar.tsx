import Link from 'next/link'
import RedditLogo from '../images/2SL.svg'
import { useAuthState, useAuthDispatch } from '../context/auth'
import { Fragment } from 'react'
import axios from 'axios'
import { contextTypes } from '../types'

const Navbar: React.FC = () => {

    const { authenticated, loading } = useAuthState()
    const dispatch = useAuthDispatch()

    const logout = () => {
        axios.get('/auth/logout')
            .then(() => {
                dispatch(contextTypes.LOGOUT)
                window.location.reload()
            })
            .catch((err) => console.log(err))
    }

    return <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
        <div className="flex items-center">
            <Link href="/">
                <a><RedditLogo className="w-8 h-8 mr-2" /></a>
            </Link>
            <span className="text-2xl font-semibold">
                <Link href="/">reddit</Link>
            </span>
        </div>

        <div className="flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
            <i className="pl-4 pr-3 text-gray-500 fas fa-search"></i>
            <input
                type="text"
                placeholder="Search"
                className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none"
            />
        </div>

        <div className="flex items-center">
            {!loading && (
                authenticated ? (
                    <button
                        className="w-32 py-1 mr-2 leading-5 hollow blue button"
                        onClick={logout}
                    >log out</button>
                ) : (
                        <Fragment>
                            <Link href="/auth/login">
                                <a className="w-32 py-1 mr-2 leading-5 hollow blue button">log in</a>
                            </Link>

                            <Link href="/auth/register">
                                <a className="w-32 py-1 leading-5 blue button">sign up</a>
                            </Link>
                        </Fragment>
                    )
            )}

        </div >
    </div >
}

export default Navbar