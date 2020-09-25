var getCookie = document.cookie.split(";").filter(function(cookie) {
    return cookie.indexOf("cep") != -1
})

export default getCookie