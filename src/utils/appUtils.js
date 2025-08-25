export function generateColumnDefs(data = []) {
  if (!Array.isArray(data) || data.length === 0) return [];

  const sample = data[0];

  return Object.keys(sample).map((key) => {
    let column = {
      headerName: key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      field: key,
      editable: false,
    };


    return column;
  });
}
export function generateColumnDefsFusionPosition(data = []) {
  if (!Array.isArray(data.data) || data.data.length === 0) return [];

  const sample = data.data[0];

  return Object.keys(sample).map((key, i) => {
    let column = {
      headerName: data.cols[i],
      field: key,
      editable: false,
    };

 
    return column;
  });
}
