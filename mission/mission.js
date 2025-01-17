const themeSelector = document.querySelector('select');
const logo = document.querySelector('.logo');
themeSelector.addEventListener('change', changeTheme);

function changeTheme() {
    if (themeSelector.value === 'dark') {
        document.body.classList.add('dark');
        logo.setAttribute('src', 'byui-logo_white.png');
    } else {
        document.body.classList.remove('dark');
        logo.setAttribute('src', 'byui-logo_blue.webp');

    }
}