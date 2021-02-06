import React from "react";

export default function Notes() {
  return (
    <>
      <div className="step">
        <h3 className="step--title">Thông tin ghi chú</h3>
        <div className="step--required">
          <p>Cần thêm thông tin cho người bán? Chúng tôi sẽ giúp bạn</p>
          <p>Bước 4 (5)</p>
        </div>
        <div className="field--wrap">
          <div className="custom-field notes">
            <label htmlFor="address">Ghi chú</label>
            <input
              className="text"
              type="text"
              name="address"
              placeholder="Cần thêm thông tin cho người bán? Ghi chú tại đây...."
            />
          </div>
        </div>
      </div>
    </>
  );
}
