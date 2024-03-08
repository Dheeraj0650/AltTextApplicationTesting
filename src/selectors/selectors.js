const canvasLoginXpaths = {
    canvas_username : '//input[@class="ic-Input text" and @type="text"]',
    canvas_password : '//input[@class="ic-Input text" and @type="password"]',
    canvas_login : '//input[@type="submit"]',
    canvas_page_title : '//div[@class="large ic-Dashboard-header__layout"]'
}

const altTextAppXpaths = {
    alt_text_home_page : '//div[@class="space-children"]/h2[text()="Alt Text"]',
    alt_text_launch_button : '//a[@class="Button Button--primary bs-btn-block bs-btn-lg" and text()="Launch Alt Text App"]',
    alt_text_iframe : '//iframe[@title="Alt Text App"]',
    alt_text_home_page_buttons: '//button//span',
    alt_text_buttons_specific: '//button//span[text()="?"]',
}

const altTextHomePageXpaths = {
    alt_text_home_page_image : '//img[@id="main-image"]',
    alt_text_page_content : '//div[@id="page-content"]',
    context_nav : '//div[@id="context-nav"]',
    courses_drop_down : '//div[@class="buttonGroup"]//div[@id="demo-simple-select-helper"]',
    course_drop_down_list: '//div[@id="menu-"]//div/ul/li[text()="?"]',
    course_image_name : '//span[@id="image-name"]'
}

const altTextLoadPageXpaths = {
    course_id_input : '//input[@id="course-id"]',
    alt_text_button_specific : '//span[text()="?"]/ancestor::button',
    alert_banner : '//div[@id="alert-container"]//div[contains(text(), "?")]'
}

const canvasLoginNames = {
    canvas_page_title : 'Dashboard'
}

const altTextAppNames = {
    alt_text_buttons : ["Home", "Advanced Images", "Load Images", "Review & Publish", "Submit", "Mark As Advanced", "Skip Image", "Dismiss"],
    course_image_names : ["car 6.jpeg"]
}

module.exports = {
    canvasLoginXpaths,
    canvasLoginNames,
    altTextAppXpaths,
    altTextAppNames,
    altTextHomePageXpaths,
    altTextLoadPageXpaths
}