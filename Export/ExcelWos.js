import * as XLSX from 'xlsx';

const ExcelWos = ({ data, filename }) => {
  const handleExport = () => {
    // Define the columns based on the Web of Science data structure
    const columns = [
      "title",
      "publicationYear",
      "publicationMonth",
      "authors",
      "sourceTitle",
      "volume",
      "pages",
      "doi",
      "recordLink",
      "referencesLink",
      "relatedRecordsLink"
    ];

    // Normalize data to match the columns
    const normalizedData = data.map(item => {
      const normalizedItem = {};

      // Normalize each attribute
      normalizedItem.title = item.title || "Unknown Title";
      normalizedItem.publicationYear = item.publicationYear || "Unknown Year";
      normalizedItem.publicationMonth = item.publicationMonth || "Unknown Month";
      
      // Handle authors, assuming they are a string
      normalizedItem.authors = item.authors ? item.authors.join(', ') : "Unknown Authors";
      
      normalizedItem.sourceTitle = item.sourceTitle || "Unknown Source";
      normalizedItem.volume = item.volume || "N/A";
      normalizedItem.pages = item.pages || "N/A";
      
      // Handle DOI
      normalizedItem.doi = item.doi || "No DOI available";
      
      // Handle links
      normalizedItem.recordLink = item.recordLink || "No Link available";
      normalizedItem.referencesLink = item.referencesLink || "No References Link available";
      normalizedItem.relatedRecordsLink = item.relatedRecordsLink || "No Related Records Link available";

      return normalizedItem;
    });

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(normalizedData, { header: columns });

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate a binary string and export the file
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport}>Export to Excel</button>
  );
};

export default ExcelWos;
