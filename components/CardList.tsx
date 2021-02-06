import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { cartAddItem } from "../actions/cartAction";
import RatingStar from "./RatingStar";

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

export default function CardList(props: any) {

  let { loading, thumbnail_url, percent, name } = props;
  const dispatch = useDispatch()


  return (
    <div className="card--list">
      {
        loading ? <Skeleton variant="rect" animation="wave" width={160} height={200} /> : <NavLink to={`/chi-tiet/${props.slug}`} className="card--image">
          <img src={thumbnail_url} alt="" />
          {
            percent > 0 && <span className="card--percent">-{percent}%</span>
          }
        </NavLink>
      }

      <div className="card--details">
        {
          loading ? <Skeleton variant="rect" height={50} style={{ marginBottom: 10 }} /> : (
            <h2 className="title"><NavLink to={`/chi-tiet/${props.slug}`}>{name}</NavLink></h2>
          )
        }

        {/* <div className="desc">Space for a small product description</div> */}
        {
          loading ? <Skeleton variant="rect" width="50%" /> : <RatingStar rating_average={props.rating_average} review_count={props.review_count} />
        }

        <div className="details">
          <ul className="left">
            {
              loading ? <Skeleton variant="rect" width={100} height={15} style={{ marginTop: 10 }} /> : (
                <li>
                  <span>Fresheness</span>
                </li>
              )
            }
            {
              loading ? <Skeleton variant="rect" width={100} height={15} style={{ marginTop: 10 }} /> : (
                <li>
                  <span>Farm</span>
                </li>
              )
            }
            {
              loading ? <Skeleton variant="rect" width={100} height={15} style={{ marginTop: 10 }} /> : (
                <li>
                  <span>Delivery</span>
                </li>
              )
            }
            {
              loading ? <Skeleton variant="rect" width={100} height={15} style={{ marginTop: 10 }} /> : (
                <li>
                  <span>Còn lại</span>
                </li>
              )
            }



          </ul>
          <ul className="right">
            {
              loading ? <Skeleton variant="rect" width={100} height={15} style={{ marginTop: 10 }} /> : (
                <li>
                  <span>
                    <span className="green">New</span> (Extra fresh)
                  </span>
                </li>
              )
            }
            {
              loading ? <Skeleton variant="rect" width={100} height={15} style={{ marginTop: 10 }} /> : (
                <li>
                  <span>Grocery Tarm Fields</span>
                </li>
              )
            }
            {
              loading ? <Skeleton variant="rect" width={100} height={15} style={{ marginTop: 10 }} /> : (
                <li>
                  <span>Europe</span>
                </li>
              )
            }
            {
              loading ? <Skeleton variant="rect" width={100} height={15} style={{ marginTop: 10 }} /> : (
                <li>
                  <span className="green">{props.quanty}</span>
                </li>
              )
            }



          </ul>
        </div>
      </div>
      <div className="card--price">
        {
          loading ? <Skeleton variant="rect" height="50" style={{ marginBottom: 10 }} /> : (
            <div className="card--price__top">
              <p className="price">{props.real_price_str} vnđ</p>
              {
                percent > 0 && <p className="discount">{props.price_str}</p>
              }

            </div>
          )
        }
        {
          loading ? <Skeleton variant="text" /> : (
            <div className="card--price__mid">
              <p>Miễn phí giao hàng</p>
              <p>Gia hàng trong 1 ngày</p>
            </div>
          )
        }

        <div className="card--price__bot">
          {
            loading ? <><Skeleton variant="text" width="100%" /><Skeleton variant="text" width="100%" /></> : (
              <div className="btn btn-buy" onClick={dispatch.bind(null, cartAddItem(props))}>
                <span>Thêm vào giỏ hàng</span>
                <img src="/assets/right-white.svg" alt="" />
              </div>
            )
          }

          {
            loading ? <Skeleton variant="rect" width="100%" height={20} style={{ marginTop: 10 }} /> : (
              <div className="btn--more">
                <img src="/assets/icon-heart.svg" alt="" />
                <span>Thêm vào yêu thích</span>
              </div>
            )
          }


        </div>
      </div>
    </div>
  );
}
