class ImageUrl {
  constructor(data) {
    this.data = data;
    this.rootPath = "https://adventuretrailhead-dest.s3.amazonaws.com/images";
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
