import React, { useState,useEffect } from 'react';
import PostService from '../API/PostService';
import jwt_decode from "jwt-decode";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function ChanceBox() {
    const [items,setItems] = useState([])

    const getItems = async () => {

        if(localStorage.getItem('authToken')){
            var token = localStorage.getItem('authToken');
            var decode = jwt_decode(token);

            const getItems = await PostService.getUsersItems(decode.id_user,JSON.parse(token));
            var counts = {};
            for (var i = 0; i < getItems.users_case.length; i++) {
                counts[getItems.users_case[i]] = 1 + (counts[getItems.users_case[i]] || 0);
            }
            setItems(Object.entries(counts));
        }
    }

    const postClear = async () => {
        var token = localStorage.getItem('authToken');
        var decode = jwt_decode(token);
        await PostService.deleteUserItems(decode.id_user,JSON.parse(token));
        setItems([]);
    }

    useEffect(() => {
        getItems()
    }, [])

        return (
            <div className='App'>
                <h1 className='uppercase font-bold text-xl'>
                MY OPEN ITEMS
                </h1>
                <Box
    
                    sx={{
                        width: 500,
                        p: 2,
                        align:'center',
            
                    }}
                >
                <TableContainer  component={Paper}>
                    <Table sx={{ minWidth: 100}} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell><h3>Name</h3></TableCell>
                            <TableCell align="left"><h3>Count</h3></TableCell>

                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {items.map((item) => (
                            <TableRow
                            key={item}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {item[0]}
                            </TableCell>
                            <TableCell align="left">{item[1]}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Box>
                <br />
                <Button onClick={postClear} variant="contained">Clear</Button>

            </div>  

        );
    }
    
    
export default ChanceBox