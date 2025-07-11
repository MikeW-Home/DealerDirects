import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

const FilterBar = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
  onDiscountChange,
  onTypeChange,
  onSkuSearchChange,
  onlyDiscount,
  productType,
  skuSearch,
}) => {
  const handleClearFilters = () => {
    onCategoryChange("");
    onDiscountChange(false);
    onTypeChange("");
    onSkuSearchChange("");
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <TextField
        label="Search by SKU"
        variant="outlined"
        value={skuSearch}
        onChange={(e) => onSkuSearchChange(e.target.value)}
        sx={{ minWidth: 200 }}
        // size="small"
      />
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={selectedCategory}
          label="Category"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={onlyDiscount}
            onChange={(e) => onDiscountChange(e.target.checked)}
          />
        }
        label="On Discount"
      />
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel id="type-label">Product Type</InputLabel>
        <Select
          labelId="type-label"
          value={productType}
          label="Product Type"
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="individual">Individual Product</MenuItem>
          <MenuItem value="mixed">Mixed Skid</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClearFilters}
        sx={{ minWidth: 120 }}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterBar;
