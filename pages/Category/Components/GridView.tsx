import React from 'react'
import Card from '../../../components/Card'
import { widthProduct } from '../../../hoc/withProduct'


const style: { [key in string]: React.CSSProperties } = {
    wrap: {
        marginBottom: 30
    }
}

export default function GridView(props: { product: [] }) {
    let { product } = props
    return (
        <div className="row">
            {
                product.map((e: any) => <div className="col-md-4" key={e.id} style={style.wrap}>
                    {widthProduct(Card, e)}
                </div>)
            }
        </div>
    )
}
