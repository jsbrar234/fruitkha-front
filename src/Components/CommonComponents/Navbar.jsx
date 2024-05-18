import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Navbar = (props) => {
    const { data } = props;
    const accessToken = data;
    const logout = () => {
        localStorage.removeItem('fruitKhaToken');
        toast.success("Logged Out Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const [user, setUser] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const getData = () => {
        if (accessToken) {
            axios.get("https://fruitkha-production.up.railway.app/users/getUserDetails", {
                headers: {
                    'Authorization': accessToken,
                },
            }).then((response) => {
                setUser(response.data.data);
            });
        }
    };

    useEffect(() => {
        getData();
        // Check if the screen size is less than 768px (typically mobile devices)
        const checkIsMobile = () => {
            if (window.innerWidth < 992) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, [accessToken]);

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
        console.log("Menu Toggled:", menuOpen); // Debug statement
    };

    return (
        <>
            <div className="top-header-area" id="sticker">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 text-center">
                            <div className="main-menu-wrap">

                                <div className="site-logo">
                                    <Link to='/'>
                                        <img src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="Logo" />

                                    </Link>
                                </div>

                                {isMobile ? (
                                    <div className="mobile-menu">
                                        <button onClick={toggleMenu} className="mobile-menu-toggle">
                                            ☰
                                        </button>
                                        {menuOpen && (
                                            <AccordionMenu accessToken={accessToken} user={user} logout={logout} />
                                        )}
                                    </div>
                                ) : (
                                    <nav className="main-menu">
                                        <ul>
                                            <li className="current-list-item"><Link to="/">Home</Link></li>
                                            <li><Link to="/about">About</Link></li>
                                            <li><Link to="/contact">Contact</Link></li>
                                            <li><Link to="/shop">Shop</Link></li>
                                            <li>
                                                <div className="header-icons">
                                                    {
                                                        accessToken ? (
                                                            <>
                                                                <Link to='/profile' className='right_Side_Btns'>Profile</Link>
                                                                <Link to='/order-details' className='right_Side_Btns'>Orders</Link>
                                                                <Link to='/' className='right_Side_Btns' onClick={logout}>Logout</Link>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Link to='/login' className='right_Side_Btns'>Login</Link>
                                                                <Link to='/sign-up' className='right_Side_Btns'>Sign Up</Link>
                                                            </>
                                                        )
                                                    }
                                                    <Link to='/cart'><i className="fas fa-shopping-cart"></i></Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </nav>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const AccordionMenu = ({ accessToken, user, logout }) => (
    <nav className="main-menu mobile-accordion">
        <ul>
            <li className="current-list-item"><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li>
                <div className="header-icons">
                    {
                        accessToken ? (
                            <>
                                <Link to='/profile' className='right_Side_Btns'>Profile</Link>
                                <Link to='/order-details' className='right_Side_Btns'>Orders</Link>
                                <Link to='/' className='right_Side_Btns' onClick={logout}>Logout</Link>
                            </>
                        ) : (
                            <>
                                <Link to='/login' className='right_Side_Btns'>Login</Link>
                                <Link to='/sign-up' className='right_Side_Btns'>Sign Up</Link>
                            </>
                        )
                    }
                    <Link to='/cart'><i className="fas fa-shopping-cart"></i></Link>
                </div>
            </li>
        </ul>
    </nav>
);

export default Navbar;
