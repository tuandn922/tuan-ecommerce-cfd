import React from 'react'
import CardList from '../../../components/CardList'
import { widthProduct } from '../../../hoc/withProduct';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector } from 'react-redux';


export default function ListView(props: { product: [] }) {

    const productStore = useSelector((state: any) => state.product)
    let { product } = props;
    return (
        <>
            {
                productStore.loading ? [...Array(15)].map((e, i) => (
                    <CardList {...e} key={i} loading={true} />
                ))
                    : product.map((e: any) => <React.Fragment key={e._id}>{widthProduct(CardList, e)}</React.Fragment>)


            }

        </>
    )
}
