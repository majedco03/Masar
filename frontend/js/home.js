// scripts for home page, this page is dynamic, the html file has low content.

// on load, check is the user is logged in, if not redirect to login page

async function buildHomePage(userId) {
    // the page will be built using php in the backend,
    // but why?, because this page will have some admin execlusive features, like adding new paths
    // or gathering data about users and what is the most papular paths
    // therefore, we will built the page in php to verify that the user is really an admin
    // sending the rule to the frontend to manuplate with js is possible, but (at least for me)
    // not secure, because a user can manuplate his rule and pretend being and admin, thefefore 
    // i will build it in php.

    var response = await fetch("/backend/build_home_page.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: {
            user_id: userId
        },
    });

    if (!response.ok) {
        alert("حدث خطأ أثناء بناء الصفحة الرئيسية");
        return;
    }

    var data = await response.json();
    return data.html;
}

window.onload = async () => {
    var response = await fetch("/backend/logged.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        window.location.href = "/frontend/login.html";
    }

    // if the user exists, build the home page using its data
    var user = await response.json();
    // build the home page using the data
    var homePage = await buildHomePage(user.id);
    document.querySelector(".home_container").innerHTML = homePage;
};