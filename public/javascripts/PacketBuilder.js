class PacketBuilder//Client
{
    constructor(id)
    {
        this.data={}
        this.id=id
    }
    addData(key,value)
    {
        this.data[key]=value
        return this
    }
    build()
    {
        let res = JSON.stringify({'id':this.id,data:JSON.stringify(this.data)})
        this.data={}
        return res
    }
}