import React , {useState} from 'react';
import { Link , useHistory } from 'react-router-dom';
import { useAuth } from '../../provider/AuthProvider';

const Header = () => {
    const history = useHistory();
    const {logout } = useAuth();

    const handleLogout =  async () => {
        
            try {
                await logout();
                history.push('/login');
                
            } catch (e){
                alert(e);
            }
        
    }
    return (
        <div className="header-bg">
            <header id="topnav">
                <div className="topbar-main">
                    <div className="container-fluid">
                        {/* Logo*/}
                        <div>
                            <a href="/" className="logo">
                                <span className="logo-light">
                                  ADMIN
                                  </span>
                            </a>
                        </div>
                        {/* End Logo*/}
                        <div className="menu-extras topbar-custom navbar p-0">
                            
                            <ul className="navbar-right ml-auto list-inline float-right mb-0">

                                {/* notification */}

                                <li className="dropdown notification-list list-inline-item">
                                    <div className="dropdown notification-list nav-pro-img">
                                        <Link className="dropdown-toggle nav-link arrow-none nav-user" data-toggle="dropdown" to="#" role="button" aria-haspopup="false" aria-expanded="false">
                                            <img src="https://randomuser.me/api/portraits/men/90.jpg" alt="user" className="rounded-circle" />
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                                            {/* item*/}
                                            <Link className="dropdown-item" to="#"><i className="mdi mdi-account-circle" /> Thông tin</Link>
                                            <a className="dropdown-item text-danger" onClick={handleLogout}><i className="mdi mdi-power text-danger" /> Đăng xuất</a>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                        {/* end menu-extras */}
                        <div className="clearfix" />
                    </div>
                    {/* end container */}
                </div>
                {/* end topbar-main */}
                {/* MENU Start */}
                <div className="navbar-custom">
                    <div className="container-fluid">
                        <div id="navigation">
                            {/* Navigation Menu*/}
                            <ul className="navigation-menu">
                                <li className="has-submenu">
                                    <Link  to="/">DANH SÁCH NGƯỜI DÙNG</Link>
                                </li>
    
                                <li className="has-submenu">
                                    <Link to="/books">DANH SÁCH CHUYẾN ĐI</Link>
                                </li>
                                <li className="has-submenu">
                                    <Link  to="/admin">THÔNG TIN TÀI KHOẢN</Link>
                                </li>
                            </ul>
                            {/* End navigation menu */}
                        </div>
                        {/* end #navigation */}
                    </div>
                    {/* end container */}
                </div>
                {/* end navbar-custom */}
            </header>
        </div>


    );
}

export default Header;