import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onClear }) => {
  if (!searchTerm && !onSearchChange) return null;

  return (
    <div className="container mt-3">
      <div className="input-group">
        <span className="input-group-text bg-dark text-warning border-secondary"><i className="bi bi-search"></i></span>
        <input type="text" className="form-control form-control-custom" placeholder="Search by name, description or category..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />
        {searchTerm && <button className="btn btn-outline-secondary" onClick={onClear}>Clear</button>}
      </div>
    </div>
  );
};

export default SearchBar;