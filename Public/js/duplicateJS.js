function duplicateInnerHTML() {
    // Get all elements with a class name that starts with 'duplicate-'
    const elements = document.querySelectorAll('[class^="duplicate-"]');

    elements.forEach(element => {
        // Get the class name of the element
        const className = element.className;
        
        // Extract the number of times to duplicate from the class name
        const match = className.match(/duplicate-(\d+)/);
        if (match) {
            const times = parseInt(match[1], 10);

            // Duplicate the inner HTML
            let originalContent = element.innerHTML;
            let duplicatedContent = '';

            for (let i = 0; i < times; i++) {
                duplicatedContent += originalContent;
            }

            // Set the duplicated content as the new inner HTML
            element.innerHTML = duplicatedContent;
        }
    });
}

// Call the function to perform the duplication
duplicateInnerHTML();
