
function markdown_to_html(markdown) {
markdown = markdown.replace(/\\\n/g, '<br>');
markdown = markdown.replace(/(######\s(.+))/g, '<h6>$2</h6>');
markdown = markdown.replace(/(#####\s(.+))/g, '<h5>$2</h5>');
markdown = markdown.replace(/(####\s(.+))/g, '<h4>$2</h4>');
markdown = markdown.replace(/(###\s(.+))/g, '<h3>$2</h3>');
markdown = markdown.replace(/(##\s(.+))/g, '<h2>$2</h2>');
markdown = markdown.replace(/(#\s(.+))/g, '<h1>$2</h1>');
markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
//markdown = markdown.replace(/_(.+?)_/g, '<em>$1</em>');
//markdown = markdown.replace(/_(.+?)_/g, '<em>$1');
markdown = markdown.replace(/^\s*-\s(.+)/gm, '<li>$1</li>');
markdown = markdown.replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>');
markdown = markdown.replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>');
markdown = markdown.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
return `<p>${markdown}</p>`;
}
//fetch('https://raw.githubusercontent.com/hartmanm/mnh_license/refs/heads/main/license.md')
fetch('license.md')
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok ' + response.statusText);
}
return response.text();
})
.then(markdownText => {
const htmlContent = markdown_to_html(markdownText);
document.getElementById('output').innerHTML = htmlContent;
})
.catch(error => {
document.getElementById('output').innerText = 'Error loading Markdown file: ' + error;
});
