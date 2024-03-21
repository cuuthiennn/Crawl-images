const axios = require('axios');
const fs = require('fs');
const path = require('path');

const crawlWithApi = async (red, res) => {
    let imageUrls = []
    
    var API_KEY = '42995515-0c6457689b9c5da757a564325';
    var URL = "https://pixabay.com/api/?key="+API_KEY+red.params.option;
    let { data: result } = await axios.get(URL);

    result.hits.forEach(element => {
        imageUrls.push({ id: element.id, url: element.largeImageURL})
    });

    console.log(imageUrls);

    var pathFolder = path.join('E:/code/Crawl images/images', red.params.downloadFolder);

    // Tạo thư mục tải xuống nếu chưa tồn tại
    if (!fs.existsSync(pathFolder)) {
        fs.mkdirSync(pathFolder);
    }

    for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i].url;
        const imageFileName = `image_${imageUrls[i].id}.jpg`; // Tên tệp hình ảnh lưu trữ trên ổ đĩa
        const imagePath = path.join(pathFolder, imageFileName); // Đường dẫn tuyệt đối đến tệp hình ảnh

        try {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(imagePath, response.data);
            console.log(`Đã tải xuống ${imageFileName}`);
        } catch (error) {
            console.error(`Lỗi khi tải xuống ${imageUrl}: ${error.message}`);
        }
    }
    res.status(200).json({
        message: `Successfully downloaded`
    })
    
};

module.exports =  crawlWithApi;