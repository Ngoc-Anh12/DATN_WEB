import React, { useEffect, useState } from 'react';
import {
    Link,
    useParams,
    useHistory 
} from "react-router-dom";
import { database } from '../../firebase';

const Info = () => {
    const history = useHistory();
    const { id } = useParams();
    const [amountPerson, setAmountPerson] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [endAddress, setEndAdress] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [idCustomer, setIdCustomer] = useState('');
    const [idDriver,setIdDriver] = useState('');
    const [name,setName] = useState('');
    const [nameDriver,setNameDriver]= useState('');
    const [payment,setPayment] = useState('');
    const [timeStart,setTimeStart] = useState('');
    const [timeEnd,setTimeEnd] = useState('');
    const [startAddress,setStartAddress] = useState('');
    const [typeBooking,setTypeBooking] = useState('');
    const [statusBooking,setStatusBooking]  = useState('');
    const [typeCar,setTypeCar] = useState('');
    const fetchBookingInformation = async () => {
        await database
            .ref('booking/' + id)
            .get()
            .then(query => {
                const {
                    typeCar,statusBooking,timeStart,timeEnd,idCustomer,idDriver,amountPerson,date,email,endAddress,estimatedTime,name,nameDriver,payment,phone,phoneDriver,startAddress,typeBooking
                } = query.val();
                setTypeCar(typeCar)
                setIdCustomer(idCustomer);
                setIdDriver(idDriver);
                setAmountPerson(amountPerson);
                setDate(date);
                setEmail(email);
                setEndAdress(endAddress);
                setEstimatedTime(estimatedTime);
                setName(name);
                setNameDriver(nameDriver);
                setPayment(payment);
                setTimeStart(timeStart);
                setTimeEnd(timeEnd);
                setStartAddress(startAddress);
                setTypeBooking(typeBooking == 0 ? 'Di bao xe' : 'Di ghep');
                setStatusBooking(statusBooking == 0 ? 'Da tim duoc tai xe' 
                : ( statusBooking == 1 ? 'Tren duong den' : (
                    statusBooking == 2 ? 'Hoan thanh' : (
                        statusBooking == 3 ? 'Tai xe huy chuyen' : (
                            statusBooking == 4 ? 'Dang tim tai xe' : (
                                statusBooking === 5 ? 'Hanh khach huy chuyen' : 'Admin xoa'
                            )
                        )
                    )
                )));
            });
    };
    const routeChange = (id) =>{ 
        let path = `/profile/${id}`; 
        history.push(path);
      }
    useEffect(() => {
        fetchBookingInformation();
    }, []);
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
                                            <h4>Thông tin chuyến đi</h4>
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active p-3" id="home-1" role="tabpanel">
                                        <div class="col-12">
                                            <div class="card m-b-30">
                                                <div class="card-body">
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Trạng thái chuyến đi</label>
                                                        <div className="col-sm-9">
                                                            <h5><span className="badge badge-primary">{statusBooking}</span></h5>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Trạng thái đặt chuyến</label>
                                                        <div className="col-sm-9">
                                                            <h5><span className="badge badge-warning">{typeBooking}</span></h5>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Tên hành khách</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={name} id="example-text-input"/>
                                                            
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <input type="button" className="btn btn-danger" disabled={idCustomer? false : true} onClick={()=>routeChange(idCustomer)}value="Xem info"/>
                                                        </div>
                                                    </div>
                        
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Tên tài xế</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text"   value={nameDriver} id="example-text-input"/>
                                                            
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <input type="button" className="btn btn-danger" disabled={idDriver? false : true} onClick={()=>routeChange(idDriver)}value="Xem info"/>
                                                        </div>
                                                    </div>
                                                   
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Ngày</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={date} id="example-text-input" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Gía cước</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={payment} id="example-text-input" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Địa chỉ bắt đầu</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={startAddress} id="example-text-input" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Địa chỉ kết thúc</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={endAddress} id="example-text-input" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Số lượng người</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={amountPerson} id="example-text-input" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Loại xe</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={`${typeCar} chỗ`} id="example-text-input" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Thời gian ước lượng</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={estimatedTime} id="example-text-input" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Thời gian bắt đầu</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={timeStart} id="example-text-input" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="example-text-input" className="col-sm-3 col-form-label">Thời gian kết thúc</label>
                                                        <div className="col-sm-7">
                                                            <input className="form-control"  type="text" value={timeEnd} id="example-text-input" />
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
export default Info;