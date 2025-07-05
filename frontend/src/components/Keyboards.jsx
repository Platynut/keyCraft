import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Product from "./Product";
import Footer from "./Footer";
import Filtres from "./Filtres";
import { Link } from "react-router-dom";
import './css/Keyboards.css';

function buildQueryString(filters) {
    const params = Object.entries(filters)
        .filter(([_, v]) => v !== undefined && v !== null && v !== "")
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');
    return params ? `?${params}` : '';
}

function Keyboards() {
    const [keyboards, setKeyboards] = useState([]);
    const [filters, setFilters] = useState({});

    const fetchFilteredKeyboards = useCallback(async (filters) => {
        const query = buildQueryString(filters);
        try {
            const response = await fetch(`http://localhost:3080/keyboard${query}`);
            if (!response.ok) {
                throw new Error('Error while fetching keyboards');
            }
            const data = await response.json();
            setKeyboards(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            setKeyboards([]);
        }
    }, []);

    useEffect(() => {
        fetchFilteredKeyboards(filters);
    }, [filters, fetchFilteredKeyboards]);

    const handleSearch = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div>
            <Header />
            <div className="boite">
                <div className="filtre_elements">
                    <Filtres onSearch={handleSearch} />
                    <div>
                        <div className="grid">
                            {keyboards.map((keyboard) => (
                                <div key={keyboard.id} className="card" id={keyboard.id}>
                                    <Link to={`/keyboard/${keyboard.id}`}>
                                        <Product img={keyboard.url} title={keyboard.name} prix={keyboard.price} rating={keyboard.rating} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Keyboards;