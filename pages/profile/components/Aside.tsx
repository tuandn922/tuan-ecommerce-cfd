import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { logout } from '../../../actions/userAction';

export default function Aside() {
    let routerMatch = useRouteMatch();
    let { url } = routerMatch

    const user = useSelector((state: any) => state.user)
    const dispatch = useDispatch()

    return (
        <aside className="account-aside">
            <div className="avatar">
                <img src="https://salt.tikicdn.com/desktop/img/avatar.png" />
                <div className="info">Tài khoản của<strong>{user.login.name}</strong></div>
            </div>
            <ul className="nav">
                <li>
                    <NavLink to={`${url}`} activeClassName="is-active" exact>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span>Thông tin tài khoản</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`${url}/thong-bao`} activeClassName="is-active">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                        </svg>
                        <span>Thông báo của tôi</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`${url}/don-hang`} activeClassName="is-active">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z" />
                        </svg>
                        <span>Quản lý đơn hàng</span>
                    </NavLink>
                </li>

                <li>
                    <a href="/customer/wishlist" >
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span>Sản phẩm yêu thích</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)" onClick={() => dispatch(logout())}>

                        <span style={{ marginLeft: 45 }}>Đăng xuất</span>
                    </a>
                </li>
            </ul>
        </aside>
    )
}
