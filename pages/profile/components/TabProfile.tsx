import { CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../actions/userAction'
import useForm from '../../../hooks/useForm'

export default function TabProfile() {
    let [changePassword, setChangePassword] = useState(false)
    const user = useSelector((state: any) => state.user)

    let { birthday } = user.login

    if (birthday) {
        birthday = new Date(birthday)
    }
    let { data, errors, inputChange, Submit } = useForm({
        ...user.login,
        oldPassword: '',
        password: '',
        confirmPassword: '',
        birth_day: birthday && birthday.getDate(),
        birth_month: birthday && birthday.getMonth() + 1,
        birth_year: birthday && birthday.getFullYear(),
    }, {
        validate: {
            name: {
                required: true
            },
            phone: {
                pattern: 'phone'
            },
            password: {
                required: true,
                different: 'oldPassword'
            },
            oldPassword: {
                required: true,
            },
            confirmPassword: {
                required: true,
                match: 'password',

            },


        },
        message: {
            name: {
                required: 'Họ và tên không được để trống',
            },
            phone: {
                pattern: 'Không phải là số điện thoại'
            },
            password: {
                required: 'Vui lòng điền password',
                different: 'Vui lòng điền khác mật khẩu cũ'

            },
            oldPassword: {
                required: 'Vui lòng điền passoword cũ',
            },
            confirmPassword: {
                required: 'Vui lòng xác nhận mật khẩu',
                match: 'Vui lòng điền giống password'
            }

        }
    })

    const dispatch = useDispatch()

    function updateClick(e: any) {

        e.preventDefault();

        if (user.loading) {
            alert('Không được cập nhật quá nhanh')
            return
        }
        let error: any = Submit();
        if (!changePassword) {
            delete error.password
            delete error.oldPassword
            delete error.confirmPassword
        }

        if (Object.keys(error).length === 0) {
            let { name, phone, password, oldPassword, gender, birth_day, birth_month, birth_year } = data;

            let birthday: any = null;
            if (birth_day && birth_month && birth_year) {
                console.log(birth_year, birth_month - 1, birth_day)
                birthday = (new Date(birth_year, birth_month - 1, birth_day)).getTime()
            }


            dispatch(updateProfile({ name, phone, gender, password, oldPassword, changePassword, birthday }))
        }

    }


    return (
        <div className="profile">
            <h3 className="title">Thông tin tài khoản</h3>
            <div className="wrap">
                <form>
                    <div className="form-control ">
                        <label className="input-label">Họ tên</label>
                        <input type="text" onChange={inputChange} name="name" value={data.name} className="Input-sc-1sflv1m-0 coLFjn" />
                        {errors.name && <p className="error-text">{errors.name}</p>}
                    </div>
                    <div className="form-control ">
                        <label className="input-label">Số điện thoại</label>
                        <div>
                            <div className="input-group">
                                <input style={{ width: '250px' }} onChange={inputChange} value={data.phone} type="tel" name="phone" placeholder="Hãy nhập SĐT để trải nghiệm tốt hơn" className="Input-sc-1sflv1m-0 coLFjn" />
                                {errors.phone && <p className="error-text">{errors.phone}</p>}
                            </div>

                        </div>
                    </div>
                    <div className="form-control">
                        <label className="input-label">Email</label>
                        <input type="text" disabled className="Input-sc-1sflv1m-0 coLFjn" value={data.email} />
                    </div>
                    <div className="form-control">
                        <label className="input-label">Giới tính</label>
                        <label className="input-radio">
                            <input type="radio" name="gender" value="male" checked={data.gender === 'male'} onChange={inputChange} />
                            <span className="radio-fake" />
                            <span className="label">Nam</span>
                        </label>
                        <label className="input-radio">
                            <input type="radio" name="gender" value="female" checked={data.gender === 'female'} onChange={inputChange} />
                            <span className="radio-fake" />
                            <span className="label">Nữ</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="input-label">Ngày sinh<span>(không bắt buộc)</span>
                        </label>
                        <select style={{ margin: '0px 12px 0px 0px' }} name="birth_day" onChange={inputChange}>
                            <option>Ngày</option>
                            {
                                [...Array(31)].map((e: any, i: number) => <option selected={parseInt(data.birth_day) === i + 1} value={i + 1}>{i + 1}</option>)
                            }

                        </select>
                        <select style={{ margin: '0px 12px 0px 0px' }} name="birth_month" onChange={inputChange}>
                            <option>Tháng</option>
                            {
                                [...Array(12)].map((e: any, i: number) => <option selected={parseInt(data.birth_month) === i + 1} value={i + 1}>{i + 1}</option>)
                            }
                        </select>
                        <select style={{ margin: '0px 12px 0px 0px' }} name="birth_year" onChange={inputChange}>
                            <option>Năm</option>
                            {
                                [...Array(50)].map((e: any, i: number) => <option selected={parseInt(data.birth_year) === 2020 - i} value={2020 - i}>{2020 - i}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="input-label">&nbsp;</label>
                        <label className="input-checkbox">
                            <input type="checkbox" checked={changePassword} onChange={(e) => setChangePassword(e.target.checked)} /><span className="checkbox-fake" />
                            <span className="label">Thay đổi mật khẩu</span>
                        </label>
                    </div>
                    {
                        changePassword && <>
                            <div className="form-control ">
                                <label className="input-label">Mật khẩu cũ</label>
                                <div className="input-group">
                                    <input type="password" onChange={inputChange} value={data.oldPassword} name="oldPassword" placeholder="Nhập mật khẩu cũ" className="Input-sc-1sflv1m-0 coLFjn" />
                                    {errors.oldPassword && <p className="error-text">{errors.oldPassword}</p>}
                                </div>

                            </div>
                            <div className="form-control ">
                                <label className="input-label">Mật khẩu mới</label>
                                <div className="input-group">
                                    <input type="password" onChange={inputChange} value={data.password} name="password" placeholder="Mật khẩu từ 6 đến 32 ký tự" className="Input-sc-1sflv1m-0 coLFjn" />
                                    {errors.password && <p className="error-text">{errors.password}</p>}
                                </div>

                            </div>
                            <div className="form-control ">
                                <label className="input-label">Nhập lại</label>
                                <div className="input-group">
                                    <input type="password" onChange={inputChange} value={data.confirmPassword} name="confirmPassword" placeholder="Nhập lại mật khẩu mới" className="Input-sc-1sflv1m-0 coLFjn" />
                                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                                </div>

                            </div>
                        </>
                    }
                    {
                        user.error && <p className="error-text">{user.error}</p>
                    }
                    <div className="form-control">
                        <label className="input-label">&nbsp;</label>
                        <button type="submit" className="btn yellow btn-submit" onClick={updateClick}> Cập nhật {user.loading && <CircularProgress size={20} style={{ marginLeft: 10 }} />}</button>
                    </div>
                </form>
            </div>
            <h3 className="title">Liên kết tài khoản mạng xã hội</h3>
            <div className="social-wrap">
                <div className="social-item">
                    <img src="https://salt.tikicdn.com/ts/upload/21/d4/7d/4b7de50b4141350b65b7e510074df3f6.png" className="icon" /><strong>Zalo</strong>
                    <div className="status">
                        <span /><span>Liên kết</span>
                    </div>
                </div>
                <div className="social-item">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 448 512" className="icon" color="#3d5181" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(61, 81, 129)' }}>
                        <path d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z" />
                    </svg>
                    <strong>Facebook</strong>
                    <div className="status is-danger"><svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" color="#26BC4E" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(38, 188, 78)' }}>
                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                    </svg>
                        <span>Hủy liên kết</span>
                    </div>
                </div>
                <div className="social-item">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 496 512" className="icon" color="#cf5e50" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(207, 94, 80)' }}>
                        <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm-70.7 372c-68.8 0-124-55.5-124-124s55.2-124 124-124c31.3 0 60.1 11 83 32.3l-33.6 32.6c-13.2-12.9-31.3-19.1-49.4-19.1-42.9 0-77.2 35.5-77.2 78.1s34.2 78.1 77.2 78.1c32.6 0 64.9-19.1 70.1-53.3h-70.1v-42.6h116.9c1.3 6.8 1.9 13.6 1.9 20.7 0 70.8-47.5 121.2-118.8 121.2zm230.2-106.2v35.5H372v-35.5h-35.5v-35.5H372v-35.5h35.5v35.5h35.2v35.5h-35.2z" />
                    </svg>
                    <strong>Google</strong>
                    <div className="status">
                        <span /><span>Liên kết</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
