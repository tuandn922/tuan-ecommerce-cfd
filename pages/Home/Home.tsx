import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Api } from '../../helper'
import CategoryMenu from './components/CategoryMenu'
import Headline from './components/Headline'
import Products from './components/Products'

export default function Home() {

    const categories = useSelector((state: any) => state.categories)

    let [cat, setCat]: any = useState(null)

    useEffect(() => {
        Api('home/product').get()
            .then(res => {
                setCat(res)
            })
    }, [])

    if (!cat) return null


    function renderCatHot() {
        return categories.list.map((e: any) => ({
            ...e,
            slug: '/the-loai/' + e.slug + '?' + 'sort=sort_item.qty.-1'
        }))
    }

    function renderCatDiscount() {
        return categories.list.map((e: any) => ({
            ...e,
            slug: '/the-loai/' + e.slug + '?' + 'sort=discount_rate.-1'
        }))
    }

    return (
        <>
            <CategoryMenu />
            <Products
                title="Sản phẩm hot"
                categories={renderCatHot()}
                products={cat.hot}
            />
            <Products
                title="Đang khuyến mãi nhiều"
                categories={renderCatDiscount()}
                products={cat.discount}


            />
            <Headline />
        </>
    )
}
