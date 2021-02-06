import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShippingOption } from "../../../actions/cartAction";
import { FormatNumber } from "../../../helper";

export default function Info() {
  let dispatch = useDispatch()
  const cart = useSelector((state: any) => state.cart)
  function shippingSelect(e: any) {
    dispatch(selectShippingOption({
      price: parseInt(e.target.getAttribute('data-frice')),
      option: e.target.value
    }))
  }
  console.log(cart)
  return (
    <>
      <div className="step">
        <h3 className="step--title">Thông tin đơn hàng</h3>
        <div className="step--required">
          <p>Xin vui lòng nhập đầy đủ thông tin ở dưới</p>
          <p>Bước 1 (5)</p>
        </div>
        <div className="field--wrap">
          <div className="custom-field">
            <label htmlFor="firstName">Họ và tên</label>
            <input
              className="text"
              type="text"
              name="firstName"
              placeholder="First name"
            />
          </div>
          <div className="custom-field">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              className="text"
              type="text"
              name="phone"
              placeholder="Phone number"
            />
          </div>
        </div>
        <div className="field--wrap">
          <div className="custom-field">
            <label htmlFor="email">Địa chỉ email</label>
            <input
              className="text"
              type="text"
              name="email"
              placeholder="Email address"
            />
          </div>

        </div>
        <div className="field--wrap">
          <div className="custom-field" style={{ width: '100%' }}>
            <label htmlFor="address">Địa chỉ</label>
            <input
              className="text"
              type="text"
              name="address"
              placeholder="Address"
            />
          </div>
        </div>
        <div className="field--wrap">
          <div className="custom-field--checkbox field">
            <input type="checkbox" name="checkShip" />
            <span>Giao tới điạ chỉ khác?</span>
          </div>
        </div>
      </div>
      <div className="step">
        <h3 className="step--title">Phương thức giao hàng</h3>
        <div className="step--required">
          <p>Vui lòng chọn phương giao hàng bạn muốn</p>
          <p>Bước 2 (5)</p>
        </div>
        <div className="field--wrap bg-grey" style={{ marginBottom: 16 }}>
          <div className="field">
            <input type="radio" id="fedex" name="billing-method" onChange={shippingSelect} data-frice={15000} value="giao_thuong" defaultChecked={cart.shippingSelected === 'giao_thuong'} />
            <label htmlFor="fedex" className={'radio ' + (cart.shippingSelected === 'giao_thuong' ? 'active' : '')}>Giao thường</label>
          </div>
          <div className="additional">
            <span className="green"> + {FormatNumber(15000)}VNĐ</span>
            <span className="name">Phí ship</span>
          </div>
          <div className="icon">
            <img src="/assets/fedex.svg" alt="" />
          </div>
        </div>
        <div className="field--wrap bg-grey">
          <div className="field">
            <input type="radio" id="dhl" name="billing-method" onChange={shippingSelect} data-frice={45000} value="giao_nhanh" defaultChecked={cart.shippingSelected === 'giao_nhanh'} />
            <label htmlFor="dhl" className={'radio ' + (cart.shippingSelected === 'giao_nhanh' ? 'active' : '')}>Giao hàng nhanh</label>
          </div>
          <div className="additional">
            <span className="green"> + {FormatNumber(45000)}VNĐ</span>
            <span className="name">Phí ship</span>
          </div>
          <div className="icon">
            <img src="/assets/dhl.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
