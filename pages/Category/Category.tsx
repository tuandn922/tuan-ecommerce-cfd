import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, NavLink, useParams, useHistory, Link } from "react-router-dom";
import ListView from "./Components/ListView";
import GridView from "./Components/GridView";
import FilterBar from './Components/FilterBar'
import Paginate from "../../components/Paginate";
import Api from "../../helper/Api";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, loadingProduct } from "../../actions/productAction";
import { getQueryParam, convertObjToQueryURL } from "../../hooks/queryURL";
import getQueryString from "./getQueryString";
import Breadcrumbs from "../../components/Brecdcrumbs";



export default function Category() {
  let { url } = useRouteMatch();
  // let [categories, setCategories] = useState(null);

  const dispatch = useDispatch()
  let urlParams: any = useParams();
  let history = useHistory();

  let catID = urlParams?.cat?.replace(/[^0-9]/g, '');
  let queryUrl = getQueryString(urlParams, { remove: { view: 1 } });
  let viewGrid = getQueryString(urlParams, { data: { view: 'grid' }, remove: { categories: 1 } });
  let viewList = getQueryString(urlParams, { data: { view: 'list' }, remove: { categories: 1 } });


  useEffect(() => {
    dispatch(loadingProduct())
    Api('product' + (queryUrl ? `?${queryUrl}` : '')).get()
      .then(res => {
        dispatch(fetchProduct(res))
      })
  }, [queryUrl])




  let categories = useSelector((store: any) => store.categories).list
  const product = useSelector((state: any) => state.product)

  if (categories.length === 0) return null;

  let queryURL = getQueryParam();

  let view = queryURL.view || 'list'
  let sort = (queryURL.sort || 'real_price.-1')

  sort = sort.split('.')


  function sortPrice(options: Object) {
    let query = getQueryParam()
    delete query.page;

    query.sort = JSON.stringify(options).replace(/[{}"]/g, '').replace(/:/g, '.');

    history.push({
      search: '?' + convertObjToQueryURL(query)
    })
  }


  let category: any = 'Danh sách sản phẩm'
  if (catID) {
    category = categories.find((e: any) => e.id === parseInt(catID));
    category = category.title;
  }


  return (
    <>
      <Breadcrumbs links={[
        { title: "Trang chủ", link: "/" },
        { title: category },
      ]} />
      <section className="category">
        <div className="container">
          <div className="heading">
            <h2 className="heading--title">{category}</h2>
            <div className="heading--group">
              <span className="label">Thể hiện: </span>
              <Link to={`${url}?${viewGrid}`} className={`heading--item ${view === 'grid' ? 'active' : ''}`}>
                <span>
                  <img src="/assets/icon-square.svg" alt="" />
                </span>
                <span className="type">Lưới</span>
              </Link>
              <Link to={`${url}?${viewList}`} className={`heading--item ${view === 'list' ? 'active' : ''}`}>
                <span>
                  <img src="/assets/icon-section.svg" alt="" />
                </span>
                <span className="type">Danh sách</span>
              </Link>
              <div className="heading--item">
                <span className="number">{product.paginate?.count}</span>
                <span className="type">Sản phâm</span>
              </div>
            </div>
          </div>
          <div className="filter--top">
            <div className="filter--top__group">
              <div className="label" style={{ marginRight: 15 }}>Sắp xếp: </div>
              <div className="filter--item">
                <div className="field">
                  <input type="radio" id="small" name="size" defaultChecked={sort[0] == 'real_price' && sort[1] == -1} />
                  <label htmlFor="small" className={`radio ${sort[0] == 'real_price' && sort[1] == -1 ? 'active' : ''}`} onClick={sortPrice.bind(null, { real_price: -1 })}>
                    Giá cao
                  </label>
                </div>
                <div className="field">
                  <input type="radio" id="big" name="size" defaultChecked={sort[0] == 'real_price' && sort[1] == 1} />
                  <label htmlFor="big" className={`radio ${sort[0] == 'real_price' && sort[1] == 1 ? 'active' : ''}`} onClick={sortPrice.bind(null, { real_price: 1 })}>
                    Giá thấp
                  </label>
                </div>
                <div className="field">
                  <input type="radio" id="km" name="size" defaultChecked={sort[0] == 'discount_rate'} />
                  <label htmlFor="big" className={`radio ${sort[0] == 'discount_rate' ? 'active' : ''}`} onClick={sortPrice.bind(null, { discount_rate: -1 })}>
                    Khuyến mãi nhiều
                  </label>
                </div>
              </div>
            </div>
            <div className="filter--top__applied">
              <h3>Lọc theo:</h3>
              <div className="selected--group">
                <span className="selected--item">Selected Filter</span>
                <span className="selected--item">Selected Filter</span>
              </div>
            </div>
          </div>
          <div className="category--main">
            <div className="row">
              <div className="col-md-3">
                <FilterBar categories={categories} />
              </div>
              <div className="col-md-9 products">
                {
                  view === 'grid' ? <GridView product={product.list} /> :
                    <ListView product={product.list} />
                }
                <Paginate {...product.paginate} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
