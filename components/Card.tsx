import React from 'react'
import { NavLink } from 'react-router-dom';


export default function Card(props: any) {


    return (
        <div className="card">
            <NavLink to="/" className="card--head">
                <img src={props.thumbnail_url} alt="" />
                {
                    props.percent > 0 && (
                        <div className="card--percent">
                            <span>-{props.percent}%</span>
                        </div>
                    )
                }

            </NavLink>
            <div className="card--body">
                <h2 className="card--title">
                    <NavLink to="/">{props.name}</NavLink>
                </h2>
                {/* <h3 className="card--desc">
                
                </h3> */}
                <div className="card--footer">
                    <div className="card--price">
                        {props.real_price_str} vnđ
                    </div>
                    {
                        props.percent > 0 && (
                            <div className="card--price-promotion">
                                {props.price_str}
                            </div>
                        )
                    }

                    {/* <div className="btn btn-buy">
                        <span>Buy Now</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
