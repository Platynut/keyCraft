
import React, { useEffect, useState } from "react";

const KeycapFilter = ({ onSearch }) => {
    const [keycaps, setKeycaps] = useState([]);
    const [brands, setBrands] = useState([]);
    const [profiles, setProfiles] = useState([]);
    // States pour les filtres sélectionnés
    const [brand, setBrand] = useState("");
    const [profile, setProfile] = useState("");
    const [material, setMaterial] = useState("");
    const [color, setColor] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        fetch("http://localhost:3080/keycaps")
            .then((res) => res.json())
            .then((data) => {
                setKeycaps(data);
                // Extraction des marques uniques triées
                const uniqueBrands = Array.from(new Set(data.map(k => k.brand)))
                    .filter(Boolean)
                    .sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
                setBrands(uniqueBrands);
                // Extraction des profils uniques triés
                const uniqueProfiles = Array.from(new Set(data.map(k => k.profile)))
                    .filter(Boolean)
                    .sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
                setProfiles(uniqueProfiles);
            })
            .catch((err) => console.error("Erreur lors de la récupération des keycaps:", err));
    }, []);

    const handleSearch = () => {
        onSearch && onSearch({
            brand,
            profile,
            material,
            color,
            minPrice,
            maxPrice
        });
    };

    return (
        <div className="filtres">
            <h2>Filtres Keycaps</h2>
            <div>Marque
                <select style={{ marginLeft: '10px' }} value={brand} onChange={e => setBrand(e.target.value)}>
                    <option value="">Choisir...</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>
            <div>
                Profil
                <select style={{ marginLeft: '10px' }} value={profile} onChange={e => setProfile(e.target.value)}>
                    <option value="">Choisir...</option>
                    {profiles.map((profile) => (
                        <option key={profile} value={profile}>{profile}</option>
                    ))}
                </select>
            </div>
            <div>
                Matériau<br />
                <input type="text" placeholder="ex: PBT, ABS..." value={material} onChange={e => setMaterial(e.target.value)} />
            </div>
            <div>
                Couleur<br />
                <input type="text" placeholder="ex: Noir, Blanc..." value={color} onChange={e => setColor(e.target.value)} />
            </div>
            <div>
                Prix<br />
                <input type="number" min="0" placeholder="Min" style={{width:'60px', marginRight:'8px'}} className="no-spinner" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                <input type="number" min="0" placeholder="Max" style={{width:'60px'}} className="no-spinner" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
            </div>
            <button className="button" onClick={handleSearch}>Rechercher</button>
        </div>
    );
};

export default KeycapFilter;