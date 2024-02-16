window.onload = function() {
    // Fetch the Excel file from the current directory
    fetch('./dataSheet.xlsx')
        .then(response => response.arrayBuffer())
        .then(buffer => {
            // Parse the Excel data
            const workbook = XLSX.read(buffer, {type:'array'});
            const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
            const worksheet = workbook.Sheets[sheetName];
            
            // Extract data from columns A and B
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 'A2:B' });

            // Populate table with data
            const tableBody = document.getElementById('data-body');

            data.forEach(row => {
                const rowData = row.slice(0, 2); // Take only the first two columns
                const tr = document.createElement('tr');
                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching or parsing data:', error));
};
