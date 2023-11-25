export class FilterQuery {

  constructor(reqQueries, productModel) {
    this.req = reqQueries;
    this.productModel = productModel;
    this.queryString = "";
    this.query = "";
  }

   //search by keyword
  searchByKeyWord() {
    let keyword = this.req.keyword || "";
    this.queryString = { name: { $regex: keyword, $options: "i" } };
    this.query = this.productModel.find(this.queryString);
    return this;
  }

  //filter by amount
  searchByAmount() {
    let price = this.req.product || "";
    if (price) {
      let newP = {};
      console.log(price);
      for (let p in price) {
        newP[p] = Number(price[p]);
      }
      let newPrice = JSON.stringify(newP).replace(
        /\b(gt|lt|gte|lte)\b/gi,
        (val) => `$${val}`
      );
      newPrice = JSON.parse(newPrice);

      this.queryString = { ...this.queryString, price: newPrice };
      this.query = this.productModel.find(this.queryString);
    }
    return this;
  }


   //set the limit to show the Number of records per page
   setLimit(noOfrecords)
   {
    let pageNumber = this.req?.page || 1
    let skipRecords = noOfrecords * (pageNumber-1)
    this.query = this.productModel.find(this.queryString).skip(skipRecords).limit(noOfrecords);
    return this
   }
}
