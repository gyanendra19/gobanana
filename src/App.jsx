import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";


function App() {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => { if (json) setData(json) })
  }, [])

  const filterData = () => {
    // Spreading the company and address data that are within objects
    const spreadData = data.map(user => {
      const { address, company, ...rest } = user
      return { ...rest, ...address, ...company }
    })

    if (filter === '') return spreadData
    const filteredData = spreadData.filter(user => Object.values(user).map(val => {
      console.log(val);
      if (typeof(val) === 'string') return val.toLowerCase()
      else return val
    }).includes(filter))
    return filteredData
  }


  return (
    <>
      <Box sx={{ width: '20%', margin: 'auto', paddingY: '20px' }} component="form">
        <TextField sx={{ width: '300px' }} placeholder="Search for any Field" onChange={(e) => setFilter(e.target.value.toLowerCase())} value={filter} id="outlined-basic" label="Search" variant="outlined" />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: '700', fontSize: '16px'}}>Name</TableCell>
              <TableCell sx={{fontWeight: '700', fontSize: '16px'}} align="right">Username</TableCell>
              <TableCell sx={{fontWeight: '700', fontSize: '16px'}} align="right">Email</TableCell>
              <TableCell sx={{fontWeight: '700', fontSize: '16px'}} align="right">Phone</TableCell>
              <TableCell sx={{fontWeight: '700', fontSize: '16px'}} align="right">Company</TableCell>
              <TableCell sx={{fontWeight: '700', fontSize: '16px'}} align="right">City</TableCell>
              <TableCell sx={{fontWeight: '700', fontSize: '16px'}} align="right">Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData()?.map((user) => (
              <TableRow
                className="table-style"
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell className="row-style" align="right">{user.username}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.phone}</TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">{user.city}</TableCell>
                <TableCell align="right">{user.website}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography sx={{width: '100%', textAlign: 'center', paddingY: '30px', fontSize: '25px'}}>
        {filterData().length === 0 && <p>No match</p>}
      </Typography>
    </>
  );
}

export default App;
