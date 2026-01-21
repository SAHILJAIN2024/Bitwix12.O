
export const convertDriveLink = (url) => {
  if (!url) return "";
  const id = url.match(/id=([^&]+)/)?.[1] || url.match(/\/d\/([^/]+)/)?.[1];
  // Using wsrv.nl (WordPress Image Service) as a proxy to bypass Google's direct link restrictions
  return id ? `https://wsrv.nl/?url=https://drive.google.com/uc?id=${id}&output=webp&q=80` : url;
};

export const parseCSV = (text) => {
  const rows = [];
  let currentRow = [];
  let currentToken = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentToken += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentToken += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentToken.trim());
        currentToken = "";
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        currentRow.push(currentToken.trim());
        rows.push(currentRow);
        currentRow = [];
        currentToken = "";
        if (char === '\r') i++;
      } else {
        currentToken += char;
      }
    }
  }
  if (currentToken || currentRow.length > 0) {
    currentRow.push(currentToken.trim());
    rows.push(currentRow);
  }
  return rows;
};
