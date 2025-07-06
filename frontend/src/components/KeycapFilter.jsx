import React, { useEffect, useState } from "react";

const KeyboardFilter = ({ onSearch }) => {
    const [keyboards, setKeyboards] = useState([]);
    const [brands, setBrands] = useState([]);
    const [layouts, setLayouts] = useState([]);
    // States pour les filtres sélectionnés
    const [brand, setBrand] = useState("");
    const [layout, setLayout] = useState("");
    const [type, setType] = useState([]);
    const [wireless, setWireless] = useState(false);
    const [rgb, setRgb] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minRating, setMinRating] = useState("");
    const [maxRating, setMaxRating] = useState("");

    useEffect(() => {
        fetch("http://localhost:3080/keyboard")
            .then((res) => res.json())
            .then((data) => {
                setKeyboards(data);
                // Extraction des marques uniques triées
                const uniqueBrands = Array.from(new Set(data.map(k => k.brand || k.marque)))
                    .filter(Boolean)
                    .sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
                setBrands(uniqueBrands);
                // Extraction des layouts uniques triés
                const uniqueLayouts = Array.from(new Set(data.map(k => k.layout)))
                    .filter(Boolean)
                    .sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
                setLayouts(uniqueLayouts);
            })
            .catch((err) => console.error("Erreur lors de la récupération des claviers:", err));
    }, []);

    const handleType = (e) => {
        const { value, checked } = e.target;
        setType((prev) => checked ? [...prev, value] : prev.filter(t => t !== value));
    };

    const handleSearch = () => {
        onSearch && onSearch({
            marque: brand,
            layout,
            type: type.join(','),
            wireless: wireless ? 'true' : '',
            rgb: rgb ? 'true' : '',
            minPrice,
            maxPrice,
            minRating,
            maxRating
        });
    };

    return (
        <div className="filtres">
            <h2>Filtres</h2>
            <div>Marque
                <select style={{ marginLeft: '10px' }} value={brand} onChange={e => setBrand(e.target.value)}>
                    <option value="">Choisir...</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>
            <div>
                Layout
                <select style={{ marginLeft: '10px' }} value={layout} onChange={e => setLayout(e.target.value)}>
                    <option value="">Choisir...</option>
                    {layouts.map((layout) => (
                        <option key={layout} value={layout}>{layout}</option>
                    ))}
                </select>
            </div>
            <div>
                Type<br />
                <label><input type="checkbox" name="type" value="Gaming" checked={type.includes('Gaming')} onChange={handleType} /> Gaming</label><br />
                <label><input type="checkbox" name="type" value="Custom" checked={type.includes('Custom')} onChange={handleType} /> Custom</label><br />
            </div>
            <div>Wireless
                <label><input type="checkbox" name="wireless" checked={wireless} onChange={e => setWireless(e.target.checked)} /></label><br />
            </div>
            <div>RGB
                <label><input type="checkbox" name="rgb" checked={rgb} onChange={e => setRgb(e.target.checked)} /></label><br />
            </div>
            <div>
                Price<br />
                <input type="number" min="0" placeholder="Min" style={{width:'60px', marginRight:'8px'}} className="no-spinner" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                <input type="number" min="0" placeholder="Max" style={{width:'60px'}} className="no-spinner" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
            </div>
            <div>
                Rating<br />
                <input type="number" placeholder="Min" min="0" max="5" style={{width:'60px', marginRight:'8px'}} className="no-spinner" value={minRating} onChange={e => setMinRating(e.target.value)} />
                <input type="number" placeholder="Max" min="0" max="5" style={{width:'60px'}} className="no-spinner" value={maxRating} onChange={e => setMaxRating(e.target.value)} />
            </div>
            <button className="button" onClick={handleSearch}>Rechercher</button>
        </div>
    );
};

export default KeyboardFilter;