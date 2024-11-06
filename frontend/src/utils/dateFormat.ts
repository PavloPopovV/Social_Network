export const dateFormat = (date?:Date)=>{
    if(!date) return ""
    return new Date(date).toLocaleDateString();
}