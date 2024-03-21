const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');


const crawl  =  async (red,  res) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    // Thay thế URL bằng URL của trang web mà bạn muốn lấy ảnh từ
    await page.goto('https://unsplash.com/s/photos/'+red.params.option);
    
    let imageLinks = await page.evaluate(() => {
        let urls = [];
        const imageLinks = document.querySelectorAll('a img'); // Lấy tất cả các thẻ img trong thẻ a

        imageLinks.forEach((img) => {
        const imageUrl = img.getAttribute('src'); // Lấy giá trị của thuộc tính src trong thẻ img
        urls.push(imageUrl);
    });

    return urls;
    }).catch((err) => {
        console.error(err);
    });

    console.log(imageLinks);

    var pathFolder = path.join('E:/code/Crawl images/images', red.params.downloadFolder);

    // Tạo thư mục tải xuống nếu chưa tồn tại
    if (!fs.existsSync(pathFolder)) {
        fs.mkdirSync(pathFolder);
    }

    for (let i = 0; i < imageLinks.length; i++) {
        const imageUrl = imageLinks[i];
        const imageFileName = `image_${i}.jpg`; // Tên tệp hình ảnh lưu trữ trên ổ đĩa
        const imagePath = path.join(pathFolder, imageFileName); // Đường dẫn tuyệt đối đến tệp hình ảnh

        try {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(imagePath, response.data);
            console.log(`Đã tải xuống ${imageFileName}`);
        } catch (error) {
            console.error(`Lỗi khi tải xuống ${imageUrl}: ${error.message}`);
        }
    }

    await browser.close();

    res.status(200).json({
        message: `Successfully downloaded`
    })
};

module.exports = crawl;