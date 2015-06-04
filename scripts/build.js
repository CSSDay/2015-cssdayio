var primaryNav = document.querySelectorAll('.primary-nav a');
for (i in primaryNav) {
    primaryNav[i].onclick = function() {
        document.getElementById('primary-nav-toggle').checked = false;
    }
}