import { baseUrl } from '@/common/constant';

export default class Upload {
  uploading = false;
  count = 0;
  sourceType = [];
  sizeType = [];
  constructor(
    count = 1,
    sourceType = ['album', 'camera'],
    sizeType = ['original', 'compressed']
  ) {
    this.count = count;
    this.sourceType = sourceType;
    this.sizeType = sizeType;
  }
  fail(rej, err) {
    this.uploading = false;
    rej(err);
  }
  success(r, j, res) {
    const url = `${baseUrl}/api/upload/uploadImg`;
    wx.uploadFile({
      url,
      filePath: res.tempFilePaths[0],
      name: 'file',
      success: this.successupLoad.bind(this, r),
      fail: this.fail.bind(this, j)
    });
  }
  successupLoad(res, _res) {
    const __res = JSON.parse(_res.data);

    this.uploading = false;
    res(__res.rows);
  }
  upload() {
    if (this.uploading) {
      return;
    }

    this.uploading = true;

    return new Promise((res, rej) => {
      wx.chooseImage({
        count: this.count,
        sizeType: this.sizeType, // 可以指定是原图还是压缩图，默认二者都有
        sourceType: this.sourceType, // 可以指定来源是相册还是相机，默认二者都有
        success: this.success.bind(this, res, rej),
        fail: this.fail.bind(this, rej)
      });
    });
  }
}
