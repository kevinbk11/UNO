class StringJsonBuilder//Server
{
    static data = {}
    constructor()
    {
        this.data={}
    }
    static addData(key,value)
    {
        StringJsonBuilder.data[key]=value
        return this
    }
    static build()
    {
        let res = StringJsonBuilder.data
        StringJsonBuilder.data={}
        return res
    }

}
module.exports=StringJsonBuilder