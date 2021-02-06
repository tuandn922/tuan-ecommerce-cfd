import { totalmem } from "os";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { closeCart } from "../../../actions/cartAction";
import { FormatNumber } from "../../../helper";
import CartItem from "./CartItem";



const portalCart = document.createElement('div');
portalCart.id = 'popup-cart'
document.body.append(portalCart)


const Cart = () => {
    const cart = useSelector((state: any) => state.cart)

    useEffect(() => {
        if (cart.open) {
            portalCart.classList.add('is-open')
        } else {
            portalCart.classList.remove('is-open')
        }
    }, [cart.open])

    const dispatch = useDispatch()



    return ReactDOM.createPortal(
        <div className="cart">
            <div className="cart--inner">
                <div className="cart--head">
                    <h3 className="cart--title">Giỏ hàng</h3>
                    <div className="cart--close" onClick={dispatch.bind(null, closeCart())}>
                        Đóng
              <img src="/assets/icon-close.svg" alt="" />
                    </div>
                </div>
                <div className="cart--body">
                    {
                        cart.list.map((e: any) => (
                            <CartItem
                                {...e}
                            />
                        ))
                    }
                    {
                        cart.list.length === 0 && <p style={{ textAlign: 'center', marginTop: 80, lineHeight: '25px' }}>Bạn chưa chọn sản phẩm nào, tiếp tục chọn cho mình sản phẩm ưng ý và quay lại.</p>
                    }

                </div>
                <div className="cart--foot">
                    <div className="subtotal">
                        Tổng tiền
                        <span>{FormatNumber(cart.amount)}VNĐ</span>
                    </div>
                    <div className="button" style={{ padding: 0 }}>
                        <div className="btn--apply" onClick={() => dispatch(closeCart())} style={{ paddingLeft: 0 }}>
                            <span>← Tiếp tục mua sắm</span>
                        </div>
                        {
                            cart.total > 0 && (
                                <Link onClick={() => dispatch(closeCart())} to="/thanh-toan" className="btn btn-buy">
                                    <span>Thanh toán</span>
                                </Link>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>,
        portalCart
    )
};



export default Cart;
