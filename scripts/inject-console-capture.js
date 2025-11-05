const fs = require('fs');
const path = require('path');

function injectScriptTag(htmlContent, scriptTag) {
  if (htmlContent.includes('dashboard-console-capture.js')) {
    return htmlContent;
  }
  
  const headEndIndex = htmlContent.indexOf('</head>');
  if (headEndIndex !== -1) {
    return htmlContent.slice(0, headEndIndex) + scriptTag + '\n' + htmlContent.slice(headEndIndex);
  }
  
  const bodyStartIndex = htmlContent.indexOf('<body');
  if (bodyStartIndex !== -1) {
    const bodyTagEnd = htmlContent.indexOf('>', bodyStartIndex) + 1;
    return htmlContent.slice(0, bodyTagEnd) + '\n' + scriptTag + htmlContent.slice(bodyTagEnd);
  }
  
  return htmlContent;
}

function processHtmlFiles(directory) {
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.html')) {
        try {
          let content = fs.readFileSync(filePath, 'utf8');
          const modifiedContent = injectScriptTag(content, scriptTag);
          
          if (content !== modifiedContent) {
            fs.writeFileSync(filePath, modifiedContent, 'utf8');
            console.log(`Injected script into ${filePath}`);
          }
        } catch (error) {
          console.error(`Error processing ${filePath}:`, error);
        }
      }
    }
  }
  
  if (fs.existsSync(directory)) {
    walkDir(directory);
  } else {
    console.log(`Directory ${directory} not found, skipping...`);
  }
}

processHtmlFiles('.next');
processHtmlFiles('out');

console.log('Console capture script injection complete');