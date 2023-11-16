import React, { useState } from 'react'
import CardKurir from '../Cards/CardKurir';
import BottomNavbar from '../Navbar/BottomNavbar';

function DashboardKurir() {

    const [searchTerm, setSearchTerm] = useState('')

    return(
        <div className="d-flex flex-column align-items-center vh-100">
            <CardKurir searchTerm={searchTerm}/>
            <BottomNavbar setSearchTerm={setSearchTerm}/>
        </div>
    )
}

export default DashboardKurir;