import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../utils/context'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const {isAuth,setIsAuth} = useContext(AuthContext);
  const {username,setUsername} = useContext(AuthContext);  

  const navigate = useNavigate()

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('authToken');
    setUsername('');
    navigate('/');
  }
  return (
  <div className='navbar'>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">

      <Toolbar>
      <Typography variant="h6" noWrap component="a" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
            <div className=' text-black '>{username}</div>
      </Typography>
      
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
        <Box
          sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'left',
          typography: 'body1',
          '& > :not(style) + :not(style)': {
            ml: 2,
            },
          }}
          >
          <Link to='/' style={{textDecoration:'none',color:'white'}}>Wheel</Link>

          <Link to='/combackbox' style={{textDecoration:'none',color:'white'}}>ChanceBox</Link>

          {isAuth ? <Link to='/myitems' style={{textDecoration:'none',color:'white'}}>MyItems</Link> : null}
          
          

          </Box>
        </Typography>
        <Box
          sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'right',
          typography: 'body1',
          '& > :not(style) + :not(style)': {
            ml: 2,
            },
          }}
          >
        {isAuth ? (
          <button onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        ):(
          <div className="p-2 flex items-center">
              <div className ='py-3 overflow-auto whitespace-nowrap flex items-center'>
                <Link to='/login'  style={{textDecoration:'none',color:'white'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>

                </Link>
              </div>

              <div className="p-2 flex items-center">
                <Link to='/register' style={{textDecoration:'none',color:'white'}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                </Link>
              </div>
            </div>
            
            
        )}
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
  </div>
  )
}

export default Navbar