export interface PostInterface {
    title:string ,
    parmanentLink:string,
    excerpt:string,
    categorys: {
        categoryId:string,
        category:string
    },
    image:string,
    content:string,
    isFeatured:boolean,
    views:number,
    status:string,
    createdAt:Date
}