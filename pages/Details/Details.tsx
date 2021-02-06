import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { loadingProductDetail, productDetailFinish } from '../../actions/productAction'
import Breadcrumbs from '../../components/Brecdcrumbs'
import Api from '../../helper/Api'
import { widthProduct } from '../../hoc/withProduct'
import ProductDetails from './Component/ProductDetails'
import Related from './Component/Related'



export default function Details() {

    let productID: any = useRouteMatch()

    productID = productID.params.slug?.match(/\d+$/g, '')?.[0] || null;
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadingProductDetail())
        if (productID) {
            Api(`product/${productID}`).get()
                .then(res => {
                    dispatch(productDetailFinish(res))
                })

        }
    }, [productID])


    let product = useSelector((store: any) => store.product);


    return (
        <>
            <Breadcrumbs links={[
                { title: "Homepage", link: "/" },
                { title: "Category", link: "/category" },
                { title: "Carrots" },
            ]}
            />
            <section className="product">
                <div className="container">
                    {
                        product.detailLoading ?
                            <ProductDetails loading={true} /> :
                            widthProduct(ProductDetails, product.detail)
                    }
                    <Related />
                </div>
            </section>
        </>
    )
}
