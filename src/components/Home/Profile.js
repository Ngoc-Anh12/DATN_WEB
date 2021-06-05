import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import { database } from '../../firebase';

const Profile = () => {
    const { id } = useParams();
    const [refresh,setRefresh] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [permission, setPermission] = useState('');
    const [carName, setCarName] = useState('');
    const [drivingLincese, setDrivingLincese] = useState('');
    const [cancel,setCancel] = useState('');
    const [payment,setPayment] = useState('');
    const [cancelBooking,setCancelBooking] = useState('');
    const fetchUserInformation = async () => {
        await database
            .ref('users/' + id)
            .get()
            .then(query => {
                const { payment,cancel,address, name, email, permission, carName, drivingLincese  } = query.val();
                setPayment(payment ? payment : 0);
                setCancel(cancel !==3 ? 'Active' : 'Disabled');
                setName(name);
                setAddress(address)
                setEmail(email);
                setPermission(permission);
                setCarName(carName);
                setDrivingLincese(drivingLincese);
                setCancelBooking(cancel);
            });
    }
    const setActiveAccount = async () => {
        await database
            .ref('users/'+id)
            .update({
                cancel:0
            })
            .then(async ()=>{

                setRefresh(!refresh);
                alert('Mo khoa tai khoan thanh cong!');
            });
    }
    useEffect(() => {
        fetchUserInformation();
    }, [refresh]);
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
                                            <h4>Thông tin cơ bản</h4>
                                        </a>
                                        
                                    </li>
                                    {cancel === 'Disabled' ? ( <input type="button" onClick={()=>setActiveAccount()} className="btn btn-primary"  value="Mở khóa tài khoản"/>) : null }
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active p-3" id="home-1" role="tabpanel">
                                        <div className="col-12">
                                            <div className="card m-b-30">
                                                <div className="card-body">
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Trạng thái tài khoản</label>
                                                        <div className="col-sm-9">
                                                            <h5><span className={cancel === 'Active' ? "badge badge-primary" : 'badge badge-danger'}>{cancel}</span></h5>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Tên</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={name}  />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Email</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={email} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Địa chỉ</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={address}  />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Permission</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={permission === 0 ? 'Tai xe' : 'Khach hang'}  />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Tên xe</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={permission === 0 ? carName : 'Khach hang'}  />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Giấy phép lái xe</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={permission === 0 ? drivingLincese : 'Khach hang'}  />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Số lần hủy chuyến</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={cancelBooking}  />
                                                        </div>
                                                       
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Số dư</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={payment} id="example-text-input" />
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
                    
    
                </div>

            </div>
            {/* end container-fluid */}
        </div>




    )
}
export default Profile;