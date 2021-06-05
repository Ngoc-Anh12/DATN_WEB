import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import {firestore} from '../firebase';
const Login = () => {
    const history = useHistory();
    const [loading,setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const {login } = useAuth();
    const onChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await firestore.collection('admin')
            .where('email','==',formData.email)
            .get()
            .then(async (query)=>{
                if(query.size !== 0){
                    await login(formData.email,formData.password);
                    history.push('/');
                } else {
                    alert('Dang nhap that bai');
                }
            });
            
        
            
            
        } catch (e){
            alert(e);
        }
        setLoading(false);
    }
    
    // if(user){
        return (
            <div>
                {/* Begin page */}
                <div className="accountbg" />
                <div className="wrapper-page">
                    <div className="card card-pages shadow-none">
                        <div className="card-body">

                            <h5 className="font-18 text-center">TRANG QUẢN TRỊ</h5>
                            <form className="form-horizontal m-t-30" >
                                <div className="form-group">
                                    <div className="col-12">
                                        <label>Email</label>
                                        <input onChange={onChange} className="form-control" name="email" type="text" required placeholder="Username" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-12">
                                        <label>Password</label>
                                        <input onChange={onChange} className="form-control" name="password" type="password" required placeholder="Password" />
                                    </div>
                                </div>
                                <div className="form-group text-center m-t-20">
                                    <div className="col-12">
                                        <input disabled={loading} onClick={handleSubmit} type="submit" value="Login" className="btn btn-primary" />                                    </div>
                                </div>
                               
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        );
    // } else {
    //     <Redirect to="/"/>
    // }

}


export default Login;