import React, { useState } from 'react'
import CardSupplier from '../Cards/CardSupplier';
import TopNavbar from '../Navbar/TopNavbar';

function DashboardSupplier(){

    const [searchTerm, setSearchTerm] = useState('')

    return(
        <div className="d-flex flex-column align-items-center vh-100">
            <TopNavbar setSearchTerm={setSearchTerm} />
            <br/><br/><br/>
            <CardSupplier searchTerm={searchTerm} />
        </div>
    )
}

export default DashboardSupplier;