export const convertDriveLink = (url, type = 'image') => {
  if (!url) return "";
  const id = url.match(/id=([^&]+)/)?.[1] || url.match(/\/d\/([^/]+)/)?.[1];
  if (!id) return url;

  if (type === 'video') {
    // Reverting to standard export=download for better compatibility with redirects
    return `https://drive.google.com/uc?id=${id}&export=download`;
  }
  
  // Using wsrv.nl as a proxy to bypass Google's direct link restrictions (CORB/CORS)
  return `https://wsrv.nl/?url=https://drive.google.com/uc?id=${id}&output=webp&q=80`;
};

export const getThumbnail = (url) => {
  if (!url) return "";
  const id = url.match(/id=([^&]+)/)?.[1] || url.match(/\/d\/([^/]+)/)?.[1];
  if (!id) return url;
  
  // Use a more robust encoding for the thumbnail proxy
  const driveThumb = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  return `https://wsrv.nl/?url=${encodeURIComponent(driveThumb)}&ext=webp`;
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
