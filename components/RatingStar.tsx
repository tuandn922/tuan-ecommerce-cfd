import React from 'react'

const style: { [key in string]: React.CSSProperties } = {
    rating: {
        background: 'url(/assets/icon-star-none.svg) repeat-x',
        height: 20,
        width: 85,
        position: 'relative'
    },
    ratingValue: {
        background: 'url(/assets/icon-star.svg) repeat-x',
        height: 20,
        position: 'absolute',
        backgroundSize: 17,

    },
    ratingNumber: {
        position: 'absolute',
        left: '110%',
        top: 2,
        whiteSpace: 'nowrap'
    },
    reviewCount: {
        fontSize: 14,
        color: 'gray'
    }
}
export default function RatingStar(props: { rating_average: number, review_count: number }) {
    return (
        <div className="start--group" style={style.rating}>
            <div className="rating-value" style={{ ...style.ratingValue, width: `${props.rating_average / 5 * 100}%` }}></div>
            <div style={style.ratingNumber}>{props.rating_average} <span style={style.reviewCount}>({props.review_count})</span></div>

        </div>
    )
}
