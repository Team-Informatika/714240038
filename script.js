import {renderHTML,onClick,setInner} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

renderHTML('content', 'content/home.html');
onClick("github",myGithub);
function myGithub() {
    window.open('https://github.com/nawal886', 'blank');
}
onClick("whatsapp",mywhatsapp);
function mywhatsapp() {
    window.open('https://whatsapp.com/62895350871030', 'blank');
}
onClick("instagram",myinstagram);
function myinstagram() {
    window.open('https://instagram.com/harom_ein', 'blank');
} 
setInner("tex", "kontak saya:")