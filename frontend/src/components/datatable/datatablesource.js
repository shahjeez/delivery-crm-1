export const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Product Name", width: 200 },
  // { field: "description", headerName: "Description", width: 300 },
  {
    field: "retail_price",
    headerName: "Retail Price",
    type: "number",
    width: 120,
  },
  {
    field: "purchase_price",
    headerName: "Purchase Price",
    type: "number",
    width: 120,
  },
  {
    field: "selling_price",
    headerName: "Selling Price",
    type: "number",
    width: 120,
  },
  { field: "discount", headerName: "Discount", type: "number", width: 100 },
  { field: "category_id", headerName: "Category ID", width: 100 },
  { field: "sub_category_id", headerName: "Sub Category ID", width: 150 },
];
