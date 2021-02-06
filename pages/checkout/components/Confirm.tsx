import React from "react";

export default function Confirm() {
  return (
    <>
      <div className="step">
        <h3 className="step--title">Xác nhận thông tin</h3>
        <div className="step--required">
          <p>
            Còn 1 bước cuối nữa thôi! Vui lòng xác nhận những thông tin phía trên là hoàn toàn chính xác.
          </p>
          <p>Bước 5 (5)</p>
        </div>
        <div className="field--wrap">
          <div className="custom-field ">
            <div className="custom-field--checkbox field">
              <input type="checkbox" name="checkMarketing" />
              <span>
                Tôi muốn gửi email khi có sản phẩm hoặc khuyến mãi mới. Không spam, tôi xin hứa!
              </span>
            </div>
            <div className="custom-field--checkbox field">
              <input type="checkbox" name="checkAgree" />
              <span>
                Tôi đồng ý với chính sách và điều kiện bảo hành của công ty bạn.
              </span>
            </div>
          </div>
        </div>

        <div className="security">
          <div className="security--image">
            <img src="/assets/security.svg" alt="" />
          </div>
          <div className="security--des">
            <span>Tất cả dữ liệu của bạn sẽ được bảo mật tuyệt đối</span>
                Chúng tôi sử dụng quảng cáo để nâng cao trãi nghiệm của bạn và hoàn toàn bảo mật không chia sẽ cho bất kì bên thứ 3 nào.
            </div>
        </div>
      </div>
    </>
  );
}
