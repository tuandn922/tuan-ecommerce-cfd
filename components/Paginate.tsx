import React from 'react'
import { NavLink } from 'react-router-dom';
import { addQuery } from '../helper/url';

export default function Paginate(props: { totalPage: number, count: number, currentPage: number, nextPage?: number, previousPage?: number }) {
    let { totalPage, count, currentPage, nextPage, previousPage } = props;

    function renderPage() {
        let start = currentPage - 2
        if (start < 1) start = 1

        let end = start + 4
        if (end > totalPage) {
            end = totalPage
            start = end - 4
        }


        let list = []
        for (let i = start; i <= end; i++) {
            list.push(<li key={i}><NavLink to={addQuery({ page: i })} className={i === currentPage ? 'current' : ''}>{i}</NavLink></li>)
        }

        return list;
    }

    return (
        <ul className="paginate mg-v-40">
            {
                currentPage > 1 && <li><NavLink rel="prev" className="prev" to={addQuery({ page: currentPage - 1 })}><i className="fa fa-angle-left"></i></NavLink></li>
            }

            {
                renderPage()
            }


            {
                currentPage < totalPage && <li><NavLink className="next" rel="next" to={addQuery({ page: currentPage + 1 })}><i className="fa fa-angle-right"></i></NavLink></li>
            }

        </ul>
    )
}
