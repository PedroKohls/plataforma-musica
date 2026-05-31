document.addEventListener('DOMContentLoaded', () => {
    const userImg = document.querySelector('.userImg');
    const userMenu = document.getElementById('userMenu');

    if (!userImg || !userMenu) {
        return;
    }

    userImg.addEventListener('click', (event) => {
        userMenu.classList.toggle('active');
        event.stopPropagation();
    });

    window.addEventListener('click', (event) => {
        if (!userMenu.contains(event.target) && event.target !== userImg) {
            userMenu.classList.remove('active');
        }
    });
});