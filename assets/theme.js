document.addEventListener('DOMContentLoaded', function () {
    // mobile menu handler
    document.querySelector('header .burger').addEventListener('click', function () {
        this.classList.toggle("active");
        document.querySelector('header .nav-mobile').classList.toggle("active");
    });

    // anchor scroll
    document.querySelector('header nav a').addEventListener('click', function () {
        let href = this.href;
        let element = document.getElementById(href);
        let topPos = element.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
            top: topPos,
            behavior: 'smooth'
        })
    });
});