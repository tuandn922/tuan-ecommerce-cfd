import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import { register, userLogin } from '../../actions/userAction'
import { Link, Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

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


const Register = () => {

    let { data, Submit, errors, inputChange } = useForm({ email: '', password: '', name: '' }, {
        validate: {
            email: {
                required: true,
                pattern: 'email'
            },
            password: {
                required: true
            },
            name: {
                required: true
            }
        },
        message: {
            email: {
                required: 'Vui lòng điền tên đăng nhập',
                pattern: 'Vui lòng nhập đúng định dạng email'
            },
            password: {
                requried: 'Vui lòng điền password'
            },
            name: {
                required: 'Vui lòng điền họ và tên'
            }
        }
    })

    const dispatch = useDispatch()
    let user = useSelector((store: any) => store.user)

    function _register() {
        if (!user.loading && Submit()) {
            dispatch(register(data))
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
                        <h2 className="title">Đăng ký</h2>
                        {
                            user.error && <p className="error-text" style={constStyle.formError}>{user.error}</p>
                        }
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-user" />
                            </div>
                            <div className="div">
                                <input type="text" className="input" placeholder="Địa chỉ Email" onChange={inputChange} name="email" />

                            </div>

                        </div>
                        {
                            errors?.email && <p className="error-text" style={constStyle.inputError}>{errors.email}</p>
                        }
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-user" />
                            </div>
                            <div className="div">
                                <input type="text" className="input" placeholder="Họ và tên" onChange={inputChange} name="name" />

                            </div>

                        </div>
                        {
                            errors?.name && <p className="error-text" style={constStyle.inputError}>{errors.name}</p>
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
                            <Link to="/dang-nhap" style={{ marginLeft: 'auto' }}>Đã có tài khoản? <span style={{ color: '#189eff' }}>Đăng nhập</span></Link>
                        </div>
                        <div className="btn" onClick={_register}>{user.loading ? <CircularProgress size={30} /> : 'Đăng ký'}</div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
