import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import { userLogin } from '../../actions/userAction'
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";

const constStyle: { [key in string]: React.CSSProperties } = {

  inputError: {
    color: 'red',
    textAlign: 'left',
    marginTop: -15
  },
  formError: {
    color: 'red'
  }

}


const Login = () => {
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState()

  let { data, Submit, errors, inputChange } = useForm({ username: '', password: '' }, {
    validate: {
      username: {
        required: true
      },
      password: {
        required: true
      }
    },
    message: {
      username: {
        required: 'Vui lòng điền tên đăng nhập'
      },
      password: {
        requried: 'Vui lòng điền password'
      }
    }
  })

  const dispatch = useDispatch()
  let user = useSelector((store: any) => store.user)

  function _login() {
    let error = Submit();
    if (Object.keys(error).length === 0) {
      dispatch(userLogin(data))
    }
  }

  if (user.login) return <Redirect to="/" />

  return (
    <div className="login">
      <div className="container">
        <div className="img">
          <img src="/assets/bg.svg" />
        </div>
        <div className="login-content">
          <form action="index.html">
            <img src="/assets/avatar.svg" />
            <h2 className="title">Chào mừng bạn quay lại</h2>
            {
              user.error && <p className="error-text" style={constStyle.formError}>{user.error}</p>
            }
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user" />
              </div>
              <div className="div">
                <input type="text" className="input" placeholder="Địa chỉ Email" onChange={inputChange} name="username" />

              </div>

            </div>
            {
              errors?.username && <p className="error-text" style={constStyle.inputError}>{errors.username}</p>
            }
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock" />
              </div>
              <div className="div">
                <input type="password" className="input" placeholder="Mật khẩu" onChange={inputChange} name="password" />

              </div>

            </div>
            {
              errors?.password && <p className="error-text" style={constStyle.inputError}>{errors.password}</p>
            }
            <div style={{ display: 'flex' }}>
              <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
              <Link to="/dang-ky" style={{ marginLeft: 'auto' }}>Bạn chưa có tài khoản? <span style={{ color: '#189eff' }}>Đăng ký</span></Link>
            </div>
            <div className="btn" onClick={_login}>Đăng nhập</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
