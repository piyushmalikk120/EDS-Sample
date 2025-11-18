export default function decorate(block) {
  // Process each row in the block
  [...block.children].forEach((row) => {
    // Process each cell in the row
    [...row.children].forEach((cell) => {
      // Read the text content
      const textContent = cell.textContent.trim();
      
      // Add classes based on text content
      if (textContent) {
        // Add a base class for all text elements
        cell.classList.add('piyush-text');
        
        // Add specific classes based on text characteristics
        if (textContent.length > 100) {
          cell.classList.add('piyush-long-text');
        } else if (textContent.length > 50) {
          cell.classList.add('piyush-medium-text');
        } else {
          cell.classList.add('piyush-short-text');
        }
        
        // Add class if text contains numbers
        if (/\d/.test(textContent)) {
          cell.classList.add('piyush-has-numbers');
        }
        
        // Add class if text is all uppercase
        if (textContent === textContent.toUpperCase() && textContent.length > 1) {
          cell.classList.add('piyush-uppercase');
        }
        
        // Add class if text contains special characters
        if (/[!@#$%^&*(),.?":{}|<>]/.test(textContent)) {
          cell.classList.add('piyush-has-special');
        }
        
        // Add class based on word count
        const wordCount = textContent.split(/\s+/).length;
        if (wordCount === 1) {
          cell.classList.add('piyush-single-word');
        } else if (wordCount <= 5) {
          cell.classList.add('piyush-few-words');
        } else {
          cell.classList.add('piyush-many-words');
        }
      }
    });
  });
  
  // Add a wrapper class to the entire block
  block.classList.add('piyush-processed');
}
