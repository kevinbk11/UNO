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
        let res = {'id':this.id,data:this.data}
        this.data={}
        return res
    }
}