import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Filtres from "./KeycapFilter";
import Product from "./Product";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import './css/Keyboards.css';

function buildQueryString(filters) {
    const params = Object.entries(filters)
        .filter(([_, value]) => value !== undefined && value !== null && value !== "")
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    return params ? `?${params}` : '';
}

function Keyboards() {
    const [keyboards, setKeyboards] = useState([]);
    const [filters, setFilters] = useState({});

    const fetchFilteredKeyboards = useCallback(async (filters) => {
        const query = buildQueryString(filters);
        try {
            const response = await fetch(`http://localhost:3080/keycaps${query}`);
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
                            {keyboards.map((keycap) => (
                                <div key={keycap.id} className="card" id={keycap.id}>
                                    <Link to={`/keycaps/${keycap.id}`}>
                                        <Product img={keycap.url} title={keycap.name} prix={keycap.price} rating={keycap.rating} />
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