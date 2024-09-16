class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};

        this.query.find({...keyword })
        return this;
    }

    filter() {
        const queryStrCopy = {...this.queryStr };

        // Remove fields from query string that aren't needed
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(field => delete queryStrCopy[field]);

        // Advanced filter for price, ratings, etc. (modify this if not relevant)
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        // Apply the filters to the query
        this.query.find(JSON.parse(queryStr));

        // Fetch the last inserted data by sorting in descending order
        this.query.sort({ _id: -1 }); // This sorts the data by insertion time

        return this;
    }

    paginate(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;