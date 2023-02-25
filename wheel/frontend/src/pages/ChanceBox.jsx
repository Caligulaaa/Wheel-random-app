import React, { useState,useEffect } from 'react';
import PostService from '../API/PostService';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


function ChanceBox() {
    const [items,setItems] = useState([])

    const getItems = async () => {
        const items = await PostService.getCombackBox()

        setItems(items)
    }

    useEffect(() => {
        getItems()
    }, [])

        return (
            <div className='App' >
                <Box
    
                    sx={{
                        width: 500,
                        p: 2,
                        display: 'grid',
                        // gridAutoRows: '40px',
                    }}
                >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell><h3>Name</h3></TableCell>
                        <TableCell align="right"><h3>Chance</h3></TableCell>

                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {items.map((item) => (
                        <TableRow
                        key={item.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {item.cases}
                        </TableCell>
                        <TableCell align="right">{item.chanse}%</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
            </div>
            // <div className='App'>

            //     {items.map((item) => 
            //         <div key={item.id}> 
            //             {item.id}. {item.cases}  -  {item.chanse}%
            //         </div>
            //     )}
            // </div>  
        );
    }
    
    
export default ChanceBox