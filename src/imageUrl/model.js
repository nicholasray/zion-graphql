class ImageUrl {
  constructor(data) {
    this.data = data;
    this.rootPath = "https://d12tvlgrri3gxf.cloudfront.net/images";
  }

  small() {
      return `${this.rootPath}/small/${this.data.filename}`;
  }

  medium() {
      return `${this.rootPath}/medium/${this.data.filename}`;
  }

  large() {
      return `${this.rootPath}/large/${this.data.filename}`;
  }

  xlarge() {
      return `${this.rootPath}/xlarge/${this.data.filename}`;
  }
}

module.exports = ImageUrl;
