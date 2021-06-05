import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, database } from '../../firebase';

const ListUser = () => {
  const [listUser, setListUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [keyword,setKeyword] = useState(null);
  const [deleteItem,setDeleteItem] = useState(false);
  //lay danh sach nguoi dung
  const fetchListUser = async () => {
    try {
      let array = [];
      await database
        .ref('users')
        .get()
        .then(query => {
            query.forEach(doc=>{
              const { active,payment,address,permission,email,fullName,phone,name,uuid,cancel} = doc.val();
              array.push({
                active,
                address: address ? address : '',
                permission:permission === 0 ? 'Tai xe' : (permission === 3 ? 'TK Admin' : 'Khach hang') ,
                phone: phone ? phone : '',
                fullName:name ? name : '',
                id:uuid,
                email,
                name:name ? name : '',
                cancel:cancel !== 3 ? 'Active' : 'Disabled',
                payment:payment ? payment : ''
              })
            })
        });
      setListUser(array);
      setAllUser(array);
    } catch (e) {
      alert(e);
    }
  }
  //tim kiem
  const handleSearch = (e) => {
      const keyword = e.target.value;
      
        setListUser(
          allUser.filter(l=>(
            l.fullName.toLowerCase().includes(keyword.toLowerCase())
            || l.email.toLowerCase().includes(keyword.toLowerCase())
            || l.permission.toLowerCase().includes(keyword.toLowerCase())
            || l.phone.toLowerCase().includes(keyword.toLowerCase())
            || l.cancel.toLowerCase().includes(keyword.toLowerCase())
        )))
      
  }
  //
  const handleDelete = async (id) => {
    if(window.confirm('Ban co muon xoa?')){
      await database.ref('users/'+id)
      .remove()
      .then(()=>{
        setDeleteItem(!deleteItem);
        alert('Xoa thanh cong!');})
    }
  }
  useEffect(() => {
    fetchListUser();
  }, [deleteItem])
  return (
    <div className="wrapper">
      <div className="container-fluid">
        <br/>
        <div className="row">
          <div className="col-12">
            <div className="card m-b-30">
              <div className="card-body">
                <div className="form-group row">
                <h6 className="col-sm-5">DANH SÁCH NGƯỜI DÙNG</h6>
                <div className="col-sm-7">
                <input type="text" className="form-control" name="keyword"  value={keyword} onChange={handleSearch} placeholder="Search ...."/>
                </div>
                
                </div>
                
                <table id="datatable" className="table table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                  <thead>

                    <tr>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Permision</th>
                      <th>Phone</th>
                      <th>Payment</th>
                      <th>Account Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listUser.map(user => {
                        return (
                          <tr>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.permission}</td>
                            <td>{user.phone}</td>
                            <td>{user.payment} VNĐ</td>
                            <td><span className={user.cancel === 'Active' ? "badge badge-primary" : 'badge badge-danger'}>{user.cancel}</span></td>
                            <td>
                              <div style={{display:'flex',
                              flexDirection:'row',
                              justifyContent:'space-around',
                              }}>
                                <Link to={`/profile/${user.id}`} params={user.id} className="btn btn-primary" >Edit</Link>
                                <Link onClick={()=>handleDelete(user.id)} className="btn btn-danger" >Delete</Link>
                              </div>

                            </td>
                          </tr>
                        )
                      })
                    }


                  </tbody>
                </table>
              </div>
            </div>
          </div> {/* end col */}
        </div> {/* end row */}
      </div>
      {/* end container-fluid */}
    </div>


  );
}


export default ListUser;