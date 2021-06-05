import React, { useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import { auth } from '../../firebase';

const Admin = () => {

    const [formData, setFormData] = useState({
        email: "",
        role:"",
        cf_password:"",
        password: ""
    });
    const { register } = useAuth();
    const onChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = async (event) => {
        
        try {
            event.preventDefault();
            if(formData.password !== formData.cf_password){
                alert('mat khau k trung khop!');
            } else {
                await register(formData.email, formData.password,formData.role);
            }
        } catch (e) {
            alert(e);
        }
       
    }
    return (
        <div className="wrapper">
            <div className="container-fluid">
                {/* Page-Title */}
                <div className="page-title-box">
                    <div className="row align-items-center"></div>

                </div>
                <div className="row">

                   
                    <div className="col-xl-12">
                        <div className="card m-b-30">
                            <div className="card-body">
                                <ul className="nav nav-pills nav-justified" role="tablist">
                                    <li className="nav-item waves-effect waves-light">
                                        <a className="nav-link ">
                                            <h5>Thêm tài khoản</h5>
                                        </a>

                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active p-3" id="home-1" role="tabpanel">
                                        <div className="col-12">
                                            <div className="card m-b-30">
                                                <div className="card-body">
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Email</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control" onChange={onChange} type="text" name="email" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Mật khẩu</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"onChange={onChange} type="password" name="password" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Xác nhận mật khẩu</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"onChange={onChange} type="password" name="cf_password" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Vai trò</label>
                                                        <div className="col-sm-7">
                                                            <select class="form-control" name="role" onChange={onChange}>
                                                                <option>Chọn ... </option>
                                                                <option value="admin">Admin</option>
                                                                <option value="ctv">CTV</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <input onClick={handleSubmit} type="button" className="btn btn-primary" value="Đăng ký" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {/* end container-fluid */}
        </div>




    )
}
export default Admin;