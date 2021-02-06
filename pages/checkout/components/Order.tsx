import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { CartItem } from "../../../components/Cart";
import { FormatNumber } from "../../../helper";

let time: any = new Date();
time.setDate(time.getDate() + 4)
time = `Tháng ${time.getMonth() + 1}, Ngày ${time.getDate()}, ${time.getFullYear()}`

const style: { [key in string]: React.CSSProperties } = {
  price: {
    fontSize: 20
  }
}

export default function Order() {
  const cart = useSelector((state: any) => state.cart)
  if (cart.total === 0) return <Redirect to="/the-loai" />
  return (
    <div className="order">
      <div className="order--inner">
        <div className="step">
          <h3 className="step--title">Thông tin giỏ hàng</h3>
          <div className="step--required">
            <p>
              Giá có thể thay đổi dựa trên phí ship và thuế nơi bạn ở.
            </p>
          </div>
          <div className="cart">
            <div className="cart--body">
              {
                cart.list.map((e: any) => <CartItem key={e._id} {...e} />)
              }

            </div>
          </div>
          <div className="subtotal">
            <div className="subtotal--row">
              <span>Tổng tiền hàng</span>
              <span style={style.price}>{FormatNumber(cart.amount)}VNĐ</span>
            </div>
            <div className="subtotal--row">
              <span>Thuế VAT</span>
              <span>{FormatNumber(cart.vat)}VNĐ</span>
            </div>
            <div className="subtotal--row">
              <span>Phí ship</span>
              <span>{FormatNumber(cart.shippingFee)}VNĐ</span>
            </div>
            <div className="promo">
              <input type="text" name="promo" placeholder="Mã giảm giá" />
              <button className="btn--apply">Áp dụng ngay</button>
            </div>
          </div>
          <div className="total">
            <div className="total--title">
              <h4>Tổng tiền</h4>
              <p>Ngày giao hàng dự kiến: {time}</p>
            </div>
            <div className="total--price">{FormatNumber(cart.amount + cart.vat + cart.shippingFee)}VNĐ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
