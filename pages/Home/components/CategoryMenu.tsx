import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Banner from './Banner'
import Filter from './Filter'

export default function CategoryMenu() {
    const categories = useSelector((state: any) => state.categories)

    return (
        <>
            <section className="section">
                <div className="wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <Filter>
                                    <h2 className="filter--title">Thể loại</h2>
                                    <ul className="filter--link">
                                        {
                                            categories.list.filter((e: any, i: number) => i < 5).map((e: any) => (
                                                <li> <Link to={`/the-loai/${e.slug}`}>{e.title}</Link></li>
                                            ))
                                        }
                                    </ul>
                                    <NavLink to="/the-loai/" className="btn btn--more">
                                        <span>Xem thêm</span>
                                        <span className="right">
                                            <img src="/assets/icon-right.svg" alt="" />
                                        </span>
                                    </NavLink>
                                </Filter>
                            </div>
                            <div className="col-md-9 banner--wrap">
                                <Banner />
                                <Banner />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
