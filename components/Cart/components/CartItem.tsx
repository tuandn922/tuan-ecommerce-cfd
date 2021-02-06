import { useDispatch } from "react-redux";
import { deleteItem, itemDecrement, itemIncrement } from "../../../actions/cartAction";
import RatingStar from "../../RatingStar";

const CartItem = (props: any) => {

    let dispatch = useDispatch()

    return (
        <div className="cart--item">
            <div className="left">
                <div className="image">
                    <img src={props.thumbnail_url} alt="" />
                </div>
                <div className="wishlist">
                    <img src="/assets/icon-heart-organe.svg" alt="" />
                    <span>Thêm vào yêu thích</span>
                </div>
                <div className="close" onClick={() => dispatch(deleteItem(props._id))}>
                    <img src="/assets/icon-close.svg" alt="" />
                    <span>Xoá</span>
                </div>
            </div>
            <div className="right">
                <div className="name">{props.name}</div>
                <div className="group-star">
                    <RatingStar rating_average={props.rating_average} review_count={props.review_count} />
                </div>
                <div className="bottom">
                    <div className="price">
                        {props.real_price_str}VNĐ
                        {
                            props.percent > 0 && <span>{props.price_str}VNĐ</span>
                        }

                    </div>
                    <div className="quantity">
                        <span className="btn--decrease" onClick={() => dispatch(itemDecrement(props._id))}>-</span>
                        <span>{props.cart_count}</span>
                        <span className="btn--increase" onClick={() => dispatch(itemIncrement(props._id))}>+</span>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartItem;
