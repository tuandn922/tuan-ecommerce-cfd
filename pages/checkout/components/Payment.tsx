import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAddItem, selectPayment } from "../../../actions/cartAction";

export default function Payment() {
  const dispatch = useDispatch()

  function paymentSelect(e: any) {
    dispatch(selectPayment(e.target.value))
  }

  const cart = useSelector((state: any) => state.cart)
  return (
    <>
      <div className="step">
        <h3 className="step--title">Hình thức thanh toán</h3>
        <div className="step--required">
          <p>Vui lòng chọn 1 trong các hình thức thanh toán bên dưới</p>
          <p>Bước 3 (5)</p>
        </div>
        <div className={`field--wrap ${cart.paymentMethod !== 'money' && 'bg-grey'}`} style={{ marginBottom: "16px" }}>
          <div className="field">
            <input
              type="radio"
              name="payment-method"
              id="payment_money"
              value="money"
              defaultChecked={cart.paymentMethod === 'money'}
              onClick={paymentSelect}

            />
            <label htmlFor="payment_money" className="radio">Thanh toán khi nhận hàng</label>
          </div>
          <div className="icon">
            <img src="/assets/icon-money.png" alt="" style={{ width: 32 }} />
          </div>
        </div>
        <div className={`wrap ${cart.paymentMethod !== 'creditCard' && 'bg-grey'}`}>
          <div className="field--top">
            <div className="field--wrap" style={{ marginTop: 0, padding: 0 }}>
              <div className="field" >
                <input
                  type="radio"
                  name="payment-method"
                  id="payment1"
                  value="creditCard"
                  defaultChecked={cart.paymentMethod === 'creditCard'}
                  onClick={paymentSelect}
                />
                <label htmlFor="payment1" className="radio">
                  Credit card
                </label>
              </div>
              <div className="icon">
                <img src="/assets/visa.svg" alt="" />
                <img src="/assets/mastercard.svg" alt="" />
              </div>
            </div>
          </div>
          {
            cart.paymentMethod === 'creditCard' && (
              <div className="field--bottom">
                <div className="field--wrap">
                  <div className="custom-field" style={{ width: "100%" }}>
                    <label htmlFor="email">Card number</label>
                    <input
                      className="text"
                      type="text"
                      name="email"
                      placeholder="Card number"
                    />
                  </div>
                </div>
                <div className="field--wrap">
                  <div className="custom-field" style={{ width: 350 }}>
                    <label htmlFor="email">Card holder</label>
                    <input
                      className="text"
                      type="text"
                      name="cardHolder"
                      placeholder="Card holder"
                    />
                  </div>
                  <div className="custom-field small">
                    <label htmlFor="email">Expiration date</label>
                    <input
                      className="text-small"
                      type="text"
                      name="Expiration"
                      placeholder="DD/MM/YY"
                    />
                  </div>
                  <div className="custom-field small">
                    <label htmlFor="email">CVC</label>
                    <input
                      className="text-small"
                      type="text"
                      name="cvc"
                      placeholder="CVC"
                    />
                  </div>
                </div>
              </div>
            )
          }

        </div>
        <div className={`field--wrap ${cart.paymentMethod !== 'paypal' && 'bg-grey'}`} style={{ marginBottom: "16px" }}>
          <div className="field">
            <input
              type="radio"
              name="payment-method"
              id="payment2"
              value="paypal"
              defaultChecked={cart.paymentMethod === 'paypal'}
              onClick={paymentSelect}

            />
            <label htmlFor="payment2" className="radio">PayPal</label>
          </div>
          <div className="icon">
            <img src="/assets/paypal.svg" alt="" />
          </div>
        </div>
        <div className={`field--wrap ${cart.paymentMethod !== 'bitcoin' && 'bg-grey'}`}>
          <div className="field">
            <input
              type="radio"
              name="payment-method"
              id="payment3"
              value="bitcoin"
              defaultChecked={cart.paymentMethod === 'bitcoin'}
              onClick={paymentSelect}

            />
            <label htmlFor="payment3" className="radio">
              Bitcoin
                </label>
          </div>
          <div className="icon">
            <img src="/assets/bitcoin.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
