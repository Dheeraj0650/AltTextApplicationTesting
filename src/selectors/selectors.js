const canvasLoginXpaths = {
    canvas_username : '//input[@class="ic-Input text" and @type="text"]',
    canvas_password : '//input[@class="ic-Input text" and @type="password"]',
    canvas_login : '//input[@type="submit"]',
    canvas_page_title : '//div[@class="large ic-Dashboard-header__layout"]'
}

const altTextAppXpaths = {
    alt_text_home_page : '//div[@class="space-children"]/h2[text()="Alt Text"]',
    alt_text_launch_button : '//a[@class="Button Button--primary bs-btn-block bs-btn-lg" and text()="Launch Alt Text App"]',
    alt_text_iframe : '//iframe[@title="Alt Text App"]'
}

const canvasLoginNames = {
    canvas_page_title : 'Dashboard'
}

module.exports = {
    canvasLoginXpaths,
    canvasLoginNames,
    altTextAppXpaths
}