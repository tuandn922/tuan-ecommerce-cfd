import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { openCart } from "../actions/cartAction";

export default function Header() {
  const categories = useSelector((state: any) => state.categories).list
  const cart = useSelector((state: any) => state.cart)
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  let menus = [
    {
      title: 'Khuyến mãi',
      slug: '/the-loai?sort=discount_rate.-1'
    },
    {
      title: 'Được mua nhiều',
      slug: '/the-loai?sort=sort_item.qty.-1'
    },
    {
      title: 'Mới nhất',
      slug: 'moi-nhat'
    },
    {
      title: 'Hấp dẫn',
      slug: 'hap-dan'
    },
    {
      title: 'Voucher',
      slug: '/the-loai/voucher-dich-vu-the-cao-id11312'
    },
    {
      title: 'Chính sách',
      slug: 'chinh-sach'
    }
  ]

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header--top">
            <ul className="contact">
              <li>Liên hệ</li>
              <li>+420 336 775 664</li>
              <li>info@freshnesecom.com</li>
            </ul>
            <ul className="about">
              <li>Blog</li>
              <li>Về chúng tôi</li>
              <li>Tuyển dụng</li>
            </ul>
          </div>
          <div className="header--mid">
            <Link className="logo" to="/">
              <img src="/assets/logo.svg" alt="logo" />
            </Link>
            <div className="search">
              <div className="search-category">
                <div className="head">
                  <span className="title">Tất cả</span>
                  <span className="arrow">
                    <img src="/assets/icon-down.svg" alt="" />
                  </span>
                </div>
              </div>
              <input
                className="search-input"
                type="text"
                placeholder="Tìm kiếm sản phẩm, thể loại"
              />
              <div className="search-icon">
                <img src="/assets/icon-search.svg" alt="search" />
              </div>
            </div>
            <div className="info">
              <Link className="user" to={user.login ? '/thong-tin-ca-nhan' : '/dang-nhap'}>
                <img src="/assets/icon-user.svg" alt="user" />
              </Link>
              <div className="cart" onClick={dispatch.bind(null, openCart())} >
                <img src="/assets/icon-cart.svg" alt="cart" />
                {
                  cart.total > 0 && <span className="number">{cart.total}</span>
                }

              </div>
            </div>
          </div>
          <div className="header--bottom">
            <ul className="wrap">
              {
                menus.map((e: any, i) => (
                  <li key={i}>
                    <NavLink to={e.slug} className="title">{e.title}</NavLink>
                    {/* <span>
                      <img src="/assets/icon-down.svg" alt="" />
                    </span> */}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
