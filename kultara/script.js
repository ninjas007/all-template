
function getMenus() {
    $.ajax({
        dataType: "json",
        url: "data/menu.json",
        success: function (menus) {
            let html = ``;
            let page = window.location.pathname;
            $.each(menus, function (index, menu) {
                let text_muted = 'text-muted';

                if (page == `/${menu.href}`) {
                    text_muted = '';
                }

                if (menu.href == 'index.html') {
                    if (page == '/resep.html' || page == '/info.html' || page == '/tersedia.html') {
                        text_muted = '';
                    }
                }

                html += `<a href="${menu.href}">
                <button class="btn-menubar">
                    <i class="${menu.icon} ${text_muted}" style="width: 24px; height: 24px; font-size: 20px"></i>
                    <span class="${text_muted}" style="font-size: 10px">${menu.title}</span>
                </button>
                </a>`
            });

            $('.menubar-footer').html(`${html}`);
        }
    });
}
getMenus();

function getTabs() {
    $.ajax({
        dataType: "json",
        url: "data/tabs.json",
        success: function (tabs) {
            let html = ``;
            let page = window.location.pathname;

            $.each(tabs, function (index, tab) {
                let active = '';
                if (page == `/${tab.href}`) {
                    active = 'active';
                }

                html += `<li class="nav-item" role="presentation">
                            <a class="nav-link text-muted ${active}" id="ex3-tab-${tab.id}"
                                href="${tab.href}" role="tab" aria-controls="ex3-tabs-${tab.id}"
                                aria-selected="true">${tab.title}</a>
                        </li>`
            });

            $('#ex1').html(`${html}`);
        }
    });
}
getTabs();


// animasi fade in
document.addEventListener('DOMContentLoaded', function () {
    // Trigger the animation on page load
    animateFadeIn();
});

function animateFadeIn() {
    // Get all elements with the 'fade' class
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Apply 'show' class to trigger fade-in animation
    fadeElements.forEach(element => {
        element.classList.add('show');
    });
}


// const ajax = function (data) {
//     const { dataType, url} = data;

//     return new Promise((resolve, reject) => {
//         $.ajax({
//             dataType,
//             url,
//             success: function (data) {
//                 return resolve(data);
//             },
//             error: function(err) {
//                 return reject(err);
//             }
//         });
//     })
// }

// // menu
// ajax({ dataType: 'json', url: 'data/menu.json'})
// .then((menus) => {
//     let html = ``;
//     let page = window.location.pathname;

//     $.each(menus, function (index, menu) {
//         html += `<a href="${menu.href}">
//         <button class="btn-menubar">
//             <i class="${menu.icon} ${page == `/${menu.href}` ? 'text-info' : ''}" style="width: 24px; height: 24px; font-size: 20px"></i>
//             <span class="${page == `/${menu.href}` ? 'text-info' : ''}" style="font-size: 10px">${menu.title}</span>
//         </button>
//         </a>`
//     });

//     $('.menubar-footer').html(`${html}`);
// })
// .catch((err) => [
//     console.log(err)
// ])

